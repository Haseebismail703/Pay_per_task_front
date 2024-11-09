import React, { useEffect, useState } from 'react';
import { Table, Button, notification, Tag } from 'antd';
import axios from 'axios';
import api from '../api/api.js';
import Navbar from '../usercomp/user_nav.js';

interface Task {
    _id: string;
    taskTitle: string;
    category: string;
    subcategory: string;
    workersNeeded: number;
    publisherReward: number;
    status: 'Enabled' | 'Paused' | 'Pending' | 'Reject' | 'Complete' | 'Running';
}

const TaskTable: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Fetch tasks data from API
    useEffect(() => {
        const fetchTasks = async () => {
            const adid = '1234'; // Adjusted adid to a regular string
            try {
                const response = await axios.get<Task[]>(`${api}/getTaskbyId/${adid}`);
                setTasks(response.data);
                console.log(response.data);
            } catch (error) {
                notification.error({
                    message: 'Error',
                    description: 'Failed to fetch tasks.',
                });
            }
        };

        fetchTasks();
    }, []);

    const handleStatusToggle = async (taskId: string, currentStatus: string) => {
        try {
            const updatedStatus = currentStatus === 'Enabled' ? 'Paused' : 'Enabled';
            await axios.put(`${api}/statusUpdate/${taskId}`, { status: updatedStatus });

            // Update task status locally
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === taskId ? { ...task, status: updatedStatus } : task
                )
            );

            notification.success({
                message: `Task ${updatedStatus}`,
                description: `The task has been ${updatedStatus.toLowerCase()} successfully.`,
            });
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to update task status.',
            });
        }
    };

    const columns = [
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
            title: 'Subcategory',
            dataIndex: 'subcategory',
            key: 'subcategory',
        },
        {
            title: 'Workers Needed',
            dataIndex: 'workersNeeded',
            key: 'workersNeeded',
        },
        {
            title: 'Publisher Reward ($)',
            dataIndex: 'publisherReward',
            key: 'publisherReward',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={
                    status === 'Enabled' ? 'green' : 
                    status === 'Paused' ? 'blue' : 
                    status === 'Pending' ? 'orange' : 
                    status === 'Reject' ? 'red' : 'grey'
                }>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Task) => (
                <Button
                    type={record.status === 'Enabled' ? 'default' : 'primary'}
                    onClick={() => handleStatusToggle(record._id, record.status)}
                    disabled={record.status === 'Pending' || record.status === 'Reject'}
                >
                    {record.status === 'Enabled' ? 'Pause' : 'Enable'}
                </Button>
            ),
        },
    ];

    return (
        <>
        <Navbar/>
        <div style={{ padding: '20px' }}>
            <h2>All Tasks</h2>
            <Table dataSource={tasks} columns={columns} rowKey="_id" />
        </div>
        </>
    );
};

export default TaskTable;
