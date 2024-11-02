import React, { useState } from 'react';
import { Table, Button, Tag, Typography, Row, Col } from 'antd';
import { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Task {
    key: string;
    title: string;
    payout: number;
    total: number;
    completed: number;
    remaining: number;
    status: 'Paused' | 'Active';
}

const initialTasks: Task[] = [
    { key: '1', title: 'Install App', payout: 50, total: 20, completed: 18, remaining: 2, status: 'Active' },
    { key: '2', title: 'Survey Task', payout: 75, total: 10, completed: 10, remaining: 0, status: 'Paused' },
    { key: '3', title: 'Social Media Share', payout: 40, total: 15, completed: 10, remaining: 5, status: 'Active' },
];

const Youre_site: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const handleToggleStatus = (key: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.key === key ? { ...task, status: task.status === 'Active' ? 'Paused' : 'Active' } : task
            )
        );
    };




    const columns: ColumnsType<Task> = [
        {
            title: 'Task Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Payout',
            dataIndex: 'payout',
            key: 'payout',
            render: (payout) => `$${payout}`,
        },
        {
            title: 'Total Tasks',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Completed',
            dataIndex: 'completed',
            key: 'completed',
        },
        {
            title: 'Remaining',
            dataIndex: 'remaining',
            key: 'remaining',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Active' ? 'green' : 'volcano'}>
                    {status === 'Active' ? 'Active' : 'Paused'}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, task) => (
                <Row gutter={8}>
                    <Col>
                        <Button type="link">
                            View Statics
                        </Button>
                    </Col>
                    <Col>
                        <Button type="primary" onClick={() => handleToggleStatus(task.key)}>
                            {task.status === 'Active' ? 'Pause' : 'Resume'}
                        </Button>
                    </Col>
                </Row>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Title level={3}>All Tasks</Title>
            <Table
                columns={columns}
                dataSource={tasks}
                pagination={{ pageSize: 5 }}
                scroll={{ x: 800 }}
                rowKey="key"
                bordered
            />

        </div>
    );
};

export default Youre_site;
