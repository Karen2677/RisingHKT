import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { X } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
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
  };
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  const { currentLanguage } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#0A2A5E]">
            {currentLanguage === 'zh' ? product.titleZh : product.titleEn}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <img
              src={product.imageUrl}
              alt={currentLanguage === 'zh' ? product.titleZh : product.titleEn}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 mb-4">
              {currentLanguage === 'zh' ? product.detailsZh : product.detailsEn}
            </p>
            {currentLanguage === 'en' && (
              <p className="text-gray-500 text-xs italic mb-6">
                This product is designed for scientific research purposes and is not intended for use in clinical diagnosis, treatment, or any medical application.
              </p>
            )}
          </div>

          {product.features && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#0A2A5E] mb-3">
                {currentLanguage === 'zh' ? '主要特点' : 'Key Features'}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {(currentLanguage === 'zh' ? product.features.zh : product.features.en).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {product.applications && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#0A2A5E] mb-3">
                {currentLanguage === 'zh' ? '研究领域' : 'Research Areas'}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {(currentLanguage === 'zh' ? product.applications.zh : product.applications.en).map((application, index) => (
                  <li key={index}>{application}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;