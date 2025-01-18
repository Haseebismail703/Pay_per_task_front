import React, { useEffect } from 'react';
import { Row, Col, Button, Typography, Space } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import AOS from 'aos';


const { Title, Text } = Typography;

const HeroSection: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <div id='home' className="hero-section">
      <Row
        align="middle"
        justify="center"
        gutter={[24, 24]}
        className="hero-content"
      >
        {/* Text Content */}
        <Col
          xs={24}
          md={12}
          className="text-content"
          data-aos="fade-right"
        >
          <Space direction="vertical" size="large">
            <Title level={1} className="hero-title">
              Earn Money by Completing Simple Tasks
            </Title>
            <Text className="hero-text">
              Join thousands of people earning money from the comfort of their
              home. Sign up today and start completing tasks to earn real cash.
            </Text>
            <Space>
              <Button
                type="primary"
                size="large"
                shape="round"
                className="cta-button primary"
              >
                Get Started
              </Button>
              <Button
                type="default"
                size="large"
                shape="round"
                className="cta-button secondary"
              >
                Learn More <ArrowRightOutlined />
              </Button>
            </Space>
          </Space>
        </Col>

        {/* Image Content */}
        <Col
          xs={24}
          md={12}
          className="image-content"
          data-aos="fade-left"
        >
          <img
            src="https://img.freepik.com/premium-photo/3d-man-working-computer_751108-1606.jpg" // Replace with actual image URL
            alt="Hero Banner"
            className="hero-image"
          />
        </Col>
      </Row>
    </div>
  );
};

export default HeroSection;
