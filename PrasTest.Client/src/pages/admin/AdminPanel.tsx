import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Typography, Button, Table, Space, Spin, Empty, message, Card, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { NewsListItemDto } from '../../types';
import { newsApi } from '../../services/api';

const { Title } = Typography;

const AdminPanel: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
      message.error('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await newsApi.delete(id);
      setNews(prevNews => prevNews.filter(item => item.id !== id));
      message.success('News deleted successfully');
    } catch (error: any) {
      console.error('Error deleting news:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete news';
      message.error(errorMessage);
    }
  };

  const columns: ColumnsType<NewsListItemDto> = [
    {
      title: t('common.title'),
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/news/edit/${record.id}`);
            }}
          >
            {t('common.edit')}
          </Button>
          <Popconfirm
            title={t('common.delete') || 'Delete'}
            description="Are you sure you want to delete this news?"
            onConfirm={(e) => {
              e?.stopPropagation();
              handleDelete(record.id);
            }}
            onCancel={(e) => {
              e?.stopPropagation();
            }}
            okText={t('common.delete') || 'Delete'}
            cancelText={t('common.cancel') || 'Cancel'}
            okType="danger"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {t('common.delete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={2}>
              <UserOutlined /> {t('common.adminPanel')}
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => navigate('/admin/news/create')}
            >
              {t('news.createNews')}
            </Button>
          </div>

          {news.length === 0 ? (
            <Empty description={t('news.noNews')} />
          ) : (
            <Table
              columns={columns}
              dataSource={news}
              rowKey="id"
              pagination={false}
            />
          )}
        </Space>
      </Card>
    </div>
  );
};

export default AdminPanel;