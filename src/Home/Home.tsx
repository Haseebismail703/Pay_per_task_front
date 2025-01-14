import React from "react";
import { Layout, Row, Col, Button, Card, Typography, List, Avatar, Statistic } from "antd";
import {
  TeamOutlined,
  CheckCircleOutlined,
  DollarCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <Header style={{ backgroundColor: "#1890ff", padding: "20px" }}>
        <Row justify="center" align="middle">
          <Col>
            <Title style={{ color: "#fff" }} level={2}>Earn Money by Completing Simple Tasks</Title>
            <Button type="primary" size="large" style={{ margin: "10px" }}>
              Get Started Now
            </Button>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: "20px 50px" }}>
        {/* How It Works Section */}
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
            <Title level={3} style={{ textAlign: "center" }}>How It Works</Title>
          </Col>
          {["Sign Up", "Choose a Task", "Complete & Earn"].map((step, index) => (
            <Col xs={24} sm={8} key={index}>
              <Card title={step} bordered>
                <Paragraph>Step {index + 1}: {step}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Features/Benefits Section */}
        <Row gutter={[16, 16]} justify="center" style={{ marginTop: 40 }}>
          <Col span={24}>
            <Title level={3} style={{ textAlign: "center" }}>Why Choose Us</Title>
          </Col>
          {[{
            icon: <TeamOutlined />, title: "For Workers", desc: "Flexible working hours and real payouts."
          }, {
            icon: <CheckCircleOutlined />, title: "For Employers", desc: "Pay only for completed tasks."
          }].map((feature, index) => (
            <Col xs={24} sm={12} key={index}>
              <Card bordered>
                {feature.icon}
                <Title level={4}>{feature.title}</Title>
                <Paragraph>{feature.desc}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Task Categories Section */}
        <Row gutter={[16, 16]} justify="center" style={{ marginTop: 40 }}>
          <Col span={24}>
            <Title level={3} style={{ textAlign: "center" }}>Popular Categories</Title>
          </Col>
          {["Surveys", "Data Entry", "App Testing", "Content Writing", "Social Media Sharing"].map((category, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card title={category} bordered>
                <Paragraph>Discover tasks in {category}.</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Testimonials Section */}
        <Row gutter={[16, 16]} justify="center" style={{ marginTop: 40 }}>
          <Col span={24}>
            <Title level={3} style={{ textAlign: "center" }}>What Our Users Say</Title>
          </Col>
          <List
            itemLayout="horizontal"
            dataSource={[{
              name: "John Doe", feedback: "This platform helped me earn extra income effortlessly."
            }, {
              name: "Jane Smith", feedback: "I got my tasks done quickly and efficiently!"
            }]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={item.name}
                  description={item.feedback}
                />
              </List.Item>
            )}
          />
        </Row>

        {/* Live Stats Section */}
        <Row gutter={[16, 16]} justify="center" style={{ marginTop: 40 }}>
          {[{
            title: "Total Tasks", value: 50000, icon: <CheckCircleOutlined />
          }, {
            title: "Total Users", value: 10000, icon: <TeamOutlined />
          }, {
            title: "Total Payouts", value: 500000, icon: <DollarCircleOutlined />
          }].map((stat, index) => (
            <Col xs={24} sm={8} key={index}>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
              />
            </Col>
          ))}
        </Row>

        {/* Call-to-Action Section */}
        <Row justify="center" style={{ marginTop: 50 }}>
          <Button type="primary" size="large">
            Start Earning Today!
          </Button>
        </Row>
      </Content>

      <Footer style={{ textAlign: "center" }}>© 2025 Pay Per Task Platform</Footer>
    </Layout>
  );
};

export default HomePage;
