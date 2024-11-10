import React, { useState } from 'react';
import { Card, Row, Col, Progress, Select, Button, Typography } from 'antd';
import Navbar from '../usercomp/user_nav';

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
}

const tasks: Task[] = [
    { key: '1', title: 'Install the app and login the account', description: 'Description for task 1', category: 'Development', progress: { completed: 20, total: 100 }, budget: 150, date: new Date('2024-11-01') },
    { key: '2', title: 'Design a new logo', description: 'Description for task 2', category: 'Design', progress: { completed: 80, total: 100 }, budget: 300, date: new Date('2024-11-02') },
    { key: '3', title: 'Create marketing plan', description: 'Description for task 3', category: 'Marketing', progress: { completed: 50, total: 100 }, budget: 250, date: new Date('2024-11-03') },
    { key: '4', title: 'Write a blog post', description: 'Description for task 4', category: 'Writing', progress: { completed: 30, total: 100 }, budget: 100, date: new Date('2024-11-04') },
    { key: '5', title: 'Develop a new feature', description: 'Description for task 5', category: 'Development', progress: { completed: 90, total: 100 }, budget: 200, date: new Date('2024-11-05') },
];

const TaskDisplay: React.FC = () => {
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
    const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
    const [sortOption, setSortOption] = useState<string>('recent');

    const categories = ['Development', 'Design', 'Marketing', 'Writing'];

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
            updatedTasks.sort((a, b) => b.date.getTime() - a.date.getTime());
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
                        <Col xs={24} sm={12} md={8} lg={6} key={task.key}>
                            <Card
                                hoverable
                                title={task.title}
                                bordered={true}
                                style={{ width: '100%', borderRadius: '8px' }}
                            >
                                <p>{task.description}</p>
                                <Progress
                                    percent={(task.progress.completed / task.progress.total) * 100}
                                    status={task.progress.completed >= task.progress.total ? 'success' : 'active'}
                                />
                                <p style={{ marginTop: '10px' }}>
                                    Progress: {task.progress.completed} out of {task.progress.total}
                                </p>
                                <p style={{ fontWeight: 'bold' }}>${task.budget}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
};

export default TaskDisplay;
