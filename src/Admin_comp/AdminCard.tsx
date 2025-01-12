import React, { useEffect, useState } from "react";
import { Row, Col, Card, Spin, message } from "antd";
import axios from "axios";
import api from "../api/api";

const AdminCard: React.FC = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(`${api}/getCardDeatail`); // Replace with your API endpoint
                const data = response.data
                setStats(data);
                setLoading(false);
                // console.log(data)
            } catch (error) {
                message.error("Failed to load statistics!");
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;
    }

    return (
        <div style={{ padding: "20px" }}>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Total Earnings" bordered style={{ textAlign: "center", background: "#e8f5e9" }}>
                        <h2 style={{ color: "#4caf50" }}>${stats.totalEarnings || 0}</h2>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Total Tasks" bordered style={{ textAlign: "center", background: "#e3f2fd" }}>
                        <h2 style={{ color: "#2196f3" }}>{stats.totalTasks || 0}</h2>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Total Users" bordered style={{ textAlign: "center", background: "#fce4ec" }}>
                        <h2 style={{ color: "#e91e63" }}>{stats.totalUsers || 0}</h2>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Pending Payouts" bordered style={{ textAlign: "center", background: "#fff3e0" }}>
                        <h2 style={{ color: "#ff9800" }}>${stats.pendingPayouts || 0}</h2>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Running Tasks" bordered style={{ textAlign: "center", background: "#f3e5f5" }}>
                        <h2 style={{ color: "#9c27b0" }}>{stats.runningTasks || 0}</h2>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Blocked Users" bordered style={{ textAlign: "center", background: "#ffebee" }}>
                        <h2 style={{ color: "#f44336" }}>{stats.blockedUsers || 0}</h2>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="New Users" bordered style={{ textAlign: "center", background: "#e8f5e9" }}>
                        <h2 style={{ color: "#4caf50" }}>{stats.newUsers || 0}</h2>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Task Reports" bordered style={{ textAlign: "center", background: "#e3f2fd" }}>
                        <h2 style={{ color: "#2196f3" }}>{stats.taskReports || 0}</h2>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminCard;
