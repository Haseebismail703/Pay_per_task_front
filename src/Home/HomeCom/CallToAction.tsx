import React, { useEffect } from 'react';
import { Button, Typography, Row, Col } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { Title, Paragraph } = Typography;

const CallToAction: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      offset: 100,    // Offset from the viewport
    });
  }, []);

  return (
    <div className="cta-section">
      <Row justify="center" align="middle" className="cta-container">
        <Col xs={24} sm={22} md={16} lg={12}>
          <Title 
            level={2} 
            className="cta-title" 
            data-aos="fade-up"         // Animation for title
          >
            Ready to Start Earning?
          </Title>
          <Paragraph 
            className="cta-description" 
            data-aos="fade-left"       // Animation for paragraph
          >
            Join thousands of users who are making money by completing simple tasks. It’s quick, easy, and free to get started. Don’t miss out on the opportunity!
          </Paragraph>
          <div 
            className="cta-buttons" 
            data-aos="zoom-in"         // Animation for buttons container
            data-aos-delay="300"      // Staggered delay for better effect
          >
            <Button 
              type="primary" 
              size="large" 
              className="cta-button"
              data-aos="flip-left"     // Separate animation for individual button
              data-aos-delay="400"
            >
              Get Started
            </Button>
            <Button 
              type="default" 
              size="large" 
              className="cta-button-secondary"
              data-aos="flip-right"    // Different animation for secondary button
              data-aos-delay="500"
            >
              Learn More
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CallToAction;
