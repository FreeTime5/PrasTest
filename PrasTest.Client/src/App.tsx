import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { AuthProvider } from './contexts/AuthContext';
import LocaleProvider from './components/common/LocaleProvider';
import Header from './components/common/Header';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/public/HomePage';
import NewsListPage from './pages/public/NewsListPage';
import NewsDetailPage from './pages/public/NewsDetailPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminPanel from './pages/admin/AdminPanel';
import NewsFormPage from './pages/admin/NewsFormPage';
import './utils/i18n';
import './App.css';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <LocaleProvider>
      <AuthProvider>
        <Router>
          <Layout style={{ minHeight: '100vh' }}>
            <Header />
            <Content style={{ background: '#f0f2f5' }}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/news" element={<NewsListPage />} />
                <Route path="/news/:id" element={<NewsDetailPage />} />

                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                } />
                
                <Route path="/admin/news/create" element={
                  <ProtectedRoute>
                    <NewsFormPage />
                  </ProtectedRoute>
                } />
                
                <Route path="/admin/news/edit/:id" element={
                  <ProtectedRoute>
                    <NewsFormPage />
                  </ProtectedRoute>
                } />
              </Routes>
            </Content>
          </Layout>
        </Router>
      </AuthProvider>
    </LocaleProvider>
  );
};

export default App;