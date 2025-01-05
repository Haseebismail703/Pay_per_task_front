import React from 'react';
import axios from 'axios';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import api from '../api/api';

const { Title, Text } = Typography;

const AdminLoginPage: React.FC = () => {
  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      // Replace the URL with your API endpoint
      const response = await axios.post(`${api}/adminLogin`, values);
      
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        message.success('Login successful!');
        window.location.href = '/admin/dashboard';
        // Perform any further actions, such as navigating to another page
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Card
        style={{
          maxWidth: 400,
          width: '100%',
          padding: '30px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          backgroundColor: '#ffffff',
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            color: '#1890ff',
          }}
        >
          Admin Login
        </Title>

        <Form
          name="admin_login_form"
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={handleLogin} // Submit handler
          style={{ width: '100%' }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
              placeholder="Email"
              style={{
                borderRadius: '8px',
                padding: '10px',
                borderColor: '#1890ff',
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#1890ff' }} />}
              placeholder="Password"
              style={{
                borderRadius: '8px',
                padding: '10px',
                borderColor: '#1890ff',
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                marginTop: '10px',
                backgroundColor: '#1890ff',
                borderRadius: '8px',
                fontWeight: 'bold',
                borderColor: '#1890ff',
              }}
            >
              Log In
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              Forgot your password?{' '}
            </Text>
            <Text
              strong
              style={{
                color: '#1890ff',
                cursor: 'pointer',
                fontSize: '14px',
                textDecoration: 'underline',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target as HTMLSpanElement).style.color = '#40a9ff'}
              onMouseLeave={(e) => (e.target as HTMLSpanElement).style.color = '#1890ff'}
            >
              Reset it here
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
