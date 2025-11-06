import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { NewsListItemDto } from '../../types';

interface NewsCardProps {
  news: NewsListItemDto;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const { t } = useTranslation();

  return (
    <div className="news-card">
      <img src={news.imageUrl} alt={news.title} className="news-image" />
      <div className="news-content">
        <h3 className="news-title">{news.title}</h3>
        <p className="news-subtitle">{news.subtitle}</p>
        <p className="news-date">
          {new Date(news.createdAt).toLocaleDateString()}
        </p>
        <Link to={`/news/${news.id}`} className="read-more">
          {t('common.readMore')}
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;