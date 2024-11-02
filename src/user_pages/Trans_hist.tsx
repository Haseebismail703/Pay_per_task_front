import React from 'react';
import { Card, Table, Typography, Row, Col } from 'antd';
import { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

const TransactionHistory: React.FC = () => {
    // Sample data for transactions
    const transactions = [
        {
            key: '1',
            id: 'TXN123456',
            type: 'Deposit',
            amount: 100,
            status: 'Completed',
            date: '2024-11-01',
        },
        {
            key: '2',
            id: 'TXN123457',
            type: 'Deposit',
            amount: 50,
            status: 'Pending Verification',
            date: '2024-11-02',
        },
        {
            key: '3',
            id: 'TXN123458',
            type: 'Withdrawal',
            amount: 20,
            status: 'Completed',
            date: '2024-11-01',
        },
        {
            key: '4',
            id: 'TXN123459',
            type: 'Withdrawal',
            amount: 15,
            status: 'Pending',
            date: '2024-11-02',
        },
    ];

    const columns: ColumnsType<any> = [
        {
            title: 'Transaction ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Transaction Type',
            dataIndex: 'type',
            key: 'type',
            render: (text) => (
                <span style={{ color: text === 'Deposit' ? '#52c41a' : '#f5222d' }}>{text}</span>
            ),
        },
        {
            title: 'Amount ($)',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span style={{ color: status.includes('Pending') ? '#faad14' : '#52c41a' }}>
                    {status}
                </span>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    return (
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
                    <Table
                        columns={columns}
                        dataSource={transactions}
                        pagination={false}
                        scroll={{ x: true }} // Enable horizontal scrolling if needed
                        style={{ width: '100%' }} // Ensure the table takes full width

                    />
                </Card>
            </Col>
        </Row>
    );
};

export default TransactionHistory;
