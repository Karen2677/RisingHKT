import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAboutSections } from '../hooks/useSupabaseData';
import { Globe, Award, Users, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { sections, loading, error } = useAboutSections();

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
        <div className="text-red-600">Error loading about sections: {error}</div>
      </div>
    );
  }

  const renderContent = (content: string[] | undefined) => {
    if (!Array.isArray(content)) {
      return <p className="text-red-600">Content unavailable or in incorrect format</p>;
    }
    return content.map((item, index) => (
      <p key={index} className="mb-4 last:mb-0">{item}</p>
    ));
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0A2A5E]">
          <span 
            className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
            data-lang="zh"
          >
            关于我们
          </span>
          <span 
            className={currentLanguage === 'en' ? 'block' : 'hidden'} 
            data-lang="en"
          >
            About Us
          </span>
        </h1>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {sections?.map((section) => (
            <div key={section.id} className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-[#0A2A5E]">
                <span 
                  className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                  data-lang="zh"
                >
                  {section.title_zh || 'Title unavailable'}
                </span>
                <span 
                  className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                  data-lang="en"
                >
                  {section.title_en || 'Title unavailable'}
                </span>
              </h2>
              <div className="text-gray-700 leading-relaxed">
                {section.section_key === 'why_choose_us' ? (
                  <ul className="list-disc list-inside space-y-2">
                    {Array.isArray(currentLanguage === 'zh' ? section.content_zh : section.content_en) ? (
                      (currentLanguage === 'zh' ? section.content_zh : section.content_en).map((item, index) => (
                        <li key={index} className="text-gray-700">{item}</li>
                      ))
                    ) : (
                      <li className="text-red-600">Content unavailable or in incorrect format</li>
                    )}
                  </ul>
                ) : (
                  renderContent(currentLanguage === 'zh' ? section.content_zh : section.content_en)
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;