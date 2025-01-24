import React, { useState } from 'react';
import { Form, Input, Button, Typography, Row, Col, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Added useNavigate
import axios from 'axios';
import api from '../api/api'; // Import your API URL

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false); // to handle button loading state

  const onFinish = async (values: any) => {
    setLoading(true); // Set loading to true when submitting

    try {
      // Make a POST request to your login API
      const response = await axios.post(`${api}/signinUser`, {
        email: values.email,
        password: values.password,
      });
      // Check if login is successful
      if (response.data?.message === 'Login successful') {
        // Save the user data or token in localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        // Navigate to the dashboard after successful login
        window.location.href = '/allTask';
      } else {
        message.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message || 'Login failed');
      } else {
        message.error('Login failed');
      }
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

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
            onFinish={onFinish}
            initialValues={{ remember: true }}
            layout="vertical"
            style={{ width: '100%' }}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please enter your email!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
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
              <Link to="#" style={{ color: '#1890ff' }}>
                Forgot password?
              </Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading} // Show loading state when submitting
              >
                Login
              </Button>
            </Form.Item>
            <Text style={{ display: 'block', textAlign: 'center', marginTop: '16px' }}>
              Don’t have an account? <Link to="/signup">Sign up</Link>
            </Text>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
