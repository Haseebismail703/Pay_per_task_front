import React from 'react';
import { Card, Row, Col, Statistic, Progress, Divider } from 'antd';
import { CheckCircleOutlined, DollarCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts';

// Sample data for earnings and tasks
const taskData = [
    { date: 'Jan', completed: 10, pending: 5 },
    { date: 'Feb', completed: 15, pending: 3 },
    { date: 'Mar', completed: 8, pending: 7 },
    { date: 'Apr', completed: 20, pending: 2 },
    { date: 'May', completed: 25, pending: 4 },
];

const earningsData = [
    { date: 'Jan', earnings: 200 },
    { date: 'Feb', earnings: 300 },
    { date: 'Mar', earnings: 180 },
    { date: 'Apr', earnings: 450 },
    { date: 'May', earnings: 500 },
];

const Dashboard: React.FC = () => {
    const totalTasksCompleted = 78;
    const pendingTasks = 7;
    const tasksCompletedToday = 5;
    const targetTasks = 100;

    const totalEarnings = 3200;
    const earningsToday = 80;
    const earningsGoal = 5000;

    const taskCompletionPercentage = (totalTasksCompleted / targetTasks) * 100;
    const earningsProgress = (totalEarnings / earningsGoal) * 100;

    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={[16, 16]}>
                {/* Task Overview Section */}
                <Col xs={24} md={12} lg={6}>
                    <Card title="Task Overview" bordered={false} style={{ borderRadius: 8 }}>
                        <Statistic title="Total Tasks Completed" value={totalTasksCompleted} prefix={<CheckCircleOutlined />} />
                        <Statistic title="Pending Tasks" value={pendingTasks} prefix={<ClockCircleOutlined />} />
                        <Statistic title="Completed Tasks Today" value={tasksCompletedToday} prefix={<CheckCircleOutlined />} />
                        <Divider />
                        <Progress percent={taskCompletionPercentage} status="active" />
                    </Card>
                </Col>

                {/* Earnings Overview Section */}
                <Col xs={24} md={12} lg={6}>
                    <Card title="Earnings Overview" bordered={false} style={{ borderRadius: 8 }}>
                        <Statistic title="Total Earnings" value={`$${totalEarnings}`} prefix={<DollarCircleOutlined />} />
                        <Statistic title="Earnings Today" value={`$${earningsToday}`} prefix={<DollarCircleOutlined />} />
                        <Statistic title="Earnings Goal" value={`$${earningsGoal}`} prefix={<DollarCircleOutlined />} />
                        <Divider />
                        <Progress percent={earningsProgress} status="active" strokeColor={{ '0%': '#87d068', '100%': '#108ee9' }} />
                    </Card>
                </Col>

                {/* Task Completion Line Chart */}
                <Col xs={24} lg={12}>
                    <Card title="Task Completion Over Time" bordered={false} style={{ borderRadius: 8 }}>
                        <LineChart width={500} height={300} data={taskData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="completed" stroke="#82ca9d" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="pending" stroke="#8884d8" />
                        </LineChart>
                    </Card>
                </Col>

                {/* Earnings Bar Chart */}
                <Col xs={24} lg={12}>
                    <Card title="Earnings Trend" bordered={false} style={{ borderRadius: 8 }}>
                        <BarChart width={500} height={300} data={earningsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="earnings" fill="#8884d8" />
                        </BarChart>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
