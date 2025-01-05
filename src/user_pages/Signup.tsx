import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Col, Row, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const images = [
  'https://picsum.photos/800/800?random',
  'https://picsum.photos/800/800?random',
  'https://picsum.photos/800/800?random',
];

const SignUpForm = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    // Set background image for body
    document.body.style.backgroundImage = `url(${images[currentImage]})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [currentImage]);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '97vh', backgroundColor: 'rgba(240, 242, 245, 0.8)' }}>
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

            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
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
              Already have an account? <a href="/login">Log In</a>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignUpForm;
