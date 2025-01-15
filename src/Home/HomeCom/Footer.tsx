import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Footer: React.FC = () => {
  return (
    <Layout.Footer style={{ backgroundColor: '#f0f2f5', padding: '30px 50px' }}>
      <Row gutter={[16, 16]} justify="space-between">
        {/* Left Section */}
        <Col xs={24} md={6}>
          <Space direction="vertical" size="middle">
            <Text strong style={{ fontSize: '18px' }}>Contact Us</Text>
            <Text type="secondary">support@yourdomain.com</Text>
            <Text type="secondary">+1 (123) 456-7890</Text>
          </Space>
        </Col>

        {/* Middle Section */}
        <Col xs={24} md={12} style={{ textAlign: 'center' }}>
          <Space direction="vertical" size="middle">
            <Text strong style={{ fontSize: '18px' }}>Quick Links</Text>
            <Row gutter={[16, 16]}>
              <Col>
                <Text type="secondary"><a href="/privacy-policy">Privacy Policy</a></Text>
              </Col>
              <Col>
                <Text type="secondary"><a href="/terms-of-service">Terms of Service</a></Text>
              </Col>
            </Row>
          </Space>
        </Col>

        {/* Right Section */}
        <Col xs={24} md={6} style={{ textAlign: 'right' }}>
          <Space direction="vertical" size="middle">
            <Text strong style={{ fontSize: '18px' }}>Follow Us</Text>
            <Space>
              <FacebookOutlined style={{ fontSize: '24px', color: '#3b5998' }} />
              <TwitterOutlined style={{ fontSize: '24px', color: '#00acee' }} />
              <InstagramOutlined style={{ fontSize: '24px', color: '#C13584' }} />
              <LinkedinOutlined style={{ fontSize: '24px', color: '#0077b5' }} />
            </Space>
          </Space>
        </Col>
      </Row>
      <Divider style={{ margin: '20px 0' }} />
      <Row justify="center">
        <Text type="secondary" style={{ fontSize: '14px' }}>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </Text>
      </Row>
    </Layout.Footer>
  );
};

export default Footer;
