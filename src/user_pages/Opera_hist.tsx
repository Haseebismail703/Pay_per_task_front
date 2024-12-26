import React, { useState, useEffect } from 'react';
import { Table, Button, Typography, Card, Modal, Form, Input, Spin } from 'antd';
import Navbar from '../usercomp/user_nav';
import axios from 'axios';
import api from '../api/api';

const { Title } = Typography;

interface Operation {
    key: string;
    taskTitle: string;
    created_at: string;
    publisherReward: number;
    revision: boolean;
}

const OperationHistory: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reportType, setReportType] = useState('');
    const [reportText, setReportText] = useState('');
    const [pendingTask,setPendingTask] = useState<Operation[]>([]);
    const [paidTasks, setPaidTasks] = useState<Operation[]>([]);
    const [rejectedTasks, setRejectedTasks] = useState<Operation[]>([]);
    const [revisionTasks, setRevisionTasks] = useState<Operation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api}/myWork/672ba5b9dd9494d7ee962db`);
                const { approved, reject, revision,pending } = response.data;
                 console.log(response.data);
                 
                const approvedData = approved.map((item: any, index: number) => ({
                    key: `${index + 1}`,
                    publisherReward: item.publisherReward,
                    created_at: item.created_at?.substring(0, 10),
                    imgurl: item.imgurl?.map((imgObj: any) => imgObj.image_url) || [],
                    revision: item.revision,
                    taskTitle: item.taskDetails?.taskTitle,
                }));
                const rejectdData = reject.map((item: any, index: number) => ({
                    key: `${index + 1}`,
                    publisherReward: item.publisherReward,
                    created_at: item.created_at?.substring(0, 10),
                    imgurl: item.imgurl?.map((imgObj: any) => imgObj.image_url) || [],
                    revision: item.revision,
                    taskTitle: item.taskDetails?.taskTitle,
                }));
                const revisionData = revision.map((item: any, index: number) => ({
                    key: `${index + 1}`,
                    publisherReward: item.publisherReward,
                    created_at: item.created_at?.substring(0, 10),
                    imgurl: item.imgurl?.map((imgObj: any) => imgObj.image_url) || [],
                    revision: item.revision,
                    taskTitle: item.taskDetails?.taskTitle,
                }));
                const pendingData = pending.map((item: any, index: number) => ({
                    key: `${index + 1}`,
                    publisherReward: item.publisherReward,
                    created_at: item.created_at?.substring(0, 10),
                    imgurl: item.imgurl?.map((imgObj: any) => imgObj.image_url) || [],
                    revision: item.revision,
                    taskTitle: item.taskDetails?.taskTitle,
                }));
                // Set data to respective states
                setPaidTasks(approvedData);
                setRejectedTasks(rejectdData);
                setRevisionTasks(revisionData);
                setPendingTask(pendingData)
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleReportSubmit = () => {
        console.log('Report Type:', reportType);
        console.log('Report Text:', reportText);
        setIsModalVisible(false);
        setReportType('');
        setReportText('');
    };

    const handleCompleteAgain = (taskTitle: string) => {
        console.log('Completing task again:', taskTitle);
    };

    const columnsPending = [
        {
            title: 'Task Title',
            dataIndex: 'taskTitle',
            key: 'taskTitle',
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Payout',
            dataIndex: 'publisherReward',
            key: 'publisherReward',
            render: (reward: number) => `$${reward}`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: Operation) => (
                <Button type="primary" onClick={() => handleCompleteAgain(record.taskTitle)}>
                    Complete Again
                </Button>
            ),
        },
    ];

    const columnsRevision = [
        {
            title: 'Task Title',
            dataIndex: 'taskTitle',
            key: 'taskTitle',
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Payout',
            dataIndex: 'publisherReward',
            key: 'publisherReward',
            render: (reward: number) => `$${reward}`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: Operation) => (
                <Button type="primary" onClick={() => handleCompleteAgain(record.taskTitle)}>
                    Complete Again
                </Button>
            ),
        },
    ];

    const columnsRejected = [
        {
            title: 'Task Title',
            dataIndex: 'taskTitle',
            key: 'taskTitle',
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Payout',
            dataIndex: 'publisherReward',
            key: 'publisherReward',
            render: (reward: number) => `$${reward}`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: Operation) => (
                <Button type="link" onClick={() => setIsModalVisible(true)}>
                    Report Issue
                </Button>
            ),
        },
    ];

    const columnsPaid = [
        {
            title: 'Task Title',
            dataIndex: 'taskTitle',
            key: 'taskTitle',
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Payout',
            dataIndex: 'publisherReward',
            key: 'publisherReward',
            render: (reward: number) => `$${reward}`,
        },
    ];

    return (
        <>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <Title level={3}>Operation History</Title>
                {loading ? (
                    <Spin  style={{ display: 'block', marginTop: '20px' }} size='large' />
                ) : (
                    <>
                    {/* pending Tasks Table */}
                    <Card style={{ marginBottom: '20px' }}>
                            <Title level={4}>
                                Pending Tasks
                                <span style={{ marginLeft: '10px', color: 'orange' }}>Pending</span>
                            </Title>
                            <Table
                                columns={columnsPending}
                                dataSource={pendingTask}
                                pagination={false}
                                rowKey="key"
                                bordered
                            />
                        </Card>
                        {/* Revision Tasks Table */}
                        <Card style={{ marginBottom: '20px' }}>
                            <Title level={4}>
                                Revision Tasks
                                <span style={{ marginLeft: '10px', color: 'orange' }}>Revision</span>
                            </Title>
                            <Table
                                columns={columnsRevision}
                                dataSource={revisionTasks}
                                pagination={false}
                                rowKey="key"
                                bordered
                            />
                        </Card>

                        {/* Rejected Tasks Table */}
                        <Card style={{ marginBottom: '20px' }}>
                            <Title level={4}>
                                Rejected Tasks
                                <span style={{ marginLeft: '10px', color: 'red' }}>Rejected</span>
                            </Title>
                            <Table
                                columns={columnsRejected}
                                dataSource={rejectedTasks}
                                pagination={false}
                                rowKey="key"
                                bordered
                            />
                        </Card>

                        {/* Paid Tasks Table */}
                        <Card style={{ marginBottom: '20px' }}>
                        <Title level={4}>
                                Approved Tasks
                                <span style={{ marginLeft: '10px', color: 'green' }}>paid</span>
                            </Title>
                            <Table
                                columns={columnsPaid}
                                dataSource={paidTasks}
                                pagination={false}
                                rowKey="key"
                                bordered
                            />
                        </Card>
                    </>
                )}

                {/* Report Modal */}
                <Modal
                    title="Report Issue"
                    open={isModalVisible}
                    onOk={handleReportSubmit}
                    onCancel={() => setIsModalVisible(false)}
                >
                    <Form layout="vertical">
                        <Form.Item label="Report Type">
                            <Input
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                                placeholder="Enter report type"
                            />
                        </Form.Item>
                        <Form.Item label="Report Description">
                            <Input.TextArea
                                value={reportText}
                                onChange={(e) => setReportText(e.target.value)}
                                placeholder="Describe the issue"
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
};

export default OperationHistory;
