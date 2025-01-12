import React, { useEffect, useState } from "react";
import { Row, Col, Card, Spin, message } from "antd";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell, Tooltip as PieTooltip } from "recharts";
import api from "../api/api";

const AdminChart: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api}/getCardDeatail`); // Replace with your API URL
                setData(response.data); // Store response in state
                setLoading(false);
            } catch (error) {
                message.error("Failed to load data!");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;
    }

    // Data for Bar Chart
    const barChartData = [
        { name: "Total Tasks", value: data.totalTasks || 0 },
        { name: "Total Users", value: data.totalUsers || 0 },
        { name: "Pending Payouts", value: data.pendingPayouts || 0 },
        { name: "Running Tasks", value: data.runningTasks || 0 },
        { name: "Blocked Users", value: data.blockedUsers || 0 },
        { name: "New Users", value: data.newUsers || 0 },
        { name: "Task Reports", value: data.taskReports || 0 },
    ];

    // Data for Pie Chart
    const pieChartData = [
        { name: "Total Tasks", value: data.totalTasks || 0 },
        { name: "Total Users", value: data.totalUsers || 0 },
        { name: "Pending Payouts", value: data.pendingPayouts || 0 },
        { name: "Running Tasks", value: data.runningTasks || 0 },
        { name: "Blocked Users", value: data.blockedUsers || 0 },
        { name: "New Users", value: data.newUsers || 0 },
        { name: "Task Reports", value: data.taskReports || 0 },
    ];

    // Define color scheme for Pie chart
    const COLORS = ["#4caf50", "#2196f3", "#ff9800", "#f44336", "#9c27b0", "#ffeb3b", "#673ab7"];

    return (
        <div style={{ padding: "20px" }}>
            <Row gutter={[16, 16]}>
                {/* Bar Chart Card */}
                <Col xs={24} sm={12} md={12}>
                    <Card title="Overview of Key Metrics" bordered style={{ textAlign: "center", background: "#f3e5f5" }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#4caf50" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>

                {/* Pie Chart Card */}
                <Col xs={24} sm={12} md={12}>
                    <Card title="Task and User Breakdown" bordered style={{ textAlign: "center", background: "#e3f2fd" }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <PieTooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminChart;
