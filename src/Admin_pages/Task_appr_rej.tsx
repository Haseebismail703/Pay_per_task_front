import React, { useState } from 'react';
import { Table, Button, Modal, Tag, Select } from 'antd';

const { Option } = Select;

interface Task {
    key: string;
    userName: string;
    taskName: string;
    payoutCategory: string;
    status: string;
    details: {
        category: string;
        country: string;
        description: string;
    };
}

const tasksData: Task[] = [
    {
        key: '1',
        userName: 'John Doe',
        taskName: 'Complete Project A',
        payoutCategory: '$100',
        status: 'Pending',
        details: {
            category: 'Development',
            country: 'USA',
            description: 'This task involves developing the backend for Project A.',
        },
    },
    {
        key: '2',
        userName: 'Jane Smith',
        taskName: 'Design New Feature',
        payoutCategory: '$200',
        status: 'Complete',
        details: {
            category: 'Design',
            country: 'UK',
            description: 'This task involves designing a new feature for the application.',
        },
    },
    {
        key: '3',
        userName: 'Alice Johnson',
        taskName: 'Fix Bugs in Module',
        payoutCategory: '$150',
        status: 'Rejected',
        details: {
            category: 'Quality Assurance',
            country: 'Canada',
            description: 'This task involves fixing bugs reported in the module.',
        },
    },
    // Add more tasks as needed
];

const PendingTasks: React.FC = () => {
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [filteredStatus, setFilteredStatus] = useState<string | undefined>(undefined);

    const showDetailModal = (task: Task) => {
        setSelectedTask(task);
        setIsDetailModalVisible(true);
    };

    const handleDetailCancel = () => {
        setIsDetailModalVisible(false);
    };

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Task Name',
            dataIndex: 'taskName',
            key: 'taskName',
        },
        {
            title: 'Payout Category',
            dataIndex: 'payoutCategory',
            key: 'payoutCategory',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = 'geekblue';
                if (status === 'Rejected') {
                    color = 'volcano';
                } else if (status === 'Complete') {
                    color = 'green';
                }
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, task: Task) => (
                <Button type="link" onClick={() => showDetailModal(task)}>View Details</Button>
            ),
        },
    ];

    const filteredData = filteredStatus
        ? tasksData.filter(task => task.status === filteredStatus)
        : tasksData;

    return (
        <div style={{ padding: 20 }}>
            <Select
                style={{ width: 200, marginBottom: 20 }}
                placeholder="Filter by status"
                onChange={(value) => setFilteredStatus(value)}
                allowClear
            >
                <Option value="Pending">Pending</Option>
                <Option value="Complete">Complete</Option>
                <Option value="Rejected">Rejected</Option>
            </Select>

            <Table
                columns={columns}
                dataSource={filteredData}
                pagination={false}
                scroll={{ x: 'max-content' }}
            />

            {/* Detail Modal */}
            <Modal
                title={`Task Details: ${selectedTask?.taskName}`}
                visible={isDetailModalVisible}
                onCancel={handleDetailCancel}
                footer={null}
            >
                {selectedTask && (
                    <div>
                        <p><strong>User Name:</strong> {selectedTask.userName}</p>
                        <p><strong>Payout Category:</strong> {selectedTask.payoutCategory}</p>
                        <p><strong>Category:</strong> {selectedTask.details.category}</p>
                        <p><strong>Country:</strong> {selectedTask.details.country}</p>
                        <p><strong>Description:</strong> {selectedTask.details.description}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default PendingTasks;
