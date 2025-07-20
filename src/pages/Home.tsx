import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Brain, Microscope, Globe, BarChart4 } from 'lucide-react';

const Home: React.FC = () => {
  const { currentLanguage } = useLanguage();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-[#0A2A5E] text-white">
        <div className="absolute inset-0 bg-[url('https://dxtdryilaoahkcazxyuu.supabase.co/storage/v1/object/public/product-images//hero_image.jpg')] bg-cover bg-center opacity-100"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2A5E]/50 to-[#0A2A5E]/80"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 transition-opacity duration-300">
              <span 
                className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                data-lang="zh"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl space-y-4">
                  <div className="whitespace-nowrap">
                    <span className="text-blue-300">睿</span>通脑宇，
                    <span className="text-blue-300">盈</span>纳科研
                  </div>
                  <div className="whitespace-nowrap">
                    <span className="text-blue-300">汇</span>引寰球，
                    <span className="text-blue-300">新</span>燃认知
                  </div>
                </div>
              </span>
              <span 
                className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                data-lang="en"
              >
                Rising HK Trading Co., Ltd.
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-200 transition-opacity duration-300">
              <span 
                className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                data-lang="zh"
              >
                专注于脑科学与神经调控设备，提供整体解决方案
              </span>
              <span 
                className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                data-lang="en"
              >
                Specialized in Neuromodulation Technology & Integrated Solutions
              </span>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/products" 
                className="bg-white text-[#0A2A5E] px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200"
              >
                <span 
                  className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                  data-lang="zh"
                >
                  探索产品
                </span>
                <span 
                  className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                  data-lang="en"
                >
                  Explore Products
                </span>
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors duration-200"
              >
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
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-[#0A2A5E]">
            <span 
              className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
              data-lang="zh"
            >
              我们的专业领域
            </span>
            <span 
              className={currentLanguage === 'en' ? 'block' : 'hidden'} 
              data-lang="en"
            >
              Our Expertise
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-[#0A2A5E]">
                <Brain size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#0A2A5E]">
                <span 
                  className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                  data-lang="zh"
                >
                  神经调控技术
                </span>
                <span 
                  className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                  data-lang="en"
                >
                  Neuromodulation Technology
                </span>
              </h3>
              <p className="text-gray-600">
                <span 
                  className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                  data-lang="zh"
                >
                  代理先进的神经调控设备，涵盖声、光、电、磁、热等多模态刺激技术。
                </span>
                <span 
                  className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                  data-lang="en"
                >
                  Distributing advanced neuromodulation devices covering acoustic, optical, electrical, magnetic, and thermal stimulation technologies.
                </span>
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-[#0A2A5E]">
                <Microscope size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#0A2A5E]">
                <span 
                  className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                  data-lang="zh"
                >
                  科研支持
                </span>
                <span 
                  className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                  data-lang="en"
                >
                  Research Support
                </span>
              </h3>
              <p className="text-gray-600">
                <span 
                  className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                  data-lang="zh"
                >
                  为神经科学、心理学、疼痛医学等研究领域提供专业设备和技术支持。
                </span>
                <span 
                  className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                  data-lang="en"
                >
                  Providing professional equipment and technical support for neuroscience, psychology, pain medicine, and other research fields.
                </span>
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-[#0A2A5E]">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#0A2A5E]">
                <span 
                  className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                  data-lang="zh"
                >
                  国际合作
                </span>
                <span 
                  className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                  data-lang="en"
                >
                  International Collaboration
                </span>
              </h3>
              <p className="text-gray-600">
                <span 
                  className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                  data-lang="zh"
                >
                 与全球领先的脑科学与神经调控设备厂商建立合作伙伴关系，集合国内外尖端技术。
                </span>
                <span 
                  className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                  data-lang="en"
                >
                  Establishing partnerships with leading global neuromodulation equipment manufacturers and introducing cutting-edge international technologies.
                </span>
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-[#0A2A5E]">
                <BarChart4 size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#0A2A5E]">
                <span 
                  className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                  data-lang="zh"
                >
                  定制解决方案
                </span>
                <span 
                  className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                  data-lang="en"
                >
                  Customized Solutions
                </span>
              </h3>
              <p className="text-gray-600">
                <span 
                  className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
                  data-lang="zh"
                >
                  根据客户需求提供个性化的神经调控整体解决方案和技术咨询服务。
                </span>
                <span 
                  className={currentLanguage === 'en' ? 'block' : 'hidden'} 
                  data-lang="en"
                >
                  Providing personalized neuromodulation solutions and technical consulting services according to customer requirements.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0A2A5E] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            <span 
              className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
              data-lang="zh"
            >
              需要专业神经调控设备解决方案？
            </span>
            <span 
              className={currentLanguage === 'en' ? 'block' : 'hidden'} 
              data-lang="en"
            >
              Need Professional Neuromodulation Equipment Solutions?
            </span>
          </h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            <span 
              className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
              data-lang="zh"
            >
              我们提供全方位的神经调控设备和技术支持，满足您的科研和临床需求。
            </span>
            <span 
              className={currentLanguage === 'en' ? 'block' : 'hidden'} 
              data-lang="en"
            >
              We provide comprehensive neuromodulation equipment and technical support to meet your research and clinical needs.
            </span>
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-white text-[#0A2A5E] px-8 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200"
          >
            <span 
              className={currentLanguage === 'zh' ? 'block' : 'hidden'} 
              data-lang="zh"
            >
              立即咨询
            </span>
            <span 
              className={currentLanguage === 'en' ? 'block' : 'hidden'} 
              data-lang="en"
            >
              Contact Now
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;