import React, { useState, useEffect } from 'react';
import { Table, Button, Typography, Card, Modal, Form, Input, Spin,message } from 'antd';
import Navbar from '../usercomp/user_nav';
import axios from 'axios';
import api from '../api/api';
import { Link } from 'react-router-dom';

const { Title } = Typography;

interface Operation {
    id: string;
    key: string;
    taskTitle: string;
    created_at: string;
    publisherReward: number;
    revision: boolean;
    taskId : string;
}

const OperationHistory: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reportType, setReportType] = useState('');
    const [reportText, setReportText] = useState('');
    const [pendingTask, setPendingTask] = useState<Operation[]>([]);
    const [paidTasks, setPaidTasks] = useState<Operation[]>([]);
    const [rejectedTasks, setRejectedTasks] = useState<Operation[]>([]);
    const [revisionTasks, setRevisionTasks] = useState<Operation[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            let user = JSON.parse(localStorage.getItem('user') || '{}');
            try {
                const response = await axios.get(`${api}/myWork/${user?.user_data.id}`);
                const { approved, reject, revision, pending } = response.data;
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
                    id: item._id,
                    taskId : item.taskId,
                    publisherReward: item.publisherReward,
                    created_at: item.created_at?.substring(0, 10),
                    imgurl: item.imgurl?.map((imgObj: any) => imgObj.image_url) || [],
                    revision: item.revision,
                    taskTitle: item.taskDetails?.taskTitle,
                }));
                const revisionData = revision.map((item: any, index: number) => ({
                    key: `${index + 1}`,
                    publisherReward: item.publisherReward,
                    taskId : item.taskId,
                    created_at: item.created_at?.substring(0, 10),
                    imgurl: item.imgurl?.map((imgObj: any) => imgObj.image_url) || [],
                    revision: item.revision,
                    taskTitle: item.taskDetails?.taskTitle,
                }));
                const pendingData = pending.map((item: any, index: number) => ({
                    key: `${index + 1}`,
                    taskId : item.taskId,
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
                setPendingTask(pendingData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleReportSubmit = async () => {
        // console.log(currentTaskId)
        let user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!currentTaskId) return;
        try {
            await axios.post(`${api}/reportTask`, {
                userId: user?.user_data.id,
                taskId: currentTaskId,
                reportType: reportType,
                reportDesc: reportText,
            });
            message.success('Report submitted successfully');
        } catch (error) {
            // console.log('Error reporting:', error);
            const errorMessage = axios.isAxiosError(error) && error.response?.data?.message || 'Error reporting the task';
            message.error(errorMessage);
        }
        console.log('Report Type:', reportType);
        console.log('Report Text:', reportText);
        setIsModalVisible(false);
        setReportType('');
        setReportText('');
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
            render: (record: Operation) => (
                <Button type="primary">
                    <Link to={`/allTask/${record.taskId}`}>Complete Again</Link>
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
            render: (record: Operation) => (
                <Button type="link" onClick={() => { setIsModalVisible(true); setCurrentTaskId(record.taskId); }}>
                    Report
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
                    <Spin style={{ display: 'block', marginTop: '20px' }} size='large' />
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
                                scroll={{x : "100"}}
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
                                scroll={{x : "100"}}
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
                                scroll={{x : "100"}}

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
                                scroll={{x : "100"}}
                            />
                        </Card>
                    </>
                )}

                {/* Report Modal */}
                <Modal
                    title="Report the advertiser"
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
