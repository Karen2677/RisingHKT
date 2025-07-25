import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { logClickEvent, logPageView, logNewsView } from '../utils/eventLogger';
import { useNewsArticles, incrementViewCount, incrementShareCount } from '../hooks/useSupabaseData';
import { Calendar, ExternalLink, Eye, Share2, Tag } from 'lucide-react';
import type { NewsArticle } from '../types/database';

const News: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { articles, loading, error } = useNewsArticles();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  React.useEffect(() => {
    logPageView('/news');
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A2A5E]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error loading news articles: {error}</div>
      </div>
    );
  }

  // Get unique categories
  const categories = Array.from(new Set(articles.map(article => article.category).filter(Boolean)));

  const filteredArticles = selectedCategory
    ? articles.filter(article => article.category === selectedCategory)
    : articles;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'zh' ? 'zh-CN' : 'en-US');
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const handleReadMore = (article: NewsArticle) => {
    // Increment view count when user clicks to read more
    logNewsView(article.id);
    incrementViewCount(article.id);
  };

  const handleShare = async (article: NewsArticle) => {
    // Increment share count when user shares
    logClickEvent(`share_news_${article.id}`);
    await incrementShareCount(article.id);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0A2A5E]">
          <span 
            className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
            data-lang="zh"
          >
            行业动态
          </span>
          <span 
            className={currentLanguage === 'en' ? 'block' : 'hidden'} 
            data-lang="en"
          >
            Industry News
          </span>
        </h1>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
             onClick={() => {
               logClickEvent('filter_all_news');
               setSelectedCategory(null);
             }}
              className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                selectedCategory === null
                  ? 'bg-[#0A2A5E] text-white'
                  : 'bg-white text-[#0A2A5E] border border-[#0A2A5E] hover:bg-gray-50'
              }`}
            >
              {currentLanguage === 'zh' ? '全部' : 'All'}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  logClickEvent(`filter_news_category_${category}`);
                  setSelectedCategory(category);
                }}
                className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#0A2A5E] text-white'
                    : 'bg-white text-[#0A2A5E] border border-[#0A2A5E] hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Featured Articles */}
        {filteredArticles.filter(article => article.is_featured).length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#0A2A5E]">
              <span 
                className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                data-lang="zh"
              >
                精选文章
              </span>
              <span 
                className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                data-lang="en"
              >
                Featured Articles
              </span>
            </h2>
            <div className="space-y-8">
              {filteredArticles
                .filter(article => article.is_featured)
                .map((article) => (
                  <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {article.cover_image && (
                      <div className="h-64 md:h-80 overflow-hidden">
                        <img 
                          src={article.cover_image} 
                          alt={currentLanguage === 'zh' ? article.title_zh : article.title_en}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
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
                        {article.share_count !== undefined && (
                          <div className="flex items-center gap-1">
                            <Share2 size={16} />
                            <span>{article.share_count}</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#0A2A5E]">
                        {currentLanguage === 'zh' ? article.title_zh : article.title_en}
                      </h3>
                      <div className="flex items-center gap-4">
                        {article.external_link ? (
                          <a 
                            href={article.external_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleReadMore(article)}
                            className="inline-flex items-center gap-2 bg-[#0A2A5E] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors duration-200"
                          >
                            <span>
                              {currentLanguage === 'zh' ? '阅读全文' : 'Read More'}
                            </span>
                            <ExternalLink size={16} />
                          </a>
                        ) : (
                          <Link
                            to={`/news/${article.slug || article.id}`}
                            onClick={() => handleReadMore(article)}
                            className="bg-[#0A2A5E] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors duration-200"
                          >
                            {currentLanguage === 'zh' ? '阅读全文' : 'Read More'}
                          </Link>
                        )}
                        
                        <button
                          onClick={async () => {
                            await handleShare(article);
                            const shareUrl = article.external_link || `${window.location.origin}/news/${article.slug || article.id}`;
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
                              const url = shareUrl;
                              navigator.clipboard.writeText(url).then(() => {
                                alert(currentLanguage === 'zh' ? '链接已复制到剪贴板' : 'Link copied to clipboard');
                              });
                            }
                          }}
                          className="inline-flex items-center gap-1 text-gray-500 hover:text-[#0A2A5E] transition-colors"
                        >
                          <Share2 size={16} />
                          <span className="text-sm">
                            {currentLanguage === 'zh' ? '分享' : 'Share'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* All Articles */}
        <div className="space-y-6">
          {filteredArticles
            .filter(article => !article.is_featured)
            .map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {article.cover_image && (
                  <div className="h-48 md:h-64 overflow-hidden">
                    <img 
                      src={article.cover_image} 
                      alt={currentLanguage === 'zh' ? article.title_zh : article.title_en}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                    {article.publish_date && (
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(article.publish_date)}</span>
                      </div>
                    )}
                    {article.view_count !== undefined && (
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{article.view_count}</span>
                      </div>
                    )}
                    {article.share_count !== undefined && (
                      <div className="flex items-center gap-1">
                        <Share2 size={14} />
                        <span>{article.share_count}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-[#0A2A5E]">
                    {currentLanguage === 'zh' ? article.title_zh : article.title_en}
                  </h3>
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {article.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 ml-auto">
                      <button
                        onClick={async () => {
                          await handleShare(article);
                          if (navigator.share) {
                            try {
                              await navigator.share({
                                title: currentLanguage === 'zh' ? article.title_zh : article.title_en,
                                url: article.external_link || window.location.href
                              });
                            } catch (err) {
                              console.log('Share cancelled or failed');
                            }
                          } else {
                            // Fallback: copy to clipboard
                            const url = article.external_link || window.location.href;
                            navigator.clipboard.writeText(url).then(() => {
                              alert(currentLanguage === 'zh' ? '链接已复制到剪贴板' : 'Link copied to clipboard');
                            });
                          }
                        }}
                        className="inline-flex items-center gap-1 text-gray-500 hover:text-[#0A2A5E] transition-colors"
                      >
                        <Share2 size={14} />
                        <span className="text-xs">
                          {currentLanguage === 'zh' ? '分享' : 'Share'}
                        </span>
                      </button>
                      
                      {article.external_link ? (
                        <a 
                          href={article.external_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleReadMore(article)}
                          className="inline-flex items-center gap-1 bg-[#0A2A5E] text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors duration-200"
                        >
                          <span>
                            {currentLanguage === 'zh' ? '阅读全文' : 'Read More'}
                          </span>
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <Link
                          to={`/news/${article.slug || article.id}`}
                          onClick={() => handleReadMore(article)}
                          className="bg-[#0A2A5E] text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors duration-200"
                        >
                          {currentLanguage === 'zh' ? '阅读全文' : 'Read More'}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#0A2A5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#0A2A5E] mb-2">
                  <span 
                    className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                    data-lang="zh"
                  >
                    该版块正在维护中
                  </span>
                  <span 
                    className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                    data-lang="en"
                  >
                    This section is under maintenance
                  </span>
                </h3>
                <p className="text-gray-600">
                  <span 
                    className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                    data-lang="zh"
                  >
                    我们正在为您准备最新的行业资讯，敬请期待
                  </span>
                  <span 
                    className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                    data-lang="en"
                  >
                    We are preparing the latest industry news for you, please stay tuned
                  </span>
                </p>
              </div>
            </div>
            <p className="text-gray-600 mt-4">
              <span 
                className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                data-lang="zh"
              >
                暂无文章
              </span>
              <span 
                className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                data-lang="en"
              >
                No articles available
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;