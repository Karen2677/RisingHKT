import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Calendar, Eye, Tag, ExternalLink, Share2 } from 'lucide-react';
import type { NewsArticle } from '../types/database';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: NewsArticle | null;
  onShare?: (article: NewsArticle) => Promise<void>;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, onClose, article, onShare }) => {
  const { currentLanguage } = useLanguage();

  if (!isOpen || !article) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'zh' ? 'zh-CN' : 'en-US');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#0A2A5E] pr-8">
            {currentLanguage === 'zh' ? article.title_zh : article.title_en}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {/* Article Meta Information */}
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
                <span className="text-gray-400">来源:</span>
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

          {/* Cover Image */}
          {article.cover_image && (
            <div className="mb-6">
              <img
                src={article.cover_image}
                alt={currentLanguage === 'zh' ? article.title_zh : article.title_en}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose max-w-none mb-6">
            <div 
              className="text-gray-700 leading-relaxed prose prose-lg max-w-none prose-img:rounded-lg prose-img:shadow-md prose-headings:text-[#0A2A5E] prose-links:text-blue-600 prose-links:hover:text-blue-800"
              dangerouslySetInnerHTML={{
                __html: currentLanguage === 'zh' ? article.content_zh : article.content_en
              }}
            >
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">
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

          {/* External Link */}
          {article.external_link && (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <a 
                  href={article.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#0A2A5E] hover:text-blue-700 font-medium"
                >
                  <span>
                    {currentLanguage === 'zh' ? '查看原文' : 'View Original'}
                  </span>
                  <ExternalLink size={16} />
                </a>
                
                {onShare && (
                  <button
                    onClick={async () => {
                      await onShare(article);
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
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0A2A5E] transition-colors"
                  >
                    <Share2 size={16} />
                    <span>
                      {currentLanguage === 'zh' ? '分享' : 'Share'}
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;