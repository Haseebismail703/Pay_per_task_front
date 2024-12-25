import React, { useEffect, useState } from 'react';
import { Table, Button, notification, Tag } from 'antd';
import { PauseOutlined, PlayCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import api from '../api/api.js';
import Navbar from '../usercomp/user_nav.js';
import { Link } from 'react-router-dom';
interface Task {
    _id: string;
    taskTitle: string;
    category: string;
    subcategory: string;
    workersNeeded: number;
    publisherReward: number;
    status: string;
    active: boolean;
}

const Mycompaign: React.FC = () => {
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

    // Handle task status toggle (active/inactive)
    const handleStatusToggle = async (taskId: string, currentStatus: boolean) => {
        try {
            // Toggle the active status (true -> false or false -> true)
            const updatedStatus = !currentStatus;
            await axios.put(`${api}/statusUpdate/${taskId}`, { active: updatedStatus });

            // Update task status locally
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === taskId ? { ...task, active: updatedStatus } : task
                )
            );

            notification.success({
                message: `Task ${updatedStatus ? 'Enabled' : 'Paused'}`,
                description: `The task has been ${updatedStatus ? 'enabled' : 'paused'} successfully.`,
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
                    status === 'Pending' ? 'orange' :
                        status === 'Approve' ? 'purple' :
                            status === 'Reject' ? 'red' :
                                status === 'Running' ? 'cyan' :
                                    status === 'Complete' ? 'green-inverse' : // Custom inverse green for 'Complete'
                                        'grey' // Default color if status is not recognized
                }>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render: (active: boolean) => (
                <Tag color={active ? 'green' : 'red'}>
                    {active ? 'Active' : 'Inactive'}
                </Tag>
            ),
        },
        {
            title: 'View Proof',
            key: 'actions',
            render: (_: any, record: Task) => (
                <Button
                // type="primary" 
                >
                    <Link to={`/my-campaign/${record._id}`}>View Proof</Link>
                </Button>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Task) => (
                <Button
                    type={record.active ? 'default' : 'primary'}
                    onClick={() => handleStatusToggle(record._id, record.active)}
                    disabled={record.status === 'Pending' || record.status === 'Reject' || record.status === 'Complete'}
                    icon={record.active ? <PauseOutlined /> : <PlayCircleOutlined />} // Set the icon based on the active status
                >
                    {record.active ? 'Pause' : 'Enable'}
                </Button>
            ),
        },
    ];

    return (
        <>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <h2>All Tasks</h2>
                <Table dataSource={tasks} columns={columns} rowKey="_id" />
            </div>
        </>
    );
};

export default Mycompaign;
