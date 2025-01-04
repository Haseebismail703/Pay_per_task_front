import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Card, Space, Row, Col, Tag, Image, Input } from "antd";
import axios from "axios";
import api from "../api/api";
import Admin_navb from "../Admin_comp/Admin_navb";
import { useParams } from "react-router-dom";

const { Search } = Input;

interface TaskProof {
    key: string;
    username: string;
    country: string;
    publisherReward: number;
    created_at: string;
    imgurl: string[];
    taskName: string;
    comment: string;
    status: string;
    userId : string;
}

interface Task {
    taskTitle: string;
    created_at: string;
    taskDescription: string;
    category: string;
    subcategory: string;
    workersNeeded: number;
    publisherReward: number;
    status: string;
    active: boolean;
    targetCountries: string[];
    createdAt: string;
}

const ReportTask: React.FC = () => {
    const [tasks, setTasks] = useState<TaskProof[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<TaskProof[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskProof | null>(null);
    const [taskDetail, setTaskDetail] = useState<Task | null>(null);
    const { taskId } = useParams();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${api}/getReportTask/${taskId}`);
                const formattedData = response.data?.map((item: any, index: number) => ({
                    key: `${index + 1}`,
                    status: item.status,
                    created_at: item.created_at?.substring(0, 10),
                    username: item.username,
                    country: item.country,
                    publisherReward: `${item.publisherReward}$`,
                    imgurl: item.imgurl?.map((imgObj: any) => imgObj.image_url) || [],
                    taskName: response.data?.getTask?.taskTitle || "N/A",
                    comment: item.comment || "",
                    userId: item.userId,
                }));
                setTasks(formattedData);
                setFilteredTasks(formattedData); // Initialize filtered tasks
                setTaskDetail(response.data?.getTask);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const handleSearch = (value: string) => {
        const searchTerm = value.toLowerCase();
        const filtered = tasks.filter(
            (task) =>
                task.username.toLowerCase().includes(searchTerm) ||
                task.userId.toLowerCase().includes(searchTerm)
        );
        setFilteredTasks(filtered);
    };

    const columns = [
        { title: "#", dataIndex: "key", key: "key" },
        { title: "Task Name", dataIndex: "taskName", key: "taskName" },
        { title: "Username", dataIndex: "username", key: "username" },
        { title: "Country", dataIndex: "country", key: "country" },
        { title: "Publisher Reward", dataIndex: "publisherReward", key: "publisherReward" },
        { title: "Created At", dataIndex: "created_at", key: "created_at" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                let color = "default";
                if (status === "approved") color = "green";
                if (status === "reject") color = "red";
                if (status === "revision") color = "orange";
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: TaskProof) => (
                <Button
                    type="link"
                    onClick={() => {
                        setSelectedTask(record);
                        setIsModalOpen(true);
                    }}
                >
                    View Proof
                </Button>
            ),
        },
    ];

    return (
        <>
            <Admin_navb />

            <div style={{ padding: "20px" }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                    {taskDetail && (
                        <Card title="Task Details" style={{ width: "100%" }}>
                            <Row gutter={16}>
                                <Col span={24} sm={12} md={8}>
                                    <p><strong>Title:</strong> {taskDetail.taskTitle}</p>
                                    <p><strong>Category:</strong> {taskDetail.category}</p>
                                    <p><strong>Subcategory:</strong> {taskDetail.subcategory}</p>
                                    <p><strong>Workers Needed:</strong> {taskDetail.workersNeeded}</p>
                                    <p><strong>Publisher Reward:</strong> ${taskDetail.publisherReward}</p>
                                    <p><strong>Status:</strong> <Tag color={taskDetail.status === "Running" ? 'green' : 'red'}>{taskDetail.status}</Tag></p>
                                </Col>
                                <Col span={24} sm={12} md={8}>
                                    <p><strong>Description:</strong> {taskDetail.taskDescription}</p>
                                    <p><strong>Target Countries:</strong> {taskDetail.targetCountries.join(", ")}</p>
                                    <p><strong>Created At:</strong> {taskDetail.createdAt?.substring(0, 10)}</p>
                                </Col>
                            </Row>
                        </Card>
                    )}

                    {/* Search Filter */}
                    <Search
                        placeholder="Search by Username or ID"
                        allowClear
                        enterButton="Search"
                        onSearch={handleSearch}
                        style={{ marginBottom: "20px" }}
                    />

                    {/* All Tasks */}
                    <Card title="All Submit Tasks" style={{ width: "100%" }}>
                        <Table
                            columns={columns}
                            dataSource={filteredTasks}
                            pagination={{ pageSize: 10 }}
                            scroll={{ x: "100%" }}
                        />
                    </Card>
                </Space>

                {/* Modal for Task Proof */}
                <Modal
                    title="Task Proof"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                    width={800}
                >
                    {selectedTask && (
                        <>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <h3>Task Images</h3>
                                    <Space wrap>
                                        {selectedTask.imgurl.map((img, index) => (
                                            <Image
                                                key={index}
                                                width={100}
                                                src={img}
                                                alt={`Task Image ${index + 1}`}
                                            />
                                        ))}
                                    </Space>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <h3>Comment</h3>
                                    <p>{selectedTask.comment || "No comment available."}</p>
                                </Col>
                            </Row>
                        </>
                    )}
                </Modal>
            </div>
        </>
    );
};

export default ReportTask;
