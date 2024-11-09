import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Tag, Select, Input, notification } from 'antd';
import Admin_navb from '../Admin_comp/Admin_navb';
import axios from 'axios';
import api from '../api/api';

const { Option } = Select;

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
    status: string;
}

const Task_appr_rej: React.FC = () => {
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [filteredStatus, setFilteredStatus] = useState<string | undefined>(undefined);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state for task ID and user name

    const getTask = async () => {
        try {
            const response = await axios.get<Task[]>(`${api}/getTask`);
            setTasks(response.data);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to fetch tasks.',
            });
        }
    };

    useEffect(() => {
        getTask();
    }, []);

    const showDetailModal = (task: Task) => {
        setSelectedTask(task);
        setIsDetailModalVisible(true);
    };

    const handleDetailCancel = () => {
        setIsDetailModalVisible(false);
    };

    // Filter tasks based on the selected status and search query
    const filteredData = tasks.filter(task => {
        const matchesStatus = filteredStatus ? task.status.toLowerCase() === filteredStatus.toLowerCase() : true;
        const matchesSearch = task.userName?.toLowerCase().includes(searchQuery.toLowerCase()) || task._id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = 'geekblue';
                if (status === 'Reject') {
                    color = 'volcano';
                } else if (status === 'Complete') {
                    color = 'green';
                } else if (status === 'Running') {
                    color = 'cyan';
                } else if (status === 'Pause') {
                    color = 'orange';
                } else if (status === 'Pending') {
                    color = 'yellow';
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

    return (
        <>
            <Admin_navb />
            <div style={{ padding: 20 }}>
                <div style={{ marginBottom: 20 }}>
                    <Select
                        style={{ width: 200, marginRight: 20 }}
                        placeholder="Filter by status"
                        onChange={(value) => setFilteredStatus(value)}
                        allowClear
                    >
                        <Option value="Pending">Pending</Option>
                        <Option value="Approve">Approve</Option>
                        <Option value="Reject">Reject</Option>
                        <Option value="Running">Running</Option>
                        <Option value="Complete">Complete</Option>
                        <Option value="Pause">Pause</Option>
                    </Select>

                    <Input
                        placeholder="Search by User Name or Task ID"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: 300 }}
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredData.map(task => ({ ...task, key: task._id }))}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                />

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

export default Task_appr_rej;
