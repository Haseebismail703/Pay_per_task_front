import React from 'react';
import { Layout, Menu, Row, Col, Typography } from 'antd';
import {
  HomeOutlined,
  InfoCircleOutlined,
  BulbOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined,
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

  // Define menu items using the "items" property
  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: 'HowItsWork',
      icon: <InfoCircleOutlined />,
      label: 'How It Works',
    },
    {
      key: 'keyFeatures',
      icon: <BulbOutlined />,
      label: 'Key Features',
    },
    {
      key: 'taskCategories',
      icon: <AppstoreOutlined />,
      label: 'Task Categories',
    },
    {
      key: 'FAQs',
      icon: <QuestionCircleOutlined />,
      label: 'FAQs',
    },
  ];

  return (
    <Header style={{ backgroundColor: '#001529' }}>
      <Row justify="space-between" align="middle">
        {/* Logo */}
        <Col>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <Title className="icon" level={3} style={{ color: '#fff', margin: 0 }}>
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
            items={menuItems} // Use items instead of children
            onClick={handleMenuClick} // Attach the click handler here
          />
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
