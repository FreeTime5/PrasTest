import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Typography, Image, Spin, Alert, Space, Card } from 'antd';
import { CalendarOutlined, EditOutlined } from '@ant-design/icons';
import type { NewsDto } from '../../types';
import { newsApi } from '../../services/api';

const { Title, Paragraph, Text } = Typography;

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
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!news) {
    return (
      <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
        <Alert
          message="Error"
          description="News not found"
          type="error"
          showIcon
        />
      </div>
    );
  }

  const isUpdated = news.updatedAt !== news.createdAt;

  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <Card>
        <Image
          src={news.imageUrl}
          alt={news.title}
          style={{ width: '100%', marginBottom: '24px', borderRadius: '8px' }}
          preview={false}
        />
        
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={1}>{news.title}</Title>
            <Paragraph style={{ fontSize: '18px', color: '#666' }}>
              {news.subtitle}
            </Paragraph>
          </div>
          
          <Space>
            <CalendarOutlined />
            <Text type="secondary">
              {new Date(news.createdAt).toLocaleDateString()}
            </Text>
            {isUpdated && (
              <>
                <EditOutlined />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Updated: {new Date(news.updatedAt).toLocaleDateString()}
                </Text>
              </>
            )}
          </Space>

          <div 
            style={{ 
              fontSize: '16px', 
              lineHeight: '1.8',
              marginTop: '16px'
            }}
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </Space>
      </Card>
    </div>
  );
};

export default NewsDetailPage;