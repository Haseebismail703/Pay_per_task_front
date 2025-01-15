import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { 
  LaptopOutlined, 
  MobileOutlined, 
  TeamOutlined, 
  FileSearchOutlined, 
  SmileOutlined, 
  ShoppingOutlined 
} from '@ant-design/icons';


const { Title } = Typography;

const categories = [
  {
    title: 'Data Entry',
    icon: <LaptopOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
  },
  {
    title: 'Mobile Tasks',
    icon: <MobileOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
  },
  {
    title: 'Survey Participation',
    icon: <FileSearchOutlined style={{ fontSize: '48px', color: '#faad14' }} />,
  },
  {
    title: 'Social Media Engagement',
    icon: <TeamOutlined style={{ fontSize: '48px', color: '#f5222d' }} />,
  },
  {
    title: 'Feedback & Reviews',
    icon: <SmileOutlined style={{ fontSize: '48px', color: '#722ed1' }} />,
  },
  {
    title: 'E-commerce Tasks',
    icon: <ShoppingOutlined style={{ fontSize: '48px', color: '#13c2c2' }} />,
  },
];

const TaskCategories: React.FC = () => {
  return (
    <div className="task-categories">
      <Title level={2} className="section-title">
        Explore Task Categories
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {categories.map((category, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              hoverable
              className="category-card"
              style={{
                textAlign: 'center',
                borderRadius: '10px',
                padding: '20px',
              }}
            >
              {category.icon}
              <Title level={4} style={{ marginTop: '20px' }}>
                {category.title}
              </Title>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TaskCategories;
