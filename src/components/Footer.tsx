import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0A2A5E] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {t('北京睿盈汇新科技有限公司', 'Beijing Rising HK Technology Co., Ltd.')}
            </h3>
            <p className="text-blue-200 mb-4">
              {t(
                '专注于神经调控设备与整体解决方案',
                'Specialized in Neuromodulation Technology & Integrated Solutions'
              )}
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {t('联系我们', 'Contact Us')}
            </h3>
            <div className="flex items-center mb-2">
              <Mail size={18} className="mr-2" />
              <a href="mailto:risinghkt@outlook.com" className="text-blue-200 hover:text-white transition-colors">
                risinghkt@outlook.com
              </a>
            </div>
            <div className="flex items-center mb-2">
              <Phone size={18} className="mr-2" />
              <span className="text-blue-200">+86 13911697101</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {t('快速链接', 'Quick Links')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-blue-200 hover:text-white transition-colors">
                  {t('首页', 'Home')}
                </a>
              </li>
              <li>
                <a href="/products" className="text-blue-200 hover:text-white transition-colors">
                  {t('产品与服务', 'Products & Services')}
                </a>
              </li>
              <li>
                <a href="/about" className="text-blue-200 hover:text-white transition-colors">
                  {t('关于我们', 'About Us')}
                </a>
              </li>
              <li>
                <a href="/contact" className="text-blue-200 hover:text-white transition-colors">
                  {t('联系方式', 'Contact Us')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-blue-200">
          <p>© {new Date().getFullYear()} {t('北京睿盈汇新科技有限公司', 'Beijing Rising HK Technology Co., Ltd.')} {t('版权所有', 'All Rights Reserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;