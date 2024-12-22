import React, { useEffect, useState } from 'react';
import { Upload, Row, Col, Typography, Card, Image, Button, Form, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Navbar from '../usercomp/user_nav';
import axios from 'axios';
import api from '../api/api';
import { useParams } from 'react-router-dom';

const { Title, Paragraph } = Typography;

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
  const [loading, setLoading] = useState(false);  // For showing the loader during task upload
  const { taskId } = useParams();

  const handleFileChange = (info: any) => {
    if (info.fileList.length > 3) {
      info.fileList.shift(); // Limit to 3 files
    }
    setFileList(info.fileList);
  };

  const handleProofChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProof(e.target.value);
  };

  const handleUploadTask = async () => {
    try {
      setLoading(true);  // Show loader when upload starts
      const formData = new FormData();

      // Append files to formData
      fileList.forEach((file) => {
        formData.append('file', file.originFileObj);
      });

      // Append proof text
      formData.append('proof', proof);

      // Append additional data
      formData.append('userId', '672ba5b9dd9494d7ee962db6');
      formData.append('taskId', taskId || '');
      formData.append('comment', proof);
      formData.append('advId','672ba5b9dd9494d7ee962db6')
      // Make a POST request
      const response = await axios.post(`${api}/submitTask`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data);

      // Reset state
      setFileList([]);
      setProof('');
    } catch (error) {
      console.error('Error uploading task:', error);
    } finally {
      setLoading(false);  // Hide loader after upload
    }
  };

  const getTaskById = async () => {
    try {
      setLoading(true);  // Show loader while fetching task details
      const res = await axios.get<Task>(`${api}/getTaskByuser/672f9356f4a6e888e3312b67`);
      setTaskDetails(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching task details:', error);
    } finally {
      setLoading(false);  // Hide loader after task details are fetched
    }
  };

  useEffect(() => {
    getTaskById();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '600px', width: '100%' }}>
          <Title level={3} style={{ textAlign: 'center' }}>Task Details</Title>

          {loading ? (
            <Spin size="large" style={{ display: 'block', margin: 'auto', padding: '50px' }} />
          ) : taskDetails ? (
            <>
              <Title level={4}>Task Details Preview:</Title>
              <Paragraph><strong>Task Title:</strong> {taskDetails.taskTitle}</Paragraph>
              <Paragraph><strong>Description:</strong> {taskDetails.taskDescription}</Paragraph>
              <Paragraph><strong>Category:</strong> {taskDetails.category}</Paragraph>
              <Paragraph><strong>Price:</strong> ${taskDetails.publisherReward || 'N/A'}</Paragraph>

              <Title level={4}>Upload Images</Title>
              <Upload
                fileList={fileList}
                onChange={handleFileChange}
                beforeUpload={() => false}
                maxCount={3}
                multiple
              >
                <Button icon={<UploadOutlined />} style={{ marginBottom: '20px' }}>
                  Upload Images (Max 3)
                </Button>
              </Upload>

              <Title level={4}>Uploaded Images:</Title>
              <Row gutter={[16, 16]}>
                {fileList.map((file) => (
                  <Col xs={12} sm={8} md={6} lg={4} key={file.uid}>
                    <Card hoverable style={{ width: '100%', borderRadius: '8px' }}>
                      <Image
                        src={URL.createObjectURL(file.originFileObj)}
                        alt={file.name}
                        style={{ width: '100%', height: 'auto' }}
                        preview={{ visible: false }}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>

              <Title level={4}>Proof of Task Completion</Title>
              <Form.Item>
                <textarea
                  value={proof}
                  onChange={handleProofChange}
                  placeholder="Enter proof of task completion..."
                  style={{ width: '100%', height: '100px', borderRadius: '4px', padding: '10px', border: '1px solid #d9d9d9' }}
                />
              </Form.Item>

              <Button
                type="primary"
                onClick={handleUploadTask}
                style={{ width: '100%', marginTop: '20px' }}
              >
                Upload Task
              </Button>
            </>
          ) : (
            <Title level={4} style={{ textAlign: 'center' }}>Loading task details...</Title>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskDetailPage;
