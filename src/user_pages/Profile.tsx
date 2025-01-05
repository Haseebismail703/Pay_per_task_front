import React, { useState } from 'react';
import { Card, Row, Col, Avatar, Progress, Typography, Button, Modal, Form, Input, Upload, message } from 'antd';
import { DollarCircleOutlined, ProfileOutlined, HourglassOutlined, UploadOutlined } from '@ant-design/icons';
import Navbar from '../usercomp/user_nav';

const { Title, Text } = Typography;

const UserProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatarUrl: '',
    totalEarnings: 450,
    completedTasks: 30,
    pendingTasks: 5,
    progress: 75, // Percentage
  });

  // Handle modal open/close
  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Handle form submission
  const handleFormSubmit = (values: any) => {
    setUserDetails({
      ...userDetails,
      name: values.name,
      avatarUrl: values.avatar ? URL.createObjectURL(values.avatar.file.originFileObj) : userDetails.avatarUrl,
    });
    message.success('Profile updated successfully!');
    setIsModalOpen(false);
  };

  return (
    <>
    <Navbar/>
    <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      {/* Header Section */}
      <Card style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Avatar
          size={100}
          src={userDetails.avatarUrl}
          icon={<ProfileOutlined />}
          style={{ marginBottom: '10px' }}
        />
        <Title level={3}>{userDetails.name}</Title>
        <Text type="secondary">{userDetails.email}</Text>
        <div style={{ marginTop: '10px' }}>
          <Button type="primary" onClick={handleEditProfile}>
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Stats Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Row align="middle">
              <Col span={6}>
                <DollarCircleOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
              </Col>
              <Col span={18}>
                <Title level={4}>Total Earnings</Title>
                <Text strong>${userDetails.totalEarnings}</Text>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Row align="middle">
              <Col span={6}>
                <ProfileOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
              </Col>
              <Col span={18}>
                <Title level={4}>Completed Tasks</Title>
                <Text strong>{userDetails.completedTasks}</Text>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Row align="middle">
              <Col span={6}>
                <HourglassOutlined style={{ fontSize: '36px', color: '#faad14' }} />
              </Col>
              <Col span={18}>
                <Title level={4}>Pending Tasks</Title>
                <Text strong>{userDetails.pendingTasks}</Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Progress Section */}
      <Card style={{ marginTop: '20px' }}>
        <Row align="middle" justify="space-between">
          <Col span={12}>
            <Title level={4}>Task Progress</Title>
            <Text type="secondary">Your overall task completion progress</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Progress
              type="circle"
              percent={userDetails.progress}
              strokeColor="#52c41a"
              format={(percent) => `${percent}%`}
            />
          </Col>
        </Row>
      </Card>

      {/* Edit Profile Modal */}
      <Modal
        title="Edit Profile"
        visible={isModalOpen}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} initialValues={{ name: userDetails.name }}>
          <Form.Item
            label="Username"
            name="name"
            rules={[{ required: true, message: 'Please enter your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Profile Picture" name="avatar">
            <Upload maxCount={1} beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
    </>
  );
};

export default UserProfile;
