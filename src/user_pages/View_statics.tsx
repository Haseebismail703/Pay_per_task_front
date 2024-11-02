import React, { useState } from 'react';
import { Table, Button, Modal, Input, Row, Col, Typography, Image, Tag, Tooltip } from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ReloadOutlined,
    EyeOutlined,
    
} from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

interface Task {
    key: string;
    username: string;
    country: string;
    payout: string;
    date: string;
    status: 'Accepted' | 'Rejected' | 'Revision';
    proofImage: string;
}

const ViewStatisticsPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { key: '1', username: 'John Doe', country: 'USA', payout: '$50', date: '2023-11-01', status: 'Accepted', proofImage: '/path/to/image1.jpg' },
        { key: '2', username: 'Jane Smith', country: 'Canada', payout: '$40', date: '2023-11-02', status: 'Rejected', proofImage: '/path/to/image2.jpg' },
        { key: '3', username: 'Alice Johnson', country: 'UK', payout: '$30', date: '2023-11-03', status: 'Revision', proofImage: '/path/to/image3.jpg' },
    ]);

    const [isRevisionModalVisible, setIsRevisionModalVisible] = useState(false);
    const [isProofModalVisible, setIsProofModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [revisionComment, setRevisionComment] = useState('');

    const showRevisionModal = (task: Task) => {
        setSelectedTask(task);
        setIsRevisionModalVisible(true);
    };

    const showProofModal = (task: Task) => {
        setSelectedTask(task);
        setIsProofModalVisible(true);
    };

    const handleRevisionSubmit = () => {
        console.log('Revision comment:', revisionComment);
        setIsRevisionModalVisible(false);
        setRevisionComment('');
    };

    const handleAction = (task: Task, action: 'Accepted' | 'Rejected' | 'Revision') => {
        setTasks((prevTasks) =>
            prevTasks.map((t) =>
                t.key === task.key ? { ...t, status: action } : t
            )
        );
    };

    const handleTableData = (status: string) => {
        return tasks.filter((task) => task.status === status);
    };

    const getColumns = (showActions: boolean) => [
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Payout',
            dataIndex: 'payout',
            key: 'payout',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Status',
            key: 'status',
            render: (_: any, task: Task) =>
                showActions ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Tooltip title="Accept">
                            <Button
                                type="primary"
                                icon={<CheckCircleOutlined />}
                                onClick={() => handleAction(task, 'Accepted')}
                            />
                        </Tooltip>
                        <Tooltip title="Reject">
                            <Button
                                type="default"
                                icon={<CloseCircleOutlined />}
                                onClick={() => handleAction(task, 'Rejected')}
                            />
                        </Tooltip>
                        <Tooltip title="Revision">
                            <Button
                                type="dashed"
                                icon={<ReloadOutlined />}
                                onClick={() => showRevisionModal(task)}
                            />
                        </Tooltip>
                        <Tooltip title="View Proof">
                            <Button
                                icon={<EyeOutlined />}
                                onClick={() => showProofModal(task)}
                            />
                        </Tooltip>
                    </div>
                ) : (
                    <Tag color={
                        task.status === 'Accepted' ? 'green' :
                        task.status === 'Rejected' ? 'red' : 'orange'
                    }>
                        {task.status}
                    </Tag>
                ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Title level={3}>Task Statistics</Title>

            <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                <Col span={24}>
                    <Title level={4}>All Tasks</Title>
                    <Table
                        columns={getColumns(true)} // Show actions with icons in All Tasks table
                        dataSource={tasks}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: '100%' }}
                        bordered
                    />
                </Col>

                <Col span={24}>
                    <Title level={4}>Accepted Tasks</Title>
                    <Table
                        columns={getColumns(false)} // No actions, only status tag in Accepted table
                        dataSource={handleTableData('Accepted')}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: '100%' }}
                        bordered
                    />
                </Col>

                <Col span={24}>
                    <Title level={4}>Rejected Tasks</Title>
                    <Table
                        columns={getColumns(false)} // No actions, only status tag in Rejected table
                        dataSource={handleTableData('Rejected')}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: '100%' }}
                        bordered
                    />
                </Col>

                <Col span={24}>
                    <Title level={4}>Revision Tasks</Title>
                    <Table
                        columns={getColumns(false)} // No actions, only status tag in Revision table
                        dataSource={handleTableData('Revision')}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: '100%' }}
                        bordered
                    />
                </Col>
            </Row>

            {/* Revision Modal */}
            <Modal
                title="Provide Revision Comments"
                visible={isRevisionModalVisible}
                onOk={handleRevisionSubmit}
                onCancel={() => setIsRevisionModalVisible(false)}
            >
                <TextArea
                    rows={4}
                    value={revisionComment}
                    onChange={(e) => setRevisionComment(e.target.value)}
                    placeholder="Enter revision comments here..."
                />
            </Modal>

            {/* Proof Modal */}
            <Modal
                title="Proof Image"
                visible={isProofModalVisible}
                onOk={() => setIsProofModalVisible(false)}
                onCancel={() => setIsProofModalVisible(false)}
                footer={null}
            >
                {selectedTask && (
                    <Image
                        src={selectedTask.proofImage}
                        alt="Proof"
                        style={{ width: '100%', height: 'auto' }}
                    />
                )}
            </Modal>
        </div>
    );
};

export default ViewStatisticsPage;
