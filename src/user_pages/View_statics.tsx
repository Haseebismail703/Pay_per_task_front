import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Card, Space, Image, Spin, message } from "antd";
import { EditOutlined, EyeOutlined, CheckOutlined } from "@ant-design/icons";
import axios from "axios";
import api from "../api/api";
import Navbar from "../usercomp/user_nav";
import { useParams } from "react-router-dom";

interface TableData {
    key: string;
    username: string;
    country: string;
    publisherReward: number;
    created_at: string;
    imgurl: string[];
    userId: string;
    taskId: string;
    revision: boolean;
}

const ViewStatics: React.FC = () => {
    const [data, setData] = useState<TableData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProofModalOpen, setIsProofModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"revision" | "reject" | null>(null);
    const [selectedRecord, setSelectedRecord] = useState<TableData | null>(null);
    const [reason, setReason] = useState("");
    const [revisionTask, setrevisionTask] = useState<TableData[]>([]);
    const { id } = useParams();

    // Fetch data from API 
    const fetchData = async () => {
        try {
            const response = await axios.get(`${api}/getallproofbyId/${id}`);
            const formattedData = response.data?.getProof.map((item: any, index: number) => ({
                key: `${index + 1}`,
                username: item.username,
                country: item.country,
                publisherReward: item.publisherReward,
                created_at: item.created_at?.substring(0, 10),
                imgurl: item.imgurl?.map((imgObj: any) => imgObj.image_url) || [],
                userId: item.userId,
                taskId: item.taskId,
                revision: item.revision,
            }));
            setData(formattedData);
            const revisionTaskfrom = response.data?.revision.map((item: any, index: number) => ({
                key: `${index + 1}`,
                username: item.username,
                country: item.country,
                publisherReward: item.publisherReward,
                created_at: item.created_at?.substring(0, 10),
                imgurl: item.imgurl?.map((imgObj: any) => imgObj.image_url) || [],
                userId: item.userId,
                taskId: item.taskId,
                revision: item.revision,
            }));
            setrevisionTask(revisionTaskfrom);
            // console.log(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [id]);

    const UpdateTaskProf = async (status: string, record: TableData) => {
        console.log(record)
        try {
            await axios.put(`${api}/UpdateTaskProf`, {
                userId: record.userId,
                taskId: record.taskId,
                status,
                ...(status === "reject" || status === "revision" ? { revisionComments: reason } : {}),
                publisherReward : record.publisherReward 
            });
            fetchData()
            message.success(`${status} action applied successfully.`);
            setData((prevData) => prevData.filter((item) => item.key !== record.key));
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating task proof:", error);
            message.error("Failed to apply the action. Please try again.");
        }
    };

    const handleOk = () => {
        if (modalType && selectedRecord) {
            const status = modalType === "reject" ? "reject" : "revision";
            UpdateTaskProf(status, selectedRecord);
            setReason("");
        }
    };

    const handleCancel = () => {
        setReason("");
        setIsModalOpen(false);
    };

    const handleProofModalClose = () => {
        setIsProofModalOpen(false);
        setSelectedRecord(null);
    };

    const columns = [
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Country",
            dataIndex: "country",
            key: "country",
        },
        {
            title: "Publisher Reward",
            dataIndex: "publisherReward",
            key: "publisherReward",
            render: (publisherReward: number) => `$${publisherReward}`,
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: TableData) => (
                <Space>
                    <Button
                        icon={<CheckOutlined />}
                        type="primary"
                        onClick={() => UpdateTaskProf("approved", record)}
                    >
                        Accept
                    </Button>
                    <Button
                        icon={<EditOutlined />}
                        type="default"
                        onClick={() => {
                            setModalType("revision");
                            setSelectedRecord(record);
                            setIsModalOpen(true);
                        }}
                    >
                        Revision
                    </Button>
                    <Button
                        danger
                        onClick={() => {
                            setModalType("reject");
                            setSelectedRecord(record);
                            setIsModalOpen(true);
                        }}
                    >
                        Reject
                    </Button>
                    <Button
                        icon={<EyeOutlined />}
                        type="link"
                        onClick={() => {
                            setSelectedRecord(record);
                            setIsProofModalOpen(true);
                        }}
                    >
                        View Proof
                    </Button>
                </Space>
            ),
        },
    ];

    const revisionColumns = [
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Country",
            dataIndex: "country",
            key: "country",
        },
        {
            title: "Publisher Reward",
            dataIndex: "publisherReward",
            key: "publisherReward",
            render: (publisherReward: number) => `$${publisherReward}`,
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: TableData) => (
                <Space>
                    <Button
                        icon={<CheckOutlined />}
                        type="primary"
                        onClick={() => UpdateTaskProf("approved", record)}
                    >
                        Accept
                    </Button>
                    <Button
                        danger
                        onClick={() => {
                            setModalType("reject");
                            setSelectedRecord(record);
                            setIsModalOpen(true);
                        }}
                    >
                        Reject
                    </Button>
                    <Button
                        icon={<EyeOutlined />}
                        type="link"
                        onClick={() => {
                            setSelectedRecord(record);
                            setIsProofModalOpen(true);
                        }}
                    >
                        View Proof
                    </Button>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Navbar />

            <center>
                <h2>Pending Task</h2>
            </center>
            <Card>
                {isLoading ? (
                    <center>
                        <Spin size="large" />
                    </center>
                ) : (
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: "100%" }}
                    />
                )}
                {/* Revision/Reject Modal */}
                <Modal
                    title="Reason"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Input.TextArea
                        rows={4}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder={`Enter reason for ${modalType}`}
                    />
                </Modal>

                {/* Proof Modal */}
                <Modal
                    title="Proof Images"
                    open={isProofModalOpen}
                    onCancel={handleProofModalClose}
                    footer={null}
                >
                    <Space direction="vertical">
                        {Array.isArray(selectedRecord?.imgurl) && selectedRecord.imgurl.length > 0 ? (
                            selectedRecord.imgurl.map((img, idx) => (
                                <Image key={idx} src={img} alt={`proof-${idx}`} />
                            ))
                        ) : (
                            <p>No proof images available.</p>
                        )}

                    </Space>
                </Modal>
            </Card>




            <br />
            <center>
                <h2>Revision Task</h2>
            </center>
            <Card>
                {isLoading ? (
                    <center>
                        <Spin size="large" />
                    </center>
                ) : (
                    <Table
                        columns={revisionColumns}
                        dataSource={revisionTask}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: "100%" }}
                    />
                )}
            </Card>

        </>
    );
};

export default ViewStatics;
