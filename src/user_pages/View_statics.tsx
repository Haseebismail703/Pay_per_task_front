import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Card, Space, Image, Spin } from "antd";
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
}

const App: React.FC = () => {
    const [data, setData] = useState<TableData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"revision" | "reject" | "proof" | null>(null);
    const [selectedRecord, setSelectedRecord] = useState<TableData | null>(null);
    const [reason, setReason] = useState("");
    const {taskId} = useParams()
    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api}/getallproofbyId/${taskId}`); // Replace with your API URL
                const formattedData = response.data.map((item: any, index: number) => ({
                    key: `${index + 1}`,
                    username: item.username,
                    country: item.country,
                    publisherReward: item.publisherReward,
                    created_at: item.created_at?.substring(0, 10),
                    imgurl: item.imgurl?.map((imgObj: any) => imgObj.image_url) || [], // Convert objects to strings
                }));
                setData(formattedData);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAction = (type: "revision" | "reject" | "proof", record: TableData) => {
        setModalType(type);
        setSelectedRecord(record);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        console.log({ reason, record: selectedRecord });
        setReason("");
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setReason("");
        setIsModalOpen(false);
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
            title: "publisherReward",
            dataIndex: "publisherReward",
            key: "publisherReward",
            render: (publisherReward: number) => `$${publisherReward}`,
        },
        {
            title: "created_at",
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
                        onClick={() => console.log("Accepted:", record)}
                    >
                        Accept
                    </Button>
                    <Button
                        icon={<EditOutlined />}
                        type="default"
                        onClick={() => handleAction("revision", record)}
                    >
                        Revision
                    </Button>
                    <Button danger onClick={() => handleAction("reject", record)}>
                        Reject
                    </Button>
                    <Button
                        icon={<EyeOutlined />}
                        type="link"
                        onClick={() => handleAction("proof", record)}
                    >
                        View Proof
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
        <Navbar/> 
        <center>
            <h1>All Task proof</h1>
        </center>
        <Card>
            {isLoading ? (
                <center>
                  <Spin  size="large" />  
                </center>
            ) : (
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                    scroll={{"x" : "100%"}}
                />
            )}
            <Modal
                title={modalType === "proof" ? "Proof Images" : "Reason"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {modalType === "proof" && selectedRecord ? (
                    <Space direction="vertical">
                        {selectedRecord?.imgurl.length > 0 ? (
                            selectedRecord.imgurl.map((img, idx) => (
                                <Image key={idx} src={img} alt={`proof-${idx}`} />
                            ))
                        ) : (
                            <p>No proof images available.</p>
                        )}
                    </Space>
                ) : (
                    <Input.TextArea
                        rows={4}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder={`Enter reason for ${modalType}`}
                    />
                )}
            </Modal>

        </Card>
        </>
    );
};

export default App;
