import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import {
  ThunderboltOutlined,
  DollarCircleOutlined,
  SafetyOutlined,
  TrophyOutlined,
} from '@ant-design/icons';


const { Title, Text } = Typography;

const features = [
  {
    title: 'Fast Task Completion',
    description: 'Complete tasks quickly with an intuitive interface.',
    icon: <ThunderboltOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
  },
  {
    title: 'Earn Money Easily',
    description: 'Get paid instantly after task approvals.',
    icon: <DollarCircleOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
  },
  {
    title: 'Secure Platform',
    description: 'Your information and payments are always safe.',
    icon: <SafetyOutlined style={{ fontSize: '48px', color: '#f5222d' }} />,
  },
  {
    title: 'Top Rewards',
    description: 'Earn bonuses and rewards for completing tasks.',
    icon: <TrophyOutlined style={{ fontSize: '48px', color: '#faad14' }} />,
  },
];

const Features: React.FC = () => {
  return (
    <div className="features-section">
      <Title level={2} className="section-title">
        Key Features
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {features.map((feature, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card
              hoverable
              className="feature-card"
              style={{ textAlign: 'center', borderRadius: '10px', padding: '20px' }}
            >
              {feature.icon}
              <Title level={4} style={{ marginTop: '20px' }}>
                {feature.title}
              </Title>
              <Text>{feature.description}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Features;
