import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button, Card, Typography, Alert, Space } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { adminApi } from '../../services/api';

const { Title } = Typography;

const AdminLoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError('');

    try {
      const result = await adminApi.login(values);
      login(result.token);
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: 'calc(100vh - 64px)',
      padding: '24px'
    }}>
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>
              <UserOutlined /> {t('admin.loginToAdmin')}
            </Title>
          </div>
          
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              onClose={() => setError('')}
            />
          )}
          
          <Form
            form={form}
            name="login"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              label={t('admin.email')}
              rules={[
                { required: true, message: t('validation.required') },
                { type: 'email', message: t('validation.invalidEmail') || 'Invalid email' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={t('admin.email')}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={t('admin.password')}
              rules={[
                { required: true, message: t('validation.required') }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={t('admin.password')}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<LoginOutlined />}
                block
              >
                {t('common.login')}
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default AdminLoginPage;