import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router';
import { Layout, Menu, Button, Space } from 'antd';
import { HomeOutlined, FileTextOutlined, UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">{t('common.home')}</Link>,
    },
    {
      key: '/news',
      icon: <FileTextOutlined />,
      label: <Link to="/news">{t('common.news')}</Link>,
    },
    ...(isAuthenticated
      ? [
          {
            key: '/admin',
            icon: <UserOutlined />,
            label: <Link to="/admin">{t('common.adminPanel')}</Link>,
          },
        ]
      : []),
  ];

  return (
    <AntHeader style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      background: '#001529',
      padding: '0 24px'
    }}>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ 
          flex: 1, 
          minWidth: 0,
          background: 'transparent',
          borderBottom: 'none'
        }}
      />
      <Space>
        <Button
          type={i18n.language === 'en' ? 'primary' : 'default'}
          size="small"
          onClick={() => changeLanguage('en')}
        >
          EN
        </Button>
        <Button
          type={i18n.language === 'ru' ? 'primary' : 'default'}
          size="small"
          onClick={() => changeLanguage('ru')}
        >
          RU
        </Button>
        {isAuthenticated ? (
          <Button
            type="default"
            icon={<LogoutOutlined />}
            onClick={logout}
          >
            {t('common.logout')}
          </Button>
        ) : (
          <Button
            type="primary"
            icon={<LoginOutlined />}
            onClick={() => navigate('/admin/login')}
          >
            {t('common.login')}
          </Button>
        )}
      </Space>
    </AntHeader>
  );
};

export default Header;