import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, notification, Tag } from 'antd';
import axios from 'axios';
import Admin_navb from '../Admin_comp/Admin_navb';
import api from '../api/api';

interface Task {
    _id: string;
    userName: string;
    taskTitle: string;
    taskDescription: string;
    category: string;
    workersNeeded: number;
    publisherReward: number;
    totalPriceWithoutFee: number;
    advertiserId: string;
    active: boolean;
    status: string
}

const PendingTasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [rejectionReason, setRejectionReason] = useState('');

    const fetchTasks = async () => {
        try {
            const response = await axios.get<Task[]>(`${api}/pendingTask`);
            setTasks(response.data);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to fetch tasks.',
            });
        }
    };
    useEffect(() => {
        fetchTasks();
    }, []);

    const handleApproveTask = async (taskId: string) => {
        try {
            await axios.put(`${api}/approve_task/${taskId}`, {
                status: "Approve"
            });
            fetchTasks();
            notification.success({
                message: 'Task Approved',
                description: 'The task has been approved successfully.',
            });
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to approve the task.',
            });
        }
    };

    const handleRejectTask = async () => {
        if (selectedTask) {
            try {
                await axios.put(`${api}/reject_task/${selectedTask._id}`, { reject_reason: rejectionReason, status: "Reject" });
                setIsRejectModalVisible(false);
                notification.success({
                    message: 'Task Rejected',
                    description: 'The task has been rejected successfully.',
                });
                fetchTasks();
            } catch (error) {
                notification.error({
                    message: 'Error',
                    description: 'Failed to reject the task.',
                });
            }
        }
    };

    const showRejectModal = (task: Task) => {
        setSelectedTask(task);
        setIsRejectModalVisible(true);
    };

    const showDetailModal = (task: Task) => {
        setSelectedTask(task);
        setIsDetailModalVisible(true);
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
            title: 'Task Title',
            dataIndex: 'taskTitle',
            key: 'taskTitle',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Publisher Reward',
            dataIndex: 'publisherReward',
            key: 'publisherReward',
        },
        {
            title: 'Status',
            key: 'status',
            render: (_: any, task: Task) => (
                <Tag color={task.status === 'Pending' ? 'orange' : task.status === 'Active' ? 'green' : 'red'}>
                    {task.status}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, task: Task) => (
                <span>
                    <Button
                        type="link"
                        onClick={() => showRejectModal(task)}
                        disabled={task.status === 'Rejected' || task.status === 'Active'} // Disable for Rejected or Active tasks
                    >
                        Reject
                    </Button>
                    <Button
                        type="link"
                        onClick={() => handleApproveTask(task._id)}
                        disabled={task.status === 'Rejected' || task.status === 'Active'} // Disable for Rejected or Active tasks
                    >
                        Approve
                    </Button>
                    <Button
                        type="link"
                        onClick={() => showDetailModal(task)}
                    >
                        View Details
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <>
            <Admin_navb />
            <div style={{ padding: 20 }}>
                <Table
                    columns={columns}
                    dataSource={tasks.map(task => ({ ...task, key: task._id }))}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                />

                {/* Rejection Modal */}
                <Modal
                    title={`Reject Task: ${selectedTask?.taskTitle}`}
                    open={isRejectModalVisible}
                    onOk={handleRejectTask}
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
                    title={`Task Details: ${selectedTask?.taskTitle}`}
                    open={isDetailModalVisible}
                    onCancel={handleDetailCancel}
                    footer={null}
                >
                    {selectedTask && (
                        <div>
                            <p><strong>User Name:</strong> {selectedTask.userName}</p>
                            <p><strong>Task Title:</strong> {selectedTask.taskTitle}</p>
                            <p><strong>Description:</strong> {selectedTask.taskDescription}</p>
                            <p><strong>Category:</strong> {selectedTask.category}</p>
                            <p><strong>Workers Needed:</strong> {selectedTask.workersNeeded}</p>
                            <p><strong>Publisher Reward:</strong> ${selectedTask.publisherReward}</p>
                            <p><strong>Total Price Without Fee:</strong> ${selectedTask.totalPriceWithoutFee}</p>
                            <p><strong>Advertiser ID:</strong> {selectedTask.advertiserId}</p>
                            <p><strong>Status:</strong> {selectedTask.status}</p>
                        </div>
                    )}
                </Modal>
            </div>
        </>
    );
};

export default PendingTasks;
