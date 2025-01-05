import React, { useState } from 'react';
import { Card, Col, Row, Avatar, Typography, Button, Input, Form, Upload, Divider, Space, List } from 'antd';
import { MailOutlined, PhoneOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import Admin_navb from '../Admin_comp/Admin_navb';

const { Title, Text } = Typography;

const AdminProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const recentActivities = [
    'Created a new task for Class 10 Science',
    'Reviewed submissions for Math Assignment',
    'Updated quiz for English Grammar',
    'Added new students to Class 12',
    'Deleted an outdated task',
  ];

  const tasksOverview = [
    { title: 'Total Tasks Created', value: 25 },
    { title: 'Pending Tasks', value: 8 },
    { title: 'Reviewed Tasks', value: 17 },
    { title: 'Classes Managed', value: 4 },
  ];

  return (
    <>
      <Admin_navb />
      <div style={{ padding: '20px' }}>
        <Row gutter={[16, 16]}>
          {/* Profile Card */}
          <Col xs={24} sm={24} md={8}>
            <Card style={{ textAlign: 'center' }}>
              <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={() => false} // Prevents automatic upload; replace with custom upload function if needed
              >
                <Avatar size={120} src="https://via.placeholder.com/120" />
                <div>
                  <Button icon={<UploadOutlined />}>Change Avatar</Button>
                </div>
              </Upload>
              <Divider />
              <Form form={form} layout="vertical" initialValues={{ name: 'John Doe', location: 'Bay Area, San Francisco, CA' }}>
                <Form.Item label="Full Name" name="name">
                  <Input disabled={!isEditing} />
                </Form.Item>
                <Form.Item label="Location" name="location">
                  <Input disabled={!isEditing} />
                </Form.Item>
                <Space>
                  {isEditing ? (
                    <>
                      <Button type="primary" onClick={toggleEdit}>Save</Button>
                      <Button onClick={toggleEdit}>Cancel</Button>
                    </>
                  ) : (
                    <Button icon={<EditOutlined />} onClick={toggleEdit}>Edit Profile</Button>
                  )}
                </Space>
              </Form>
            </Card>
          </Col>

          {/* Information Card */}
          <Col xs={24} sm={24} md={16}>
            <Card>
              <Title level={4}>Contact Information</Title>
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  email: 'fip@jukmuh.al',
                  phone: '(239) 816-9029',
                  mobile: '(320) 380-4539',
                  address: 'Bay Area, San Francisco, CA',
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item label="Email" name="email">
                      <Input disabled={!isEditing} prefix={<MailOutlined />} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Phone" name="phone">
                      <Input disabled={!isEditing} prefix={<PhoneOutlined />} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Mobile" name="mobile">
                      <Input disabled={!isEditing} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Address" name="address">
                      <Input disabled={!isEditing} />
                    </Form.Item>
                  </Col>
                </Row>
                {isEditing && (
                  <Space>
                    <Button type="primary" onClick={toggleEdit}>Save</Button>
                    <Button onClick={toggleEdit}>Cancel</Button>
                  </Space>
                )}
              </Form>
            </Card>
          </Col>

          {/* Tasks Overview */}
          <Col xs={24} sm={24} md={12}>
            <Card>
              <Title level={5} style={{ color: '#1890ff' }}>Tasks Overview</Title>
              <List
                itemLayout="horizontal"
                dataSource={tasksOverview}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={<Text strong>{item.title}</Text>}
                      description={<Text>{item.value}</Text>}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Recent Activities */}
          <Col xs={24} sm={24} md={12}>
            <Card>
              <Title level={5} style={{ color: '#1890ff' }}>Recent Activities</Title>
              <List
                dataSource={recentActivities}
                renderItem={(item) => (
                  <List.Item>
                    <Text>{item}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AdminProfile;
