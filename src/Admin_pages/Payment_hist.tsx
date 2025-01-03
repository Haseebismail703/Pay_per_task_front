import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Row, Col, message, Tag } from 'antd';
import axios from 'axios';
import Admin_navb from '../Admin_comp/Admin_navb';
import api from '../api/api';

interface PaymentRecord {
  key: string;
  userName: string;
  paymentType: string;
  createdAt: string;
  userId: string;
  amount: number;
  status: string; 
}

const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [userIdSearch, setUserIdSearch] = useState('');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${api}/PaymentHistory`); // Replace with your API endpoint
        const paymentData = response.data.map((record: any, index: number) => ({
          key: index.toString(),
          userName: record.userName,
          paymentType: record.paymentType,
          createdAt: record.created_at?.substring(0, 10),
          userId: record.userId,
          amount: `${record.amount}$`,
          status: record.status || 'Pending', 
        }));
        setPayments(paymentData);
      } catch (error) {
        message.error('Failed to fetch payment data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter(
    (record) =>
      ((record.userName &&
        record.userName.toLowerCase().includes(userSearch.toLowerCase())) ||
        !userSearch) &&
      (record.userId.includes(userIdSearch) || !userIdSearch) &&
      (paymentTypeFilter ? record.paymentType === paymentTypeFilter : true)
  );

  return (
    <>
      <Admin_navb />
      <div style={{ padding: '20px' }}>
        <h2>Payment History</h2>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Search User Name"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Search User ID"
              value={userIdSearch}
              onChange={(e) => setUserIdSearch(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="Select Payment Type"
              onChange={(value) => setPaymentTypeFilter(value)}
              style={{ width: '100%' }}
              allowClear
            >
              <Select.Option value="">All</Select.Option>
              <Select.Option value="Deposit">Deposit</Select.Option>
              <Select.Option value="Withdraw">Withdraw</Select.Option>
            </Select>
          </Col>
        </Row>
        <Table
          dataSource={filteredPayments}
          loading={loading}
          pagination={{ pageSize: 10 }}
          style={{ width: '100%' }}
        >
          <Table.Column title="User Name" dataIndex="userName" key="userName" />
          <Table.Column title="Payment Type" dataIndex="paymentType" key="paymentType" />
          <Table.Column title="Date" dataIndex="createdAt" key="createdAt" />
          <Table.Column title="User ID" dataIndex="userId" key="userId" />
          <Table.Column title="Amount" dataIndex="amount" key="amount" />
          <Table.Column
            title="Status"
            dataIndex="status"
            key="status"
            render={(status) => (
              <Tag color={status === 'paid' ? 'green' : status === 'reject' ? 'red' : 'orange'}>
                {status}
              </Tag>
            )}
          />
        </Table>
      </div>
    </>
  );
};

export default PaymentHistory;
