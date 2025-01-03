import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Table, Typography, Row, Col, Spin, message,Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Navbar from '../usercomp/user_nav';
import api from '../api/api';

const { Title } = Typography;

interface PaymentRecord {
    TID: string;
    key: string;
    userName: string;
    paymentType: string;
    createdAt: string;
    userId: string;
    amount: number;
    status: string; // pending, paid, reject, added;
    rejectReason: string;
}

const TransactionHistory: React.FC = () => {
    const [transactions, setTransactions] = useState<PaymentRecord[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${api}/getPaymentHistory/672ba5b9dd9494d7ee962db6`);
            const data = response.data.map((transaction: any, index: number) => ({
                key: index + 1,
                TID: transaction.TID,
                type: transaction.paymentType,
                amount: `${transaction.amount}$`,
                status: transaction.status,
                date: transaction.created_at?.substring(0, 10),
            }));
            setTransactions(data);
            setLoading(false);
        } catch (error) {
            message.error('Failed to fetch transactions. Please try again.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const renderStatus = (status: 'pending' | 'paid' | 'reject' | 'added') => {
        const colors: { [key in 'pending' | 'paid' | 'reject' | 'added']: string } = {
            pending: '#ff9800',
            paid: '#4caf50',
            reject: '#f44336',
            added: '#2196f3',
        };

        const backgrounds: { [key in 'pending' | 'paid' | 'reject' | 'added']: string } = {
            pending: '#fff3e0',
            paid: '#e8f5e9',
            reject: '#ffebee',
            added: '#e3f2fd',
        };

        return (
            <span
                style={{
                    fontWeight: 'bold',
                    color: colors[status],
                    background: backgrounds[status],
                    borderRadius: '8px',
                    padding: '4px 8px',
                }}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const columns: ColumnsType<any> = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            align: 'center',
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: 'Transaction ID',
            dataIndex: 'TID',
            key: 'TID',
            render: (TID) => (
                <span style={{ fontWeight: 500, color: '#1890ff' }}>{TID}</span>
            ),
        },
        {
            title: 'Transaction Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <span
                    style={{
                        fontWeight: 'bold',
                        color: type === 'Deposit' ? '#4caf50' : '#f44336',
                        background: type === 'Deposit' ? '#e8f5e9' : '#ffebee',
                        borderRadius: '8px',
                        padding: '4px 8px',
                    }}
                >
                    {type}
                </span>
            ),
        },
        {
            title: 'Amount ($)',
            dataIndex: 'amount',
            key: 'amount',
            render: (_, record) => {
                const isDeposit = record.type === 'Deposit';
                const isPending = record.status === 'pending';
                const isRejected = record.status === 'reject';
                return isPending || isRejected ? (
                    <span style={{ color: '#faad14', fontStyle: 'italic' }}>N/A</span>
                ) : (
                    <span
                        style={{
                            fontWeight: 'bold',
                            color: isDeposit ? '#4caf50' : '#f44336',
                            background: isDeposit ? '#e8f5e9' : '#ffebee',
                            borderRadius: '8px',
                            padding: '4px 8px',
                        }}
                    >
                        {isDeposit ? `+${record.amount}` : `-${record.amount}`}
                    </span>
                );
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: 'pending' | 'paid' | 'reject' | 'added') => {
                if (status === 'pending' || status === 'reject') {
                    const tooltipText =
                        status === 'pending'
                            ? 'This transaction is currently under review.'
                            : 'This transaction was rejected.';
                    return (
                        <Tooltip title={tooltipText}>
                            {renderStatus(status)}
                        </Tooltip>
                    );
                }
                return renderStatus(status);
            },
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => (
                <span style={{ color: '#616161', fontWeight: 500 }}>{date}</span>
            ),
        },
    ];

    return (
        <>
            <Navbar />
            <Row justify="center" align="middle" style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Card
                        title={<Title level={3}>Transaction History</Title>}
                        bordered={false}
                        style={{
                            borderRadius: '8px',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
                            backgroundColor: '#fff',
                        }}
                    >
                        {loading ? (
                            <>
                            <center>
                               <Spin size='large' /> 
                            </center>
                            
                            </>
                            
                        ) : (
                            <Table
                                columns={columns}
                                dataSource={transactions}
                                pagination={{ pageSize: 5 }}
                                scroll={{ x: true }} 
                                style={{ width: '100%' }}
                            />
                        )}
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default TransactionHistory;
