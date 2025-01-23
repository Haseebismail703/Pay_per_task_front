import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Col, Row, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api/api';

const images = [
  'https://picsum.photos/800/800?random',
  'https://picsum.photos/800/800?random',
  'https://picsum.photos/800/800?random',
];

const SignUpForm = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post(`${api}/signupUser`, {
        username: values.username,
        email: values.email,
        password: values.password,
        role: 'user',
      });
      window.location.href = '/allTask';
      message.success('User signed up successfully');
      console.log('User signed up successfully:', response.data);
    } catch (error) {
      message.error('Error during sign up');
      console.error('Error during sign up:', error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${images[currentImage]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Row justify="center" align="middle" style={{ width: '100%', padding: '20px' }}>
        <Col xs={24} sm={16} md={12} lg={8}>
          <Card
            bordered={false}
            style={{
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              borderRadius: '8px',
              padding: '24px',
              backgroundColor: 'white',
            }}
          >
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>
            <Form
              name="signup"
              onFinish={onFinish}
              initialValues={{ remember: true }}
              style={{
                maxWidth: '400px',
                margin: '0 auto',
              }}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Username"
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'The input is not valid E-mail!' },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Email"
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>

              <Form.Item style={{ textAlign: 'center' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    padding: '10px',
                    fontSize: '16px',
                  }}
                >
                  Sign Up
                </Button>
              </Form.Item>

              <Form.Item style={{ textAlign: 'center' }}>
                Already have an account? <Link to="/login">Log In</Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SignUpForm;
