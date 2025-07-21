import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { logClickEvent, logPageView } from '../utils/eventLogger';
import { supabase } from '../lib/supabase';
import { incrementViewCount, incrementShareCount } from '../hooks/useSupabaseData';
import { Calendar, Eye, Tag, Share2, ArrowLeft, ExternalLink } from 'lucide-react';
import type { NewsArticle as NewsArticleType } from '../types/database';

const NewsArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [article, setArticle] = useState<NewsArticleType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        setError('Article not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Try to find by slug first, then by ID
        let { data, error } = await supabase
          .from('industry_news')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .single();

        // If not found by slug, try by ID
        if (error && error.code === 'PGRST116') {
          const { data: dataById, error: errorById } = await supabase
            .from('industry_news')
            .select('*')
            .eq('id', slug)
            .eq('is_active', true)
            .single();
          
          data = dataById;
          error = errorById;
        }

        if (error) {
          if (error.code === 'PGRST116') {
            setError('Article not found');
          } else {
            console.error('Article fetch error:', error);
            setError('Failed to load article');
          }
          return;
        }

        if (data) {
          setArticle(data);
          // Log page view for the specific article
          logPageView(`/news/${slug}`);
          // Increment view count when article is loaded
          try {
            await incrementViewCount(data.id);
          } catch (viewError) {
            console.warn('Failed to increment view count:', viewError);
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred fetching the article';
        console.error('Article error:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
    const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString(currentLanguage === 'zh' ? 'zh-CN' : 'en-US');
    } catch {
      return '';
    }
  };

  const handleShare = async () => {
    if (!article) return;

    logClickEvent(`share_article_${article.id}`);

    try {
      await incrementShareCount(article.id);
    } catch (shareError) {
      console.warn('Failed to increment share count:', shareError);
    }
    
    const shareUrl = article.external_link || window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentLanguage === 'zh' ? article.title_zh : article.title_en,
          url: shareUrl
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert(currentLanguage === 'zh' ? '链接已复制到剪贴板' : 'Link copied to clipboard');
      } catch (clipboardError) {
        console.warn('Failed to copy to clipboard:', clipboardError);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A2A5E]"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            {currentLanguage === 'zh' ? '文章未找到' : 'Article not found'}
          </div>
          <Link 
            to="/news" 
            className="text-[#0A2A5E] hover:text-blue-700 font-medium"
          >
            {currentLanguage === 'zh' ? '返回新闻列表' : 'Back to News'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/news')}
           onClick={() => {
             logClickEvent('back_to_news_list');
             navigate('/news');
           }}
            className="inline-flex items-center gap-2 text-[#0A2A5E] hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            <span>
              {currentLanguage === 'zh' ? '返回新闻列表' : 'Back to News'}
            </span>
          </button>
        </div>

        {/* Article Content */}
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Cover Image */}
          {article.cover_image && (
            <div className="h-64 md:h-96 overflow-hidden">
              <img
                src={article.cover_image}
                alt={currentLanguage === 'zh' ? article.title_zh : article.title_en}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-4 border-b border-gray-200">
              {article.publish_date && (
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{formatDate(article.publish_date)}</span>
                </div>
              )}
              {article.view_count !== undefined && (
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>{article.view_count}</span>
                </div>
              )}
              {article.category && (
                <div className="flex items-center gap-1">
                  <Tag size={16} />
                  <span>{article.category}</span>
                </div>
              )}
              {article.source && (
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">
                    {currentLanguage === 'zh' ? '来源:' : 'Source:'}
                  </span>
                  <span>{article.source}</span>
                </div>
              )}
              {article.share_count !== undefined && (
                <div className="flex items-center gap-1">
                  <Share2 size={16} />
                  <span>{article.share_count}</span>
                </div>
              )}
            </div>

            {/* Article Title */}
            <h1 className="text-2xl md:text-4xl font-bold mb-6 text-[#0A2A5E] leading-tight">
              {currentLanguage === 'zh' ? article.title_zh : article.title_en}
            </h1>

            {/* Article Content */}
            <div className="prose max-w-none mb-8">
              <div 
                className="text-gray-700 leading-relaxed prose prose-lg max-w-none prose-img:rounded-lg prose-img:shadow-md prose-headings:text-[#0A2A5E] prose-links:text-blue-600 prose-links:hover:text-blue-800"
                dangerouslySetInnerHTML={{
                  __html: currentLanguage === 'zh' ? article.content_zh : article.content_en
                }}
              />
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-600 mb-3">
                  {currentLanguage === 'zh' ? '标签' : 'Tags'}:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-end items-center gap-4">
                {article.external_link && (
                  <a 
                    href={article.external_link}
                    onClick={() => logClickEvent(`view_original_article_${article.id}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#0A2A5E] hover:text-blue-700 font-medium transition-colors"
                  >
                    <span>
                      {currentLanguage === 'zh' ? '查看原文' : 'View Original'}
                    </span>
                    <ExternalLink size={16} />
                  </a>
                )}
                
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0A2A5E] transition-colors"
                >
                  <Share2 size={16} />
                  <span>
                    {currentLanguage === 'zh' ? '分享文章' : 'Share Article'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsArticle;