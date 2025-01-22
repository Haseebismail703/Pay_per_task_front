import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  LinkedinFilled,
} from '@ant-design/icons';

const { Text, Title } = Typography;

const Footer: React.FC = () => {
  return (
    <Layout.Footer style={{ backgroundColor: '#001529', color: '#fff', padding: '40px 20px' }}>
      <Row gutter={[16, 32]} justify="space-around" align="top">
        {/* About Section */}
        <Col xs={24} sm={12} md={8}>
          <Title level={4} style={{ color: '#fff' }}>About Us</Title>
          <Text style={{ color: '#aaa', fontSize: '14px' }}>
            We are a platform dedicated to providing simple and effective solutions for completing tasks and earning rewards. Our mission is to empower individuals through opportunities.
          </Text>
        </Col>

        {/* Contact Info */}
        <Col xs={24} sm={12} md={8}>
          <Title level={4} style={{ color: '#fff' }}>Contact Info</Title>
          <Space direction="vertical" size="small">
            <Text style={{ color: '#aaa', fontSize: '14px' }}>
              <EnvironmentOutlined style={{ marginRight: '8px' }} />
              123 Main Street, Your City
            </Text>
            <Text style={{ color: '#aaa', fontSize: '14px' }}>
              <PhoneOutlined style={{ marginRight: '8px' }} />
              +1 (123) 456-7890
            </Text>
            <Text style={{ color: '#aaa', fontSize: '14px' }}>
              <MailOutlined style={{ marginRight: '8px' }} />
              support@yourdomain.com
            </Text>
          </Space>
        </Col>

        {/* Follow Us */}
        <Col xs={24} sm={24} md={8} style={{ textAlign: 'center' }}>
          <Title level={4} style={{ color: '#fff' }}>Follow Us</Title>
          <Space size="large" style={{ fontSize: '24px' }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookFilled style={{ color: '#3b5998' }} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterSquareFilled style={{ color: '#00acee' }} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramFilled style={{ color: '#C13584' }} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedinFilled style={{ color: '#0077b5' }} />
            </a>
          </Space>
        </Col>
      </Row>

      <Divider style={{ borderColor: '#444', margin: '24px 0' }} />
      <Row justify="center">
        <Text style={{ color: '#aaa', fontSize: '14px' }}>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </Text>
      </Row>
    </Layout.Footer>
  );
};

export default Footer;
