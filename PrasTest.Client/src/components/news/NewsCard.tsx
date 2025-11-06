import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Space } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import type { NewsListItemDto } from '../../types';

const { Meta } = Card;
const { Text, Paragraph } = Typography;

interface NewsCardProps {
  news: NewsListItemDto;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      style={{ height: '100%' }}
      cover={
        <img
          alt={news.title}
          src={news.imageUrl}
          style={{ height: 200, objectFit: 'cover' }}
        />
      }
      onClick={() => navigate(`/news/${news.id}`)}
    >
      <Meta
        title={
          <Typography.Title level={4} style={{ margin: 0 }}>
            {news.title}
          </Typography.Title>
        }
        description={
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Paragraph 
              type="secondary" 
              ellipsis={{ rows: 2 }}
              style={{ margin: 0 }}
            >
              {news.subtitle}
            </Paragraph>
            <Space>
              <CalendarOutlined />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {new Date(news.createdAt).toLocaleDateString()}
              </Text>
            </Space>
          </Space>
        }
      />
    </Card>
  );
};

export default NewsCard;