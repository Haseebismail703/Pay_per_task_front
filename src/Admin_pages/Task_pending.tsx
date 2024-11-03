import React, { useState } from 'react';
import { Table, Button, Modal, Input } from 'antd';
import Admin_navb from '../Admin_comp/Admin_navb';

interface Task {
    key: string;
    userName: string;
    taskName: string;
    payoutCategory: string;
    details: {
        category: string;
        country: string;
        description: string;
    };
}

const pendingTasksData: Task[] = [
    {
        key: '1',
        userName: 'John Doe',
        taskName: 'Complete Project A',
        payoutCategory: '$100',
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
        details: {
            category: 'Design',
            country: 'UK',
            description: 'This task involves designing a new feature for the application.',
        },
    },
    // Add more tasks as needed
];

const PendingTasks: React.FC = () => {
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [rejectionReason, setRejectionReason] = useState('');

    const showRejectModal = (task: Task) => {
        setSelectedTask(task);
        setIsRejectModalVisible(true);
    };

    const showDetailModal = (task: Task) => {
        setSelectedTask(task);
        setIsDetailModalVisible(true);
    };

    const handleRejectOk = () => {
        console.log('Rejection Reason:', rejectionReason);
        // Handle rejection logic here
        setIsRejectModalVisible(false);
        setRejectionReason('');
    };

    const handleRejectCancel = () => {
        setIsRejectModalVisible(false);
        setRejectionReason('');
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
            title: 'Action',
            key: 'action',
            render: (_: any, task: Task) => (
                <span>
                    <Button type="link" onClick={() => showRejectModal(task)}>Reject</Button>
                    <Button type="link">Approve</Button>
                    <Button type="link" onClick={() => showDetailModal(task)}>View Details</Button>
                </span>
            ),
        },
    ];

    return (
        <>
        <Admin_navb/>
            
        <div style={{ padding: 20 }}>
            <Table
                columns={columns}
                dataSource={pendingTasksData}
                pagination={false}
                scroll={{ x: 'max-content' }}
            />
            {/* Rejection Modal */}
            <Modal
                title={`Reject Task: ${selectedTask?.taskName}`}
                visible={isRejectModalVisible}
                onOk={handleRejectOk}
                onCancel={handleRejectCancel}
            >
                <Input.TextArea
                    rows={4}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Please provide a reason for rejection..."
                />
            </Modal>

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
        </div></>
    );
};

export default PendingTasks;
