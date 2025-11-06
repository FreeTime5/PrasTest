import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import type { NewsListItemDto } from '../../types';
import { newsApi } from '../../services/api';

const AdminPanel: React.FC = () => {
  const { t } = useTranslation();
  const [news, setNews] = useState<NewsListItemDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const result = await newsApi.getAll(1, 50);
      setNews(result.items);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this news?')) {
      return;
    }

    try {
      await newsApi.delete(id);
      setNews(news.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>{t('common.adminPanel')}</h1>
        <Link to="/admin/news/create" className="btn-primary">
          {t('news.createNews')}
        </Link>
      </div>

      <div className="news-list">
        <table className="news-table">
          <thead>
            <tr>
              <th>{t('common.title')}</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="actions">
                  <Link 
                    to={`/admin/news/edit/${item.id}`}
                    className="btn-edit"
                  >
                    {t('common.edit')}
                  </Link>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="btn-delete"
                  >
                    {t('common.delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {news.length === 0 && (
          <div className="no-news">
            <p>{t('news.noNews')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;