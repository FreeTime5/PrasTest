import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import enUS from 'antd/locale/en_US';
import { useTranslation } from 'react-i18next';

interface LocaleProviderProps {
  children: React.ReactNode;
}

const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState(i18n.language === 'ru' ? ruRU : enUS);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setLocale(lng === 'ru' ? ruRU : enUS);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <ConfigProvider locale={locale}>
      {children}
    </ConfigProvider>
  );
};

export default LocaleProvider;

