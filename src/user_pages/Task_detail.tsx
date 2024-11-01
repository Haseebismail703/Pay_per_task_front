import React, { useState } from 'react';
import { Upload, Row, Col, Typography, Card, Image, Button, Form} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Navbar from '../usercomp/user_nav';

const { Title, Paragraph } = Typography;

const TaskDetailPage: React.FC = () => {
    const [taskDetails] = useState({
        title: 'Sample Task Title',
        description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptates, mollitia veritatis officiis eligendi deserunt excepturi asperiores quam, sunt ex, quaerat suscipit ad placeat quas molestiae sequi harum eaque labore!',
        budget: '100',
        category: 'Development',
    });

    const [fileList, setFileList] = useState<any[]>([]);
    const [proof, setProof] = useState('');

    const handleFileChange = (info: any) => {
        if (info.fileList.length > 3) {
            info.fileList.shift(); // Limit to 3 files
        }
        setFileList(info.fileList);
    };

    const handleProofChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProof(e.target.value);
    };

    const handleUploadTask = () => {
        // Handle task upload logic here
        console.log('Task Uploaded');
        console.log('Uploaded Files:', fileList);
        console.log('Proof Information:', proof);
    };

    return (
        <>
            <Navbar />
            
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ maxWidth: '600px', width: '100%' }}>
                    <Title level={3} style={{ textAlign: 'center' }}>Task Details</Title>
                    
                    {/* Display Task Details */}
                    <Title level={4}>Task Details Preview:</Title>
                    <Paragraph><strong>Task Title:</strong> {taskDetails.title}</Paragraph>
                    <Paragraph><strong>Description:</strong> {taskDetails.description}</Paragraph>
                    <Paragraph><strong>Budget:</strong> ${taskDetails.budget}</Paragraph>
                    <Paragraph><strong>Category:</strong> {taskDetails.category}</Paragraph>

                    {/* Image Upload Section */}
                    <Title level={4}>Upload Images</Title>
                    <Upload
                        fileList={fileList}
                        onChange={handleFileChange}
                        beforeUpload={() => false} // Prevent automatic upload
                        maxCount={3} // Limit to 3 files
                        multiple
                    >
                        <Button icon={<UploadOutlined />} style={{ marginBottom: '20px' }}>
                            Upload Images (Max 3)
                        </Button>
                    </Upload>

                    {/* Display Uploaded Images */}
                    <Title level={4}>Uploaded Images:</Title>
                    <Row gutter={[16, 16]}>
                        {fileList.map((file) => (
                            <Col xs={12} sm={8} md={6} lg={4} key={file.uid}>
                                <Card hoverable style={{ width: '100%', borderRadius: '8px' }}>
                                    <Image
                                        src={URL.createObjectURL(file.originFileObj)}
                                        alt={file.name}
                                        style={{ width: '100%', height: 'auto' }}
                                        preview={{ visible: false }} // Prevent default preview
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Proof Information Section */}
                    <Title level={4}>Proof of Task Completion</Title>
                    <Form.Item>
                        <textarea
                            value={proof}
                            onChange={handleProofChange}
                            placeholder="Enter proof of task completion..."
                            style={{ width: '100%', height: '100px', borderRadius: '4px', padding: '10px', border: '1px solid #d9d9d9' }}
                        />
                    </Form.Item>

                    {/* Upload Task Button */}
                    <Button 
                        type="primary" 
                        onClick={handleUploadTask} 
                        style={{ width: '100%', marginTop: '20px' }}
                    >
                        Upload Task
                    </Button>
                </div>
            </div>
        </>
    );
};

export default TaskDetailPage;
