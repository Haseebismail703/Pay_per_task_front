import React, { useState } from 'react';
import { Table, Button, Typography, Card, Modal, Form, Input } from 'antd';
import Navbar from '../usercomp/user_nav';

const { Title } = Typography;

interface Operation {
    key: string;
    title: string;
    date: string;
    payout: string;
}

const paidTasks: Operation[] = [
    { key: '1', title: 'Task 1', date: '2024-10-01', payout: '$50' },
    { key: '4', title: 'Task 4', date: '2024-10-15', payout: '$70' },
];

const rejectedTasks: Operation[] = [
    { key: '2', title: 'Task 2', date: '2024-10-05', payout: '$30' },
];

const revisionTasks: Operation[] = [
    { key: '3', title: 'Task 3', date: '2024-10-10', payout: '$40' },
    { key: '5', title: 'Task 5', date: '2024-10-20', payout: '$60' },
];

const OperationHistory: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reportType, setReportType] = useState('');
    const [reportText, setReportText] = useState('');

    const handleReportSubmit = () => {
        console.log('Report Type:', reportType);
        console.log('Report Text:', reportText);
        setIsModalVisible(false);
        // Reset report fields
        setReportType('');
        setReportText('');
    };

    const handleCompleteAgain = (taskTitle: string) => {
        console.log('Completing task again:', taskTitle);
        // Logic to complete the task again
    };

    const columnsRevision = [
        {
            title: 'Task Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Payout',
            dataIndex: 'payout',
            key: 'payout',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: Operation) => (
                <Button type="primary" onClick={() => handleCompleteAgain(record.title)}>
                    Complete Again
                </Button>
            ),
        },
    ];

    const columnsRejected = [
        {
            title: 'Task Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Payout',
            dataIndex: 'payout',
            key: 'payout',
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
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Payout',
            dataIndex: 'payout',
            key: 'payout',
        },
    ];

    return (
        <>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <Title level={3}>Operation History</Title>

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
                        style={{ borderRadius: '8px', maxHeight: '300px', overflowY: 'scroll' }}
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
                        style={{ borderRadius: '8px', maxHeight: '300px', overflowY: 'scroll' }}
                    />
                </Card>

                {/* Paid Tasks Table */}
                <Card style={{ marginBottom: '20px' }}>
                    <Title level={4}>Paid Tasks</Title>
                    <Table
                        columns={columnsPaid}
                        dataSource={paidTasks}
                        pagination={false}
                        rowKey="key"
                        bordered
                        style={{ borderRadius: '8px', maxHeight: '300px', overflowY: 'scroll' }}
                    />
                </Card>

                {/* Report Modal */}
                <Modal
                    title="Report Issue"
                    visible={isModalVisible}
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
