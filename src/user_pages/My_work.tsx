import React, { useState } from 'react';
import { Table, Button, Typography, Card, Input, Modal, Form } from 'antd';
import Navbar from '../usercomp/user_nav';

const { Title } = Typography;

interface Task {
    key: string;
    title: string;
    payout: string;
    totalCompleted: number;
    remaining: number;
    status: string; // Can be 'Accepted', 'Rejected', 'Revision'
}

const tasks: Task[] = [
    { key: '1', title: 'Task 1', payout: '$50', totalCompleted: 5, remaining: 2, status: 'Pending' },
    { key: '2', title: 'Task 2', payout: '$30', totalCompleted: 3, remaining: 0, status: 'Pending' },
    { key: '3', title: 'Task 3', payout: '$40', totalCompleted: 2, remaining: 1, status: 'Pending' },
];

const My_task: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reportText, setReportText] = useState('');
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const handleActionClick = (action: string, task: Task) => {
        setSelectedTask(task);
        if (action === 'Revision') {
            setIsModalVisible(true);
        } else {
            console.log(`${action} task:`, task);
            // Implement Accept/Reject logic here
        }
    };

    const handleRevisionSubmit = () => {
        console.log('Revision for task:', selectedTask?.title);
        console.log('Revision Text:', reportText);
        // Handle revision submission logic here
        setIsModalVisible(false);
        setReportText('');
        setSelectedTask(null);
    };

    const columns = [
        {
            title: 'Task Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Payout',
            dataIndex: 'payout',
            key: 'payout',
        },
        {
            title: 'Total Completed',
            dataIndex: 'totalCompleted',
            key: 'totalCompleted',
        },
        {
            title: 'Remaining',
            dataIndex: 'remaining',
            key: 'remaining',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: Task) => (
                <div>
                    <Button type="primary" onClick={() => handleActionClick('Accept', record)}>
                        Accept
                    </Button>
                    <Button type="default" onClick={() => handleActionClick('Reject', record)} style={{ margin: '0 5px' }}>
                        Reject
                    </Button>
                    <Button onClick={() => handleActionClick('Revision', record)}>
                        Revision
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <Title level={3}>All Tasks</Title>
                <Card style={{ borderRadius: '8px' }}>
                    <Table
                        columns={columns}
                        dataSource={tasks}
                        pagination={false}
                        rowKey="key"
                        bordered
                        style={{ borderRadius: '8px', maxHeight: '500px', overflowY: 'scroll' }}
                    />
                </Card>

                {/* Revision Modal */}
                <Modal
                    title={`Revision for ${selectedTask?.title}`}
                    visible={isModalVisible}
                    onOk={handleRevisionSubmit}
                    onCancel={() => setIsModalVisible(false)}
                >
                    <Form layout="vertical">
                        <Form.Item label="Revision Comments">
                            <Input.TextArea
                                value={reportText}
                                onChange={(e) => setReportText(e.target.value)}
                                placeholder="Describe the revisions needed"
                                rows={4}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
};

export default My_task;
