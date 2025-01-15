import React from 'react';
import { Layout, Menu, Button, Row, Col, Typography, Space } from 'antd';
import { HomeOutlined, CheckCircleOutlined, WalletOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

const Navbar: React.FC = () => {
  return (
    <Header style={{ backgroundColor: '#001529' }}>
      <Row justify="space-between" align="middle">
        {/* Logo */}
        <Col>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <Title level={3} style={{ color: '#fff', margin: 0 }}>
              Pay Per Task
            </Title>
          </Link>
        </Col>

        {/* Navigation Menu */}
        <Col>
          <Menu mode="horizontal" theme="dark" style={{ lineHeight: '64px' }}>
            <Menu.Item key="home" icon={<HomeOutlined />} style={{ fontSize: '16px' }}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="tasks" icon={<CheckCircleOutlined />} style={{ fontSize: '16px' }}>
              <Link to="/tasks">Tasks</Link>
            </Menu.Item>
            <Menu.Item key="payments" icon={<WalletOutlined />} style={{ fontSize: '16px' }}>
              <Link to="/payments">Payments</Link>
            </Menu.Item>
            <Menu.Item key="contact" icon={<PhoneOutlined />} style={{ fontSize: '16px' }}>
              <Link to="/contact">Contact Us</Link>
            </Menu.Item>
          </Menu>
        </Col>

        {/* Call to Action Button */}
        <Col>
          <Space>
            <Button type="primary" size="large" style={{ borderRadius: '30px' }} href="/signup">
              Sign Up
            </Button>
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
