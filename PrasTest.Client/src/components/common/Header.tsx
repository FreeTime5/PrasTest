import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, logout } = useAuth();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-brand">
          <Link to="/">{t('common.home')}</Link>
        </div>
        
        <div className="nav-links">
          <Link to="/news">{t('common.news')}</Link>
          {isAuthenticated && (
            <Link to="/admin">{t('common.adminPanel')}</Link>
          )}
          {isAuthenticated ? (
            <button onClick={logout}>{t('common.logout')}</button>
          ) : (
            <Link to="/admin/login">{t('common.login')}</Link>
          )}
        </div>

        <div className="language-switcher">
          <button 
            className={i18n.language === 'en' ? 'active' : ''}
            onClick={() => changeLanguage('en')}
          >
            EN
          </button>
          <button 
            className={i18n.language === 'ru' ? 'active' : ''}
            onClick={() => changeLanguage('ru')}
          >
            RU
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;