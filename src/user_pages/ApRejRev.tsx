import React, { useState, useEffect } from "react";
import { Table, Button, Modal,  Card, Space, Row, Col, Tag, Image } from "antd";
import axios from "axios";
import api from "../api/api";
import Navbar from "../usercomp/user_nav";
import { useParams } from "react-router-dom";

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

const ApRejRev: React.FC = () => {
    const [tasks, setTasks] = useState<TaskProof[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskProof | null>(null);
    const [taskDetail, setTaskDetail] = useState<Task | null>(null);
    const {id} = useParams();
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${api}/allApRejRevTask/${id}`);
                const formattedData = response.data?.getProof.map((item: any, index: number) => ({
                    key: `${index + 1}`,
                    status: item.status,
                    created_at: item.created_at?.substring(0, 10),
                    username: item.username,
                    country: item.country,
                    publisherReward: item.publisherReward,
                    imgurl: item.imgurl?.map((imgObj: any) => imgObj.image_url) || [],
                    taskName: taskDetail?.taskTitle || "N/A",
                    comment: item.comment || "",
                }));
                setTasks(formattedData);
                setTaskDetail(response.data?.getTask); 
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [taskDetail]);

    const columns = {
         paid: [
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
                return <Tag color={'green'}>{status}</Tag>;
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
    ],
        rejected: [
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
                    return <Tag color={'red'}>{status}</Tag>;
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
        ],
        revision: [
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
                    return <Tag color={'default'}>{status}</Tag>;
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
        ],
    };

    const filteredTasks = {
        paid: tasks.filter((task) => task.status === "aproved"),
        rejected: tasks.filter((task) => task.status === "reject"),
        revision: tasks.filter((task) => task.status === "revision"),
    };

    return (
        <>
        <Navbar/>
        
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
                                <p><strong>Created At : </strong> {taskDetail.createdAt?.substring(0, 10)}</p> 
                            </Col>
                        </Row>
                    </Card>
                )}

                {/* Paid Tasks */}
                <Card title="Paid Tasks" style={{ width: "100%" }}>
                    <Table
                        columns={columns.paid}
                        dataSource={filteredTasks.paid}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: "100%" }}
                    />
                </Card>

                {/* Rejected Tasks */}
                <Card title="Rejected Tasks" style={{ width: "100%" }}>
                    <Table
                        columns={columns.rejected}
                        dataSource={filteredTasks.rejected}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: "100%" }}
                    />
                </Card>

                {/* Revision Tasks */}
                <Card title="Revision Tasks" style={{ width: "100%" }}>
                    <Table
                        columns={columns.revision}
                        dataSource={filteredTasks.revision}
                        pagination={{ pageSize: 5 }}
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
                                <h3>comment</h3>
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

export default ApRejRev;
