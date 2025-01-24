import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Progress, Select, Typography, notification } from 'antd';
import Navbar from '../usercomp/user_nav';
import axios from 'axios';
import api from '../api/api.js';
import { Link } from 'react-router-dom';

const { Option } = Select;
const { Title } = Typography;

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
    progress: {
        completed: number;
        total: number;
    };
    taskProof : number;
    budget: number;
    date: Date;
}

const TaskDisplay: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
    const [sortOption, setSortOption] = useState<string>('recent');

    const categories = ['development', 'design', 'marketing', 'writing'];

    // Fetch tasks data from API
    useEffect(() => {
        const fetchTasks = async () => {
            let user = JSON.parse(localStorage.getItem('user') || '{}')
            try {
                const response = await axios.get<Task[]>(`${api}/getTaskuser/${user.user_data?.id}`);
                const tasksWithProgress = response.data.map(task => ({
                    ...task,
                }));
                setTasks(tasksWithProgress);
                setFilteredTasks(tasksWithProgress);
            } catch (error) {
                notification.error({
                    message: 'Error',
                    description: 'Failed to fetch tasks.',
                });
            }
        };

        fetchTasks();
    }, []);

    const handleCategoryChange = (value: string) => {
        setCategoryFilter(value);
        applyFilters(value, sortOption);
    };

    const handleSortChange = (value: string) => {
        setSortOption(value);
        applyFilters(categoryFilter, value);
    };

    const applyFilters = (category?: string, sort?: string) => {
        let updatedTasks = [...tasks];

        if (category) {
            updatedTasks = updatedTasks.filter(task => task.category === category);
        }

        if (sort === 'recent') {
            updatedTasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else if (sort === 'highPaying') {
            updatedTasks.sort((a, b) => b.budget - a.budget);
        }

        setFilteredTasks(updatedTasks);
    };

    return (
        <>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <Title level={3}>All Tasks</Title>
                <div style={{ marginBottom: '20px' }}>
                    <Select
                        placeholder="Filter by Category"
                        onChange={handleCategoryChange}
                        style={{ width: 200, marginRight: '20px' }}
                    >
                        <Option value="">All Categories</Option>
                        {categories.map(category => (
                            <Option key={category} value={category}>
                                {category}
                            </Option>
                        ))}
                    </Select>

                    <Select
                        defaultValue="recent"
                        onChange={handleSortChange}
                        style={{ width: 200 }}
                    >
                        <Option value="recent">Recent Tasks</Option>
                        <Option value="highPaying">High-Paying Tasks</Option>
                    </Select>
                </div>

                <Row gutter={[16, 16]}>
                    {filteredTasks.map((task) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={task._id}>
                            <Link to={`/allTask/${task._id}`}>
                            <Card
                            hoverable
                                title={task.taskTitle}
                                bordered={true}
                                style={{ width: '100%', borderRadius: '8px' }}
                            >
                                <p>{task.taskDescription}</p>
                                <Progress
                                    percent={(task.taskProof / task.workersNeeded) * 100}
                                    status={task.taskProof >= task.workersNeeded ? 'success' : 'active'}
                                />
                                <p style={{ marginTop: '10px' }}>
                                    Progress: {task.taskProof} out of {task.workersNeeded}
                                </p>
                                <p style={{ fontWeight: 'bold' }}>${task.publisherReward}</p>
                            </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
};

export default TaskDisplay;
