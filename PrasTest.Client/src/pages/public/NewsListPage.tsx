import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { PagedResultDto, NewsListItemDto } from '../../types';
import { newsApi } from '../../services/api';
import NewsCard from '../../components/news/NewsCard';

const NewsListPage: React.FC = () => {
  const { t } = useTranslation();
  const [news, setNews] = useState<PagedResultDto<NewsListItemDto>>({
    items: [],
    totalCount: 0,
    page: 1,
    pageSize: 10
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  const fetchNews = async (page: number) => {
    setLoading(true);
    try {
      const result = await newsApi.getAll(page, 10);
      setNews(result);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(news.totalCount / news.pageSize);

  return (
    <div className="news-list-page">
      <h1>{t('news.newsList')}</h1>
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="news-grid">
            {news.items.map(item => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>

          {news.items.length === 0 && (
            <div className="no-news">
              <p>{t('news.noNews')}</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              
              <span>Page {currentPage} of {totalPages}</span>
              
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewsListPage;