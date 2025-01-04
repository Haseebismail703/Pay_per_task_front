import React from "react";
import { Row, Col, Card } from "antd";

const AdminCard: React.FC = () => {
    return (
        <div style={{ padding: "20px" }}>
            {/* Overview Cards */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Total Earnings" bordered style={{ textAlign: "center", background: "#e8f5e9" }}>
                        <h2 style={{ color: "#4caf50" }}>$50,000</h2>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Total Tasks" bordered style={{ textAlign: "center", background: "#e3f2fd" }}>
                        <h2 style={{ color: "#2196f3" }}>1,000</h2>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Total Users" bordered style={{ textAlign: "center", background: "#fce4ec" }}>
                        <h2 style={{ color: "#e91e63" }}>500</h2>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Pending Payouts" bordered style={{ textAlign: "center", background: "#fff3e0" }}>
                        <h2 style={{ color: "#ff9800" }}>$5,000</h2>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Running Tasks" bordered style={{ textAlign: "center", background: "#f3e5f5" }}>
                        <h2 style={{ color: "#9c27b0" }}>200</h2>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Blocked Users" bordered style={{ textAlign: "center", background: "#ffebee" }}>
                        <h2 style={{ color: "#f44336" }}>10</h2>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="New Users" bordered style={{ textAlign: "center", background: "#e8f5e9" }}>
                        <h2 style={{ color: "#4caf50" }}>50</h2>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Task Reports" bordered style={{ textAlign: "center", background: "#e3f2fd" }}>
                        <h2 style={{ color: "#2196f3" }}>75</h2>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminCard;
