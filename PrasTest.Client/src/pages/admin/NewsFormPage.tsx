import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button, Card, Typography, Space, Switch, Spin, message } from 'antd';
import { SaveOutlined, CloseOutlined, FileTextOutlined } from '@ant-design/icons';
import type { CreateNewsDto, UpdateNewsDto } from '../../types';
import { newsApi } from '../../services/api';

const { Title } = Typography;
const { TextArea } = Input;

const NewsFormPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      fetchNews();
    }
  }, [isEdit, id]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const news = await newsApi.getById(parseInt(id!));
      form.setFieldsValue({
        title: news.title,
        imageUrl: news.imageUrl,
        subtitle: news.subtitle,
        content: news.content,
        isPublished: news.isPublished
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      message.error('Failed to fetch news');
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: CreateNewsDto | UpdateNewsDto) => {
    setSaving(true);
    try {
      if (isEdit) {
        await newsApi.update(parseInt(id!), values as UpdateNewsDto);
        message.success('News updated successfully');
      } else {
        await newsApi.create(values as CreateNewsDto);
        message.success('News created successfully');
      }
      navigate('/admin');
    } catch (error) {
      console.error('Error saving news:', error);
      message.error('Failed to save news');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2}>
            <FileTextOutlined /> {isEdit ? t('news.editNews') : t('news.createNews')}
          </Title>
          
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              isPublished: true
            }}
            size="large"
          >
            <Form.Item
              name="title"
              label={t('common.title')}
              rules={[
                { required: true, message: t('validation.required') }
              ]}
            >
              <Input placeholder={t('common.title')} />
            </Form.Item>

            <Form.Item
              name="imageUrl"
              label={t('common.imageUrl')}
              rules={[
                { required: true, message: t('validation.required') },
                { type: 'url', message: t('validation.invalidUrl') || 'Invalid URL' }
              ]}
            >
              <Input placeholder="https://example.com/image.jpg" />
            </Form.Item>

            <Form.Item
              name="subtitle"
              label={t('common.subtitle')}
              rules={[
                { required: true, message: t('validation.required') }
              ]}
            >
              <Input placeholder={t('common.subtitle')} />
            </Form.Item>

            <Form.Item
              name="content"
              label={t('common.content')}
              rules={[
                { required: true, message: t('validation.required') }
              ]}
            >
              <TextArea
                rows={10}
                placeholder={t('common.content')}
              />
            </Form.Item>

            <Form.Item
              name="isPublished"
              label={t('common.isPublished')}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  type="default"
                  icon={<CloseOutlined />}
                  onClick={() => navigate('/admin')}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={saving}
                  icon={<SaveOutlined />}
                >
                  {t('common.save')}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default NewsFormPage;