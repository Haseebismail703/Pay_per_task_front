import React from 'react';
import { Form, Input, Button, Typography, Row, Col,Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;

const LoginPage: React.FC = () => {
  return (
    <Row style={{ minHeight: '100vh' }}>
      {/* Left Side - Image */}
      <Col
        xs={0} // Hide on extra-small screens (like mobile)
        md={12} // Display on medium to large screens
        style={{
          backgroundImage: 'url("https://clipart-library.com/2023/girl-walking_61103-169.jpg")', // Replace with your image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Right Side - Login Form */}
      <Col
        xs={24} // Full width on extra-small screens
        md={12} // Half width on medium to large screens
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#fff',
        }}
      >
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
            Login
          </Title>

          <Form
            name="login_form"
            initialValues={{ remember: true }}
            layout="vertical"
            style={{ width: '100%' }}
          >
            <Form.Item
              name="username"
              label="Username or Email"
              rules={[{ required: true, message: 'Please enter your username or email!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username or email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link href="#" style={{ color: '#1890ff' }}>
                Forgot password?
              </Link>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
            <Text style={{ display: 'block', textAlign: 'center', marginTop: '16px' }}>
              Don’t have an account? <Link href="/signup">Sign up</Link>
            </Text>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
