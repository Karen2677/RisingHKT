import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContactInfo } from '../hooks/useSupabaseData';
import { Mail, Phone, Globe } from 'lucide-react';

const Contact: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { contactInfo, loading, error } = useContactInfo();

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
        <div className="text-red-600">Error loading contact information: {error}</div>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail size={20} />;
      case 'phone':
        return <Phone size={20} />;
      case 'website':
        return <Globe size={20} />;
      default:
        return <Mail size={20} />;
    }
  };

  const getContactLink = (type: string, value: string) => {
    switch (type) {
      case 'email':
        return `mailto:${value}`;
      case 'phone':
        return `tel:${value.replace(/\s/g, '')}`;
      case 'website':
        return `https://${value}`;
      default:
        return '#';
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0A2A5E]">
          <span 
            className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
            data-lang="zh"
          >
            联系我们
          </span>
          <span 
            className={currentLanguage === 'en' ? 'block' : 'hidden'} 
            data-lang="en"
          >
            Contact Us
          </span>
        </h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-[#0A2A5E]">
              <span 
                className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                data-lang="zh"
              >
                联系方式
              </span>
              <span 
                className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                data-lang="en"
              >
                Contact Information
              </span>
            </h2>
            
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.id} className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-[#0A2A5E]">
                    {getIcon(info.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      <span 
                        className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                        data-lang="zh"
                      >
                        {info.label_zh}
                      </span>
                      <span 
                        className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                        data-lang="en"
                      >
                        {info.label_en}
                      </span>
                    </h3>
                    <a 
                      href={getContactLink(info.type, info.value)}
                      className="text-blue-600 hover:underline"
                      target={info.type === 'website' ? '_blank' : undefined}
                      rel={info.type === 'website' ? 'noopener noreferrer' : undefined}
                    >
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;