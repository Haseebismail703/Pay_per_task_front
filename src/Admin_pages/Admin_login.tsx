import React from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AdminLoginPage: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card
        style={{
          maxWidth: 400,
          width: '100%',
          padding: '30px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        }}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
          Admin Login
        </Title>

        <Form
          name="admin_login_form"
          initialValues={{ remember: true }}
          layout="vertical"
          style={{ width: '100%' }}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
              placeholder="Username"
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
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ marginTop: '10px' }}>
              Log In
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Text type="secondary">Forgot your password? </Text>
            <Text strong style={{ color: '#1890ff', cursor: 'pointer' }}>
              Reset it here
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
