import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface BilingualTextProps {
  zh: string;
  en: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

const BilingualText: React.FC<BilingualTextProps> = ({ zh, en, as = 'span', className = '' }) => {
  const { currentLanguage } = useLanguage();
  const Component = as;
  
  return (
    <Component className={className}>
      <span 
        className={`transition-opacity duration-300 ${currentLanguage === 'zh' ? 'opacity-100' : 'opacity-0 absolute'}`} 
        data-lang="zh"
      >
        {zh}
      </span>
      <span 
        className={`transition-opacity duration-300 ${currentLanguage === 'en' ? 'opacity-100' : 'opacity-0 absolute'}`} 
        data-lang="en"
      >
        {en}
      </span>
    </Component>
  );
};

export default BilingualText;