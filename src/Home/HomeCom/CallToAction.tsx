import React from 'react';
import { Button, Typography, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

const CallToAction: React.FC = () => {
  return (
    <div className="cta-section">
      <Row justify="center" align="middle" className="cta-container">
        <Col xs={24} sm={22} md={16} lg={12}>
          <Title level={2} className="cta-title">
            Ready to Start Earning?
          </Title>
          <Paragraph className="cta-description">
            Join thousands of users who are making money by completing simple tasks. It’s quick, easy, and free to get started. Don’t miss out on the opportunity!
          </Paragraph>
          <div className="cta-buttons">
            <Button type="primary" size="large" className="cta-button">
              Get Started
            </Button>
            <Button type="default" size="large" className="cta-button-secondary">
              Learn More
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CallToAction;
