import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Row, Col, Pagination, Spin, Empty } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import type { PagedResultDto, NewsListItemDto } from '../../types';
import { newsApi } from '../../services/api';
import NewsCard from '../../components/news/NewsCard';

const { Title } = Typography;

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <Title level={1}>
          <FileTextOutlined /> {t('news.newsList')}
        </Title>
      </div>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {news.items.length === 0 ? (
            <Empty description={t('news.noNews')} />
          ) : (
            <>
              <Row gutter={[16, 16]}>
                {news.items.map(item => (
                  <Col xs={24} sm={12} md={8} key={item.id}>
                    <NewsCard news={item} />
                  </Col>
                ))}
              </Row>

              {news.totalCount > news.pageSize && (
                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                  <Pagination
                    current={currentPage}
                    total={news.totalCount}
                    pageSize={news.pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    showTotal={(total) => `${t('common.total')}: ${total}`}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default NewsListPage;