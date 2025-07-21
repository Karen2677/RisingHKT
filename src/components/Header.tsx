import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';

const Header: React.FC = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'zh' ? 'en' : 'zh');
  };

  const navItems = [
    { path: '/', labelZh: '首页', labelEn: 'Home' },
    { path: '/products', labelZh: '产品与服务', labelEn: 'Products & Services' },
    { path: '/news', labelZh: '行业动态', labelEn: 'Industry News' },
    { path: '/contact', labelZh: '联系方式', labelEn: 'Contact Us' },
    { path: '/about', labelZh: '关于我们', labelEn: 'About Us' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A2A5E] shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/" className="text-white font-semibold text-xl">
            {t('睿盈汇新', 'Rising HK')}
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-white hover:text-blue-200 transition-colors duration-200 ${
                  isActive ? 'border-b-2 border-white pb-1' : ''
                }`
              }
            >
              {t(item.labelZh, item.labelEn)}
            </NavLink>
          ))}
          
          <button
            onClick={toggleLanguage}
            className="flex items-center text-white hover:text-blue-200 transition-colors duration-200 ml-4"
          >
            <Globe size={18} className="mr-1" />
            <span className="ml-1">
              {currentLanguage === 'zh' ? 'English' : '简体中文'}
            </span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleLanguage}
            className="text-white hover:text-blue-200 transition-colors duration-200 mr-4"
          >
            <Globe size={22} />
          </button>
          <button
            onClick={toggleMenu}
            className="text-white hover:text-blue-200 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-[#0A2A5E] border-t border-blue-800">
          <div className="container mx-auto px-4 py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block py-3 text-white hover:text-blue-200 transition-colors duration-200 ${
                    isActive ? 'font-semibold' : ''
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.labelZh, item.labelEn)}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;