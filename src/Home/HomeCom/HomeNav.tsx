import React from 'react';
import { Layout, Menu, Button, Row, Col, Typography, Space } from 'antd';
import { 
  HomeOutlined, 
  InfoCircleOutlined, 
  BulbOutlined, 
  AppstoreOutlined, 
  QuestionCircleOutlined 
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle navigation and smooth scrolling
  const handleMenuClick = (e: { key: string }) => {
    const section = document.getElementById(e.key); // Match section ID for scrolling
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/${e.key}`); // Navigate to the route if section doesn't exist
    }
  };

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
          <Menu
            mode="horizontal"
            theme="dark"
            style={{ lineHeight: '64px' }}
            onClick={handleMenuClick} // Attach the click handler here
          >
            <Menu.Item key="home" icon={<HomeOutlined />} style={{ fontSize: '16px' }}>
              Home
            </Menu.Item>
            <Menu.Item key="HowItsWork" icon={<InfoCircleOutlined />} style={{ fontSize: '16px' }}>
              How It Works
            </Menu.Item>
            <Menu.Item key="keyFeatures" icon={<BulbOutlined />} style={{ fontSize: '16px' }}>
              Key Features
            </Menu.Item>
            <Menu.Item key="taskCategories" icon={<AppstoreOutlined />} style={{ fontSize: '16px' }}>
              Task Categories
            </Menu.Item>
            <Menu.Item key="FAQs" icon={<QuestionCircleOutlined />} style={{ fontSize: '16px' }}>
              FAQs
            </Menu.Item>
          </Menu>
        </Col>

        {/* Call to Action Button */}
        <Col>
          <Space>
            <Button
              type="primary"
              size="large"
              style={{ borderRadius: '30px' }}
              onClick={() => navigate('/signup')} // Navigate to the signup page
            >
              Sign Up
            </Button>
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
