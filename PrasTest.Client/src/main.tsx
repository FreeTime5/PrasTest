import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import ruRU from 'antd/locale/ru_RU'
import enUS from 'antd/locale/en_US'
import './index.css'
import App from './App.tsx'
import './utils/i18n'

// Get language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem('language') || 'en'
const locale = savedLanguage === 'ru' ? ruRU : enUS

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
