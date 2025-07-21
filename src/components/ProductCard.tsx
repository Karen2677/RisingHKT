import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { logProductView } from '../utils/eventLogger';
import ProductModal from './ProductModal';

interface ProductCardProps {
  id?: string;
  productSlug?: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  detailsZh: string;
  detailsEn: string;
  imageUrl: string;
  features?: {
    zh: string[];
    en: string[];
  };
  applications?: {
    zh: string[];
    en: string[];
  };
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  productSlug,
  titleZh,
  titleEn,
  descriptionZh,
  descriptionEn,
  detailsZh,
  detailsEn,
  imageUrl,
  features,
  applications,
}) => {
  const { currentLanguage } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMore = () => {
    const identifier = productSlug || id;
    if (identifier) {
      logProductView(identifier);
    }
    setIsModalOpen(true);
  };

  const renderFeatures = (featureList?: string[]) => {
    if (!Array.isArray(featureList)) {
      return <li className="text-red-600">Features unavailable</li>;
    }
    return featureList.map((feature, index) => (
      <li key={index}>{feature}</li>
    ));
  };

  const renderApplications = (applicationList?: string[]) => {
    if (!Array.isArray(applicationList)) {
      return <li className="text-red-600">Applications unavailable</li>;
    }
    return applicationList.map((application, index) => (
      <li key={index}>{application}</li>
    ));
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={currentLanguage === 'zh' ? titleZh : titleEn} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://dxtdryilaoahkcazxyuu.supabase.co/storage/v1/object/public/product-images/fallback.jpg';
            }}
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            <span className={currentLanguage === 'zh' ? 'block' : 'hidden'} data-lang="zh">
              {titleZh || 'Title unavailable'}
            </span>
            <span className={currentLanguage === 'en' ? 'block' : 'hidden'} data-lang="en">
              {titleEn || 'Title unavailable'}
            </span>
          </h3>
          <p className="text-gray-600 flex-grow">
            <span className={currentLanguage === 'zh' ? 'block' : 'hidden'} data-lang="zh">
              {descriptionZh || 'Description unavailable'}
            </span>
            <span className={currentLanguage === 'en' ? 'block' : 'hidden'} data-lang="en">
              {descriptionEn || 'Description unavailable'}
            </span>
          </p>
          <button 
            onClick={handleLearnMore}
            className="mt-4 bg-[#0A2A5E] text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200 self-end"
          >
            <span className={currentLanguage === 'zh' ? 'block' : 'hidden'} data-lang="zh">
              了解更多
            </span>
            <span className={currentLanguage === 'en' ? 'block' : 'hidden'} data-lang="en">
              Learn More
            </span>
          </button>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={{
          titleZh,
          titleEn,
          descriptionZh,
          descriptionEn,
          detailsZh,
          detailsEn,
          imageUrl,
          features,
          applications,
        }}
      />
    </>
  );
};

export default ProductCard;