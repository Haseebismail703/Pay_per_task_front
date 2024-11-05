import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;

const imageUrls = [
  "https://i.pinimg.com/originals/9e/3d/33/9e3d33d5b3f3829d01e12f77bce789e1.gif",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1C2iP-enaZtzEI8GuBbfQUPiNGGvEeytTag&s",
  "https://clipart-library.com/2023/girl-walking_61103-169.jpg",
];

const LoginPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cycle through images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <Row style={{ minHeight: '100vh' }}>
      {/* Left Side - Login Form */}
      <Col
        xs={24}
        md={12}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#fff',
        }}
      >
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Title level={2}>Login</Title>
          <Form
            name="login_form"
            initialValues={{ remember: true }}
            layout="vertical"
          >
            <Form.Item
              name="username"
              label="Username or Email"
              rules={[{ required: true, message: 'Please enter your username or email!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username or email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
            <Text>Don’t have an account? <Link href="#">Sign up</Link></Text>
          </Form>
        </div>
      </Col>

      {/* Right Side - Image and Text */}
      <Col
        xs={0}
        md={12}
        style={{
          backgroundColor: '#f0f2f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <img
            src={imageUrls[currentImageIndex]}
            alt="Illustration"
            style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }}
          />
          <Title level={3}>Check Your Project Progress</Title>
          <Text>
            Lorem ipsum dolor sit amet tristique urna lorem sed pellentesque
            dolorumque sit amet ipsum.
          </Text>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
