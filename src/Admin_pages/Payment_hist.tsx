import React, { useState } from 'react';
import { Table, Input, Select, Row, Col } from 'antd';
import Admin_navb from '../Admin_comp/Admin_navb';

interface PaymentRecord {
  key: string;
  userName: string;
  paymentType: string;
  date: string;
  userId: string;
  amount: number;
}

const paymentData: PaymentRecord[] = [
  { key: '1', userName: 'User1', paymentType: 'Withdrawal', date: '2024-11-01', userId: 'U001', amount: 100 },
  { key: '2', userName: 'User2', paymentType: 'Deposit', date: '2024-11-02', userId: 'U002', amount: 200 },
  { key: '3', userName: 'User1', paymentType: 'Deposit', date: '2024-11-03', userId: 'U001', amount: 150 },
  { key: '4', userName: 'User3', paymentType: 'Withdrawal', date: '2024-11-04', userId: 'U003', amount: 300 },
];

const PaymentHistory: React.FC = () => {
  const [userSearch, setUserSearch] = useState('');
  const [userIdSearch, setUserIdSearch] = useState('');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState('');

  // Combined Payment History Data
  const filteredPayments = paymentData.filter(record =>
    (record.userName.includes(userSearch) || !userSearch) &&
    (record.userId.includes(userIdSearch) || !userIdSearch) &&
    (paymentTypeFilter ? record.paymentType === paymentTypeFilter : true)
  );

  return (
    <>
    <Admin_navb/>
    
    <div style={{ padding: '20px' }}>
      <h2>Payment History</h2>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Search User Name"
            value={userSearch}
            onChange={e => setUserSearch(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Search User ID"
            value={userIdSearch}
            onChange={e => setUserIdSearch(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Select
            placeholder="Select Payment Type"
            onChange={value => setPaymentTypeFilter(value)}
            style={{ width: '100%' }}
          >
            <Select.Option value="">All</Select.Option>
            <Select.Option value="Deposit">Deposit</Select.Option>
            <Select.Option value="Withdrawal">Withdrawal</Select.Option>
          </Select>
        </Col>
      </Row>
      <Table dataSource={filteredPayments} pagination={false} style={{ width: '100%' }}>
        <Table.Column title="User Name" dataIndex="userName" />
        <Table.Column title="Payment Type" dataIndex="paymentType" />
        <Table.Column title="Date" dataIndex="date" />
        <Table.Column title="User ID" dataIndex="userId" />
        <Table.Column title="Amount" dataIndex="amount" />
      </Table>
    </div></>
  );
};

export default PaymentHistory;
