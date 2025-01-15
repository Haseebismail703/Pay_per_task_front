import React from 'react';
import { Row, Col, Button, Typography, Space } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section">
      <Row align="middle" justify="center" gutter={[24, 24]} className="hero-content">
        <Col xs={24} md={12} className="text-content">
          <Space direction="vertical" size="large">
            <Title level={1} style={{ color: '#ffffff', fontWeight: 'bold' }}>
              Earn Money by Completing Simple Tasks
            </Title>
            <Text style={{ color: '#e6e6e6', fontSize: '18px' }}>
              Join thousands of people earning money from the comfort of their home. Sign up today
              and start completing tasks to earn real cash.
            </Text>
            <Space>
              <Button
                type="primary"
                size="large"
                shape="round"
                style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
              >
                Get Started
              </Button>
              <Button
                type="default"
                size="large"
                shape="round"
                style={{ color: '#1890ff', borderColor: '#1890ff' }}
              >
                Learn More <ArrowRightOutlined />
              </Button>
            </Space>
          </Space>
        </Col>
        <Col xs={24} md={12} className="image-content">
          <img
            src="https://img.freepik.com/premium-photo/3d-man-working-computer_751108-1606.jpg" // Replace with actual image URL
            alt="Hero Banner"
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default HeroSection;
