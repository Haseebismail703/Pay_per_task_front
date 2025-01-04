import React from "react";
import { Row, Col, Card, Button, List, Avatar } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminChart: React.FC = () => {
  const revenueData = [
    { month: "Jan", revenue: 5000 },
    { month: "Feb", revenue: 7000 },
    { month: "Mar", revenue: 8000 },
    { month: "Apr", revenue: 10000 },
    { month: "May", revenue: 12000 },
  ];

  const taskCompletionData = [
    { status: "Completed", tasks: 80 },
    { status: "Failed", tasks: 20 },
  ];

  const activeUsersData = [
    { day: "Mon", users: 150 },
    { day: "Tue", users: 200 },
    { day: "Wed", users: 180 },
    { day: "Thu", users: 220 },
    { day: "Fri", users: 240 },
  ];

  const categoryData = [
    { category: "Data Entry", revenue: 4000 },
    { category: "Surveys", revenue: 3000 },
    { category: "Content Writing", revenue: 5000 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const topPerformers = [
    { name: "John Doe", tasks: 45 },
    { name: "Jane Smith", tasks: 42 },
    { name: "Alice Johnson", tasks: 38 },
  ];

  const pendingApprovals = [
    { id: "12345", name: "Survey Task", user: "John Doe" },
    { id: "67890", name: "Data Entry", user: "Alice Johnson" },
  ];

  return (
    <div style={{ padding: "20px" }}>

      {/* Charts Section */}
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col xs={24} lg={12}>
          <Card title="Revenue Trends">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#4caf50" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Task Completion Rate">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={taskCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tasks" fill="#2196f3" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col xs={24} lg={12}>
          <Card title="Active Users">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activeUsersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#e91e63" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Category Analysis">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="revenue"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Additional Sections */}
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col xs={24} lg={12}>
          <Card title="Top Performers">
            <List
              itemLayout="horizontal"
              dataSource={topPerformers}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar>{item.name.charAt(0)}</Avatar>}
                    title={item.name}
                    description={`Tasks Completed: ${item.tasks}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Pending Approvals">
            <List
              itemLayout="horizontal"
              dataSource={pendingApprovals}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.name}
                    description={`Task ID: ${item.id}, User: ${item.user}`}
                  />
                  <Button type="primary">Approve</Button>
                  <Button danger style={{ marginLeft: 8 }}>
                    Reject
                  </Button>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminChart;
