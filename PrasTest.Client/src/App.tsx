import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
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
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;