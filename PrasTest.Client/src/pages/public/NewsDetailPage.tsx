import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { NewsDto } from '../../types';
import { newsApi } from '../../services/api';

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [news, setNews] = useState<NewsDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      if (!id) return;
      
      try {
        const newsItem = await newsApi.getById(parseInt(id));
        setNews(newsItem);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!news) {
    return <div className="error">News not found</div>;
  }

  return (
    <div className="news-detail-page">
      <article className="news-article">
        <img src={news.imageUrl} alt={news.title} className="article-image" />
        
        <div className="article-content">
          <h1 className="article-title">{news.title}</h1>
          <p className="article-subtitle">{news.subtitle}</p>
          
          <div className="article-meta">
            <time dateTime={news.createdAt}>
              {new Date(news.createdAt).toLocaleDateString()}
            </time>
            {news.updatedAt !== news.createdAt && (
              <span className="updated">
                (Updated: {new Date(news.updatedAt).toLocaleDateString()})
              </span>
            )}
          </div>

          <div 
            className="article-text"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>
      </article>
    </div>
  );
};

export default NewsDetailPage;