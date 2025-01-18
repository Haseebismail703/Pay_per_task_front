import React, { useEffect } from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import AOS from 'aos';

const { Title, Text } = Typography;

const steps = [
  {
    title: 'Sign Up',
    description: 'Create an account to get started.',
    icon: <CheckCircleOutlined style={{ fontSize: '48px', color: '#4caf50' }} />,
  },
  {
    title: 'Choose Tasks',
    description: 'Browse and select tasks that suit you.',
    icon: <CheckCircleOutlined style={{ fontSize: '48px', color: '#4caf50' }} />,
  },
  {
    title: 'Complete Tasks',
    description: 'Submit completed tasks for approval.',
    icon: <CheckCircleOutlined style={{ fontSize: '48px', color: '#4caf50' }} />,
  },
  {
    title: 'Earn Rewards',
    description: 'Get paid for your hard work.',
    icon: <CheckCircleOutlined style={{ fontSize: '48px', color: '#4caf50' }} />,
  },
];

const HowItWorks: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      offset: 100, // Offset from the viewport
    });
  }, []);

  return (
    <div className="how-it-works">
      <Title level={2} className="section-title" data-aos="fade-up">
        How It Works
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {steps.map((step, index) => (
          <Col
            xs={24}
            sm={12}
            md={6}
            key={index}
            data-aos="zoom-in"
            data-aos-delay={index * 200} // Add delay for staggered animations
          >
            <Card
              hoverable
              className="how-it-works-card"
              style={{ textAlign: 'center', borderRadius: '10px', padding: '20px' }}
            >
              {step.icon}
              <Title level={4} style={{ marginTop: '20px' }}>
                {step.title}
              </Title>
              <Text>{step.description}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HowItWorks;
