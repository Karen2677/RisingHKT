import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from '../components/ProductCard';
import { useProducts, useProductCategories } from '../hooks/useSupabaseData';

const Products: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { categories, loading: categoriesLoading, error: categoriesError } = useProductCategories();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A2A5E]"></div>
      </div>
    );
  }

  if (productsError || categoriesError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">
          {productsError || categoriesError}
        </div>
      </div>
    );
  }

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category_id === selectedCategory)
    : products;

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0A2A5E]">
          <span 
            className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
            data-lang="zh"
          >
            产品与服务
          </span>
          <span 
            className={currentLanguage === 'en' ? 'block' : 'hidden'} 
            data-lang="en"
          >
            Products & Services
          </span>
        </h1>
        
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-gray-600 text-left mb-8">
            <span 
              className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
              data-lang="zh"
            >
              睿盈汇新科技代理多种先进的神经调控设备，涵盖声、光、电、磁、热等多模态神经刺激与调控技术。我们的产品广泛应用于脑科学、心理学、疼痛医学及神经康复等领域的研究。
            </span>
            <span 
              className={currentLanguage === 'en' ? 'block' : 'hidden'} 
              data-lang="en"
            >
              Rising HK Trading represents various advanced neuromodulation devices, covering multi-modal neural stimulation and modulation technologies including acoustic, optical, electrical, magnetic, and thermal. Our products are widely used in brain science, psychology, pain medicine, and neurorehabilitation research.
            </span>
          </p>
        </div>

        {/* Sticky Category Navigation */}
        <div className="sticky top-16 z-40 bg-gray-50 py-4 mb-8">
          <div className="container mx-auto px-4">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex gap-3 min-w-max">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === null
                      ? 'bg-[#0A2A5E] text-white'
                      : 'bg-white text-[#0A2A5E] border border-[#0A2A5E] hover:bg-gray-50'
                  }`}
                >
                  {currentLanguage === 'zh' ? '全部产品' : 'All Products'}
                </button>
                {Array.isArray(categories) && categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${
                      selectedCategory === category.id
                        ? 'bg-[#0A2A5E] text-white'
                        : 'bg-white text-[#0A2A5E] border border-[#0A2A5E] hover:bg-gray-50'
                    }`}
                  >
                    {currentLanguage === 'zh' ? category.name_zh : category.name_en}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(filteredProducts) && filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              titleZh={product.title_zh}
              titleEn={product.title_en}
              descriptionZh={product.description_zh}
              descriptionEn={product.description_en}
              detailsZh={product.details_zh}
              detailsEn={product.details_en}
              imageUrl={product.image_url}
              features={{
                zh: product.features_zh || [],
                en: product.features_en || []
              }}
              applications={{
                zh: product.applications_zh || [],
                en: product.applications_en || []
              }}
            />
          ))}
        </div>
        
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-[#0A2A5E]">
            <span 
              className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
              data-lang="zh"
            >
              定制化解决方案
            </span>
            <span 
              className={currentLanguage === 'en' ? 'block' : 'hidden'} 
              data-lang="en"
            >
              Customized Solutions
            </span>
          </h2>
          <p className="text-gray-600 mb-6">
            <span 
              className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
              data-lang="zh"
            >
              除了标准产品外，我们还可以根据您的具体需求提供定制化的神经调控整体解决方案。无论是研究实验设计、设备选型还是技术培训，我们的专业团队都将为您提供全方位的支持与服务。
            </span>
            <span 
              className={currentLanguage === 'en' ? 'block' : 'hidden'} 
              data-lang="en"
            >
              In addition to standard products, we can provide customized neuromodulation solutions based on your specific needs. Whether it's research experimental design, equipment selection, or technical training, our professional team will provide you with comprehensive support and services.
            </span>
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-[#0A2A5E] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors duration-200 ml-auto"
          >
            <span 
              className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
              data-lang="zh"
            >
              咨询定制方案
            </span>
            <span 
              className={currentLanguage === 'en' ? 'block' : 'hidden'} 
              data-lang="en"
            >
              Inquire About Custom Solutions
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Products;