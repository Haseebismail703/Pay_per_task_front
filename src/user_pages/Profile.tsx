import React, { useState } from 'react';
import { Card, Row, Col, Typography, Input, Button, Upload, Form, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Profile: React.FC = () => {
    const [form] = Form.useForm();
    const [profileImage, setProfileImage] = useState<string>('defaultProfile.png'); // Default profile image

    const handleImageChange = (info: any) => {
        if (info.file.status === 'done') {
            setProfileImage(info.file.response.url); // Assuming the response returns the image URL
        }
    };

    const handleUpdateProfile = () => {
        message.success('Profile updated successfully!');
    };

    const handleChangePassword = (values: any) => {
        if (values.newPassword !== values.confirmPassword) {
            message.error("New password and confirmation don't match!");
            return;
        }
        // Logic to change the password should be implemented here
        message.success('Password changed successfully!');
    };

    return (
        <Row justify="center" style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
            <Col xs={24} sm={24} md={20} lg={16}>
                <Card
                    title={<Title level={3}>Profile Settings</Title>}
                    bordered={false}
                    style={{
                        borderRadius: '8px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
                        backgroundColor: '#fff',
                    }}
                >
                    <Row gutter={16}>
                        <Col xs={24} sm={8} md={6}>
                            <Upload
                                showUploadList={false}
                                beforeUpload={() => false} // Prevent automatic upload
                                onChange={handleImageChange}
                            >
                                <Button icon={<UploadOutlined />}>Change Profile Image</Button>
                            </Upload>
                            <img
                                src={profileImage}
                                alt="Profile"
                                style={{
                                    width: '100%',
                                    borderRadius: '8px',
                                    marginTop: '16px',
                                }}
                            />
                        </Col>
                        <Col xs={24} sm={16} md={18}>
                            <Form form={form} layout="vertical">
                                <Form.Item label="Username" name="username" initialValue="John Doe">
                                    <Input prefix={<UserOutlined />} placeholder="Enter your username" />
                                </Form.Item>
                                <Form.Item label="Email" name="email" initialValue="john.doe@example.com">
                                    <Input prefix={<MailOutlined />} placeholder="Enter your email" />
                                </Form.Item>

                                {/* Change Password Section */}
                                <Title level={4}>Change Password</Title>
                                <Form.Item
                                    label="Current Password"
                                    name="currentPassword"
                                    rules={[{ required: true, message: 'Please enter your current password!' }]}
                                >
                                    <Input.Password prefix={<LockOutlined />} placeholder="Enter your current password" />
                                </Form.Item>
                                <Form.Item
                                    label="New Password"
                                    name="newPassword"
                                    rules={[{ required: true, message: 'Please enter a new password!' }]}
                                >
                                    <Input.Password prefix={<LockOutlined />} placeholder="Enter your new password" />
                                </Form.Item>
                                <Form.Item
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    rules={[{ required: true, message: 'Please confirm your new password!' }]}
                                >
                                    <Input.Password prefix={<LockOutlined />} placeholder="Confirm your new password" />
                                </Form.Item>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        form
                                            .validateFields()
                                            .then(values => handleChangePassword(values))
                                            .catch(info => {
                                                console.log('Validation Failed:', info);
                                            });
                                    }}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Change Password
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default Profile;
