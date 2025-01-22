import React, { useEffect } from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { 
  LaptopOutlined, 
  MobileOutlined, 
  TeamOutlined, 
  FileSearchOutlined, 
  SmileOutlined, 
  ShoppingOutlined 
} from '@ant-design/icons';
import AOS from 'aos';

const { Title } = Typography;

const categories = [
  {
    title: 'Data Entry',
    icon: <LaptopOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
    animation: 'fade-up',
  },
  {
    title: 'Mobile Tasks',
    icon: <MobileOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
    animation: 'flip-left',
  },
  {
    title: 'Survey Participation',
    icon: <FileSearchOutlined style={{ fontSize: '48px', color: '#faad14' }} />,
    animation: 'zoom-in',
  },
  {
    title: 'Social Media',
    icon: <TeamOutlined style={{ fontSize: '48px', color: '#f5222d' }} />,
    animation: 'fade-right',
  },
  {
    title: 'Feedback & Reviews',
    icon: <SmileOutlined style={{ fontSize: '48px', color: '#722ed1' }} />,
    animation: 'flip-up',
  },
  {
    title: 'E-commerce Tasks',
    icon: <ShoppingOutlined style={{ fontSize: '48px', color: '#13c2c2' }} />,
    animation: 'fade-down',
  },
];

const TaskCategories: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      offset: 100,    // Offset from the viewport
    });
  }, []);

  return (
    <div id='taskCategories' className="task-categories">
      <Title level={2} className="section-title" data-aos="fade-up">
        Explore Task Categories
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {categories.map((category, index) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            key={index}
            data-aos={category.animation} // Apply unique animation
            data-aos-delay={index * 200}  // Add staggered delay
          >
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
