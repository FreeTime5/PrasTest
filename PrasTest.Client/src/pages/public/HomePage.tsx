import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Typography, Row, Col, Button, Spin, Empty, Space } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import type { NewsListItemDto } from '../../types';
import { newsApi } from '../../services/api';
import NewsCard from '../../components/news/NewsCard';

const { Title } = Typography;

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Title level={1}>
            <FileTextOutlined /> {t('news.latestNews')}
          </Title>
        </div>

        {latestNews.length === 0 ? (
          <Empty description={t('news.noNews')} />
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {latestNews.map(news => (
                <Col xs={24} sm={12} md={8} key={news.id}>
                  <NewsCard news={news} />
                </Col>
              ))}
            </Row>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate('/news')}
              >
                {t('common.allNews')}
              </Button>
            </div>
          </>
        )}
      </Space>
    </div>
  );
};

export default HomePage;