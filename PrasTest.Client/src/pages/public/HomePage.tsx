import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import type { NewsListItemDto } from '../../types';
import { newsApi } from '../../services/api';
import NewsCard from '../../components/news/NewsCard';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [latestNews, setLatestNews] = useState<NewsListItemDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const news = await newsApi.getLatest(6);
        setLatestNews(news);
      } catch (error) {
        console.error('Error fetching latest news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>{t('news.latestNews')}</h1>
      </section>

      <section className="latest-news">
        <div className="news-grid">
          {latestNews.map(news => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>

        {latestNews.length === 0 && (
          <div className="no-news">
            <p>{t('news.noNews')}</p>
          </div>
        )}

        <div className="view-all">
          <Link to="/news" className="btn-primary">
            {t('common.allNews')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;