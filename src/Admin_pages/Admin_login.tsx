import React from 'react';
import { Button, Input, Form, Typography, Row, Col } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <Row justify="center" align="middle" style={{ width: '100%' }}>
        <Col xs={22} sm={16} md={10} lg={8} xl={6}>
          <div style={styles.card}>
            <div style={styles.logo}>
              <span style={styles.logoIcon}>✦</span>
            </div>
            <Title level={4} style={styles.title}>Welcome to Circular</Title>
            <Form layout="vertical" style={styles.form}>
              <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email' }]}>
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password' }]}>
                <Input.Password
                  placeholder="Password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
              <Text type="secondary" style={styles.forgotPassword}>
                Forgot password?
              </Text>
              <Form.Item>
                <Button type="primary" block style={styles.signInButton}>
                  Sign in
                </Button>
              </Form.Item>
            </Form>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <Button type="link" block style={styles.signUpButton}>
              Sign Up
            </Button>
          </div>
        </Col>
      </Row>
      {/* Background icons */}
      <div style={styles.backgroundIcons}>
        <span style={{ ...styles.icon, ...styles.icon1 }}>✦</span>
        <span style={{ ...styles.icon, ...styles.icon2 }}>▲</span>
        <span style={{ ...styles.icon, ...styles.icon3 }}>●</span>
        <span style={{ ...styles.icon, ...styles.icon4 }}>■</span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    position: 'relative' as 'relative',
    overflow: 'hidden',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as 'center',
  },
  logo: {
    marginBottom: '20px',
  },
  logoIcon: {
    fontSize: '36px',
    color: '#ffb100',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '24px',
  },
  form: {
    textAlign: 'left' as 'left',
  },
  forgotPassword: {
    display: 'block',
    textAlign: 'right' as 'right',
    marginBottom: '20px',
    color: '#8c8c8c',
    cursor: 'pointer',
  },
  signInButton: {
    backgroundColor: '#4a90e2',
    color: '#fff',
    borderColor: '#4a90e2',
  },
  signUpText: {
    marginTop: '20px',
    color: '#8c8c8c',
  },
  signUpButton: {
    color: '#4a90e2',
  },
  backgroundIcons: {
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    alignContent: 'space-around' as 'space-around',
    padding: '20px',
    pointerEvents: 'none' as 'none',
  },
  icon: {
    fontSize: '30px',
    color: '#e0e0e0',
    margin: '10px',
    opacity: 0.5,
  },
  icon1: {
    color: '#ff5a5f',
    fontSize: '40px',
  },
  icon2: {
    color: '#4a90e2',
    fontSize: '25px',
  },
  icon3: {
    color: '#50e3c2',
    fontSize: '35px',
  },
  icon4: {
    color: '#f5a623',
    fontSize: '28px',
  },
};

export default LoginPage;
