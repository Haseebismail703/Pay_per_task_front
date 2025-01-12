import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Avatar, Progress, Typography, Button, Modal, Form, Input, Upload, message } from 'antd';
import { DollarCircleOutlined, ProfileOutlined, HourglassOutlined, UploadOutlined } from '@ant-design/icons';
import Navbar from '../usercomp/user_nav';
import axios from 'axios';
import api from '../api/api';

const { Title, Text } = Typography;

interface User {
  username: string;
  email: string;
  profileurl: string;
  earning: number;
  completed: number;
  pending: number;
  progress: number;
  payeer: string;
  perfectMoney: string;
}

const UserProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [userDetails, setUserDetails] = useState<User>({
    username: '',
    email: '',
    profileurl: '',
    earning: 0,
    completed: 0,
    pending: 0,
    progress: 0,
    payeer: '',
    perfectMoney: ''
  });

  const fetchUserData = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    try {
      const response = await axios.get(`${api}/userProfile/${user?.user_data.id}`);
      setUserDetails(response.data?.user);
      console.log('User data:',response.data?.user );
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (values: any) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const formData = new FormData();
      formData.append('username', values.name);
      formData.append('perfectMoney', values.perfectMoney);
      formData.append('payeer', values.payeer);

      if (fileList.length > 0) {
        // Appending the selected file
        formData.append('file', fileList[0].originFileObj);
      }
      const response = await axios.put(`${api}/profileUpdate/${user?.user_data.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUserDetails({
        ...userDetails,
        username: response.data.username,
        profileurl: response.data.profileurl,
        perfectMoney: response.data.perfectMoney,
        payeer: response.data.payeer,

      });
      fetchUserData();
      message.success('Profile updated successfully!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Failed to update profile.');
    }
  };


  return (
    <>
      <Navbar />
      <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
        {/* Header Section */}
        <Card
          style={{
            marginBottom: '20px',
            textAlign: 'center',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(to bottom, #ffffff, #f7f9fc)',
            padding: '20px',
          }}
        >
          <Avatar
            size={100}
            src={userDetails.profileurl || <ProfileOutlined />}
            style={{
              marginBottom: '15px',
              border: '2px solid #1890ff',
              backgroundColor: '#e6f7ff',
            }}
          />
          <Title level={3} style={{ color: '#1a1a1a', marginBottom: '5px' }}>
            {userDetails.username}
          </Title>
          <Text type="secondary" style={{ fontSize: '16px', color: '#595959' }}>
            {userDetails.email}
          </Text>
          <div style={{ marginTop: '15px' }}>
            <Text strong style={{ fontSize: '14px', color: '#1890ff' }}>
              Payeer: {userDetails.payeer || 'Not Provided'}
            </Text>
            <br />
            <Text strong style={{ fontSize: '14px', color: '#52c41a' }}>
              Perfect Money: {userDetails.perfectMoney || 'Not Provided'}
            </Text>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={handleEditProfile}
              style={{
                backgroundColor: '#1890ff',
                borderColor: '#1890ff',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Stats Section */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(to bottom, #f6ffed, #ffffff)',
                textAlign: 'center',
              }}
            >
              <DollarCircleOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '10px' }} />
              <Title level={4} style={{ marginBottom: '5px' }}>Total Earnings</Title>
              <Text strong style={{ fontSize: '16px', color: '#333' }}>${userDetails.earning}</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(to bottom, #e6f7ff, #ffffff)',
                textAlign: 'center',
              }}
            >
              <ProfileOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '10px' }} />
              <Title level={4} style={{ marginBottom: '5px' }}>Completed Tasks</Title>
              <Text strong style={{ fontSize: '16px', color: '#333' }}>{userDetails.completed}</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(to bottom, #fffbe6, #ffffff)',
                textAlign: 'center',
              }}
            >
              <HourglassOutlined style={{ fontSize: '48px', color: '#faad14', marginBottom: '10px' }} />
              <Title level={4} style={{ marginBottom: '5px' }}>Pending Tasks</Title>
              <Text strong style={{ fontSize: '16px', color: '#333' }}>{userDetails.pending}</Text>
            </Card>
          </Col>
        </Row>

        {/* Progress Section */}
        <Card
          style={{
            marginTop: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(to bottom, #ffffff, #fafafa)',
            padding: '20px',
          }}
        >
          <Row align="middle" justify="space-between">
            <Col span={12}>
              <Title level={4} style={{ marginBottom: '5px', color: '#1a1a1a' }}>Task Progress</Title>
              <Text type="secondary" style={{ fontSize: '14px', color: '#595959' }}>
                Your overall task completion progress
              </Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Progress
                type="circle"
                percent={userDetails.progress}
                strokeColor={{
                  '0%': '#52c41a',
                  '100%': '#237804',
                }}
                format={(percent) => `${percent}%`}
              />
            </Col>
          </Row>
        </Card>

        {/* Edit Profile Modal */}
        <Modal
          title="Edit Profile"
          open={isModalOpen}
          onCancel={handleCancel}
          onOk={() => form.submit()}
          okText="Save"
          cancelText="Cancel"
        >
          <Form form={form} layout="vertical" onFinish={handleFormSubmit} initialValues={{ name: userDetails.username, payeer: userDetails.payeer, perfectMoney: userDetails.perfectMoney }}>
            <Form.Item
              label="Username"
              name="name"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="payeer"
              name="payeer"
              rules={[{ required: true, message: 'Please enter your payeer wallet address!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="perfectMoney"
              name="perfectMoney"
              rules={[{ required: true, message: 'Please enter your perfectMoney wallet address!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Profile Picture" name="avatar">
              <Upload
                maxCount={1}
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
                beforeUpload={() => false}
                listType="picture"
              >
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
