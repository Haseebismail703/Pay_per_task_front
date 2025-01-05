import React, { useEffect, useState } from 'react';
import {
  Upload,
  Row,
  Col,
  Typography,
  Card,
  Image,
  Button,
  Form,
  Spin,
  Space,
  message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Navbar from '../usercomp/user_nav';
import axios from 'axios';
import api from '../api/api';
import { useParams } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const TaskDetailPage: React.FC = () => {
  interface Task {
    taskTitle: string;
    taskDescription: string;
    category: string;
    publisherReward: number;
    targetCountries: string[];
  }

  const [taskDetails, setTaskDetails] = useState<Task | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [proof, setProof] = useState('');
  const [loading, setLoading] = useState(false);
  const { taskId } = useParams();

  const handleFileChange = (info: any) => {
    if (info.fileList.length > 3) {
      message.warning('You can only upload up to 3 files.');
      info.fileList.shift();
    }
    setFileList(info.fileList);
  };

  const handleProofChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProof(e.target.value);
  };

  const handleUploadTask = async () => {
    if (!proof || fileList.length === 0) {
      message.error('Please upload images and provide proof before submitting.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      fileList.forEach((file) => {
        formData.append('file', file.originFileObj);
      });

      formData.append('proof', proof);
      formData.append('country', 'usa');
      formData.append('userId', '672ba5b9dd9494d7ee962db6');
      formData.append('taskId', taskId || '');
      formData.append('comment', proof);
      formData.append('advId', '672ba5b9dd9494d7ee962db6');

      const response = await axios.post(`${api}/submitTask`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      message.success('Task submitted successfully!');
      setFileList([]);
      setProof('');
    } catch (error) {
      message.error('Failed to upload task. Please try again.');
      console.error('Error uploading task:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTaskById = async () => {
    try {
      setLoading(true);
      const res = await axios.get<Task>(`${api}/getTaskByuser/672f9356f4a6e888e3312b67`);
      setTaskDetails(res.data);
    } catch (error) {
      message.error('Error fetching task details.');
      console.error('Error fetching task details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTaskById();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px', background: '#eef2f5', minHeight: '100vh' }}>
        <div
          style={{
            maxWidth: '900px',
            margin: 'auto',
            background: '#fff',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Task Details
          </Title>

          {loading ? (
            <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />
          ) : taskDetails ? (
            <>
              <Card
                style={{
                  marginBottom: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <Title level={4}>Task Overview</Title>
                <Paragraph>
                  <Text strong>Task Title:</Text> {taskDetails.taskTitle}
                </Paragraph>
                <Paragraph>
                  <Text strong>Description:</Text> {taskDetails.taskDescription}
                </Paragraph>
                <Paragraph>
                  <Text strong>Category:</Text> {taskDetails.category}
                </Paragraph>
                <Paragraph>
                  <Text strong>Price:</Text> ${taskDetails.publisherReward || 'N/A'}
                </Paragraph>
              </Card>

              <Card
                style={{
                  marginBottom: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <Title level={4}>Upload Images</Title>
                <Upload
                  fileList={fileList}
                  onChange={handleFileChange}
                  beforeUpload={() => false}
                  maxCount={3}
                  multiple
                  style={{ marginBottom: '20px' }}
                >
                  <Button icon={<UploadOutlined />}>Upload Images (Max 3)</Button>
                </Upload>
                <Row gutter={[16, 16]}>
                  {fileList.map((file) => (
                    <Col xs={12} sm={8} md={6} key={file.uid}>
                      <Image
                        src={URL.createObjectURL(file.originFileObj)}
                        alt={file.name}
                        style={{
                          width: '100%',
                          borderRadius: '10px',
                          border: '1px solid #ddd',
                          padding: '5px',
                        }}
                        preview={false}
                      />
                    </Col>
                  ))}
                </Row>
              </Card>

              <Card
                style={{
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <Title level={4}>Proof of Task Completion</Title>
                <Form.Item style={{ marginBottom: '20px' }}>
                  <textarea
                    value={proof}
                    onChange={handleProofChange}
                    placeholder="Enter proof of task completion..."
                    style={{
                      width: '100%',
                      height: '120px',
                      borderRadius: '8px',
                      padding: '12px',
                      border: '1px solid #d9d9d9',
                    }}
                  />
                </Form.Item>
                <Button
                  type="primary"
                  onClick={handleUploadTask}
                  style={{
                    width: '100%',
                    height: '50px',
                    fontSize: '16px',
                    borderRadius: '6px',
                  }}
                  loading={loading}
                >
                  Submit Task
                </Button>
              </Card>
            </>
          ) : (
            <Title level={4} style={{ textAlign: 'center' }}>
              Loading task details...
            </Title>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskDetailPage;
