import React, { useState } from 'react';
import { Table, Button, Modal, Input, DatePicker, Row, Col } from 'antd';
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

const PaymentRequestPage: React.FC = () => {
  const [isWithdrawalModalVisible, setIsWithdrawalModalVisible] = useState(false);
  const [isDepositModalVisible, setIsDepositModalVisible] = useState(false);
  const [withdrawalId, setWithdrawalId] = useState('');
  const [depositAmount, setDepositAmount] = useState('');

  // State for filtering
  const [withdrawalFilter, setWithdrawalFilter] = useState('');
  const [depositFilter, setDepositFilter] = useState('');
  const [withdrawalDate, setWithdrawalDate] = useState<string | null>(null);
  const [depositDate, setDepositDate] = useState<string | null>(null);

  const handleWithdrawalPaid = () => {
    console.log(`Payment marked as paid for ID: ${withdrawalId}`);
    setIsWithdrawalModalVisible(false);
    setWithdrawalId('');
  };

  const handleDepositAdd = () => {
    console.log(`Deposit added: ${depositAmount}`);
    setIsDepositModalVisible(false);
    setDepositAmount('');
  };

  // Filtered Data
  const filteredWithdrawals = paymentData.filter(record => 
    record.paymentType === 'Withdrawal' &&
    (record.userName.includes(withdrawalFilter) || !withdrawalFilter) &&
    (withdrawalDate ? record.date === withdrawalDate : true)
  );

  const filteredDeposits = paymentData.filter(record => 
    record.paymentType === 'Deposit' &&
    (record.userName.includes(depositFilter) || !depositFilter) &&
    (depositDate ? record.date === depositDate : true)
  );

  return (
    <>
    <Admin_navb/>
    
    <div style={{ padding: '20px' }}>
      <h2>Withdrawals</h2>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Filter by User Name"
            value={withdrawalFilter}
            onChange={e => setWithdrawalFilter(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <DatePicker
            placeholder="Filter by Date"
            onChange={date => setWithdrawalDate(date ? date.format('YYYY-MM-DD') : null)}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>
      <Table dataSource={filteredWithdrawals} pagination={false} style={{ width: '100%' }}>
        <Table.Column title="User Name" dataIndex="userName" />
        <Table.Column title="Payment Type" dataIndex="paymentType" />
        <Table.Column title="Date" dataIndex="date" />
        <Table.Column title="User ID" dataIndex="userId" />
        <Table.Column
          title="Action"
          render={(text, record) => (
            <Button onClick={() => {
              setWithdrawalId(record.userId);
              setIsWithdrawalModalVisible(true);
            }}>
              Paid
            </Button>
          )}
        />
      </Table>

      <Modal
        title="Mark Payment as Paid"
        visible={isWithdrawalModalVisible}
        onOk={handleWithdrawalPaid}
        onCancel={() => setIsWithdrawalModalVisible(false)}
      >
        <Input placeholder="Enter User ID" value={withdrawalId} onChange={(e) => setWithdrawalId(e.target.value)} />
      </Modal>

      <h2>Deposits</h2>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Filter by User Name"
            value={depositFilter}
            onChange={e => setDepositFilter(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <DatePicker
            placeholder="Filter by Date"
            onChange={date => setDepositDate(date ? date.format('YYYY-MM-DD') : null)}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>
      <Table dataSource={filteredDeposits} pagination={false} style={{ width: '100%' }}>
        <Table.Column title="User Name" dataIndex="userName" />
        <Table.Column title="Payment Type" dataIndex="paymentType" />
        <Table.Column title="Date" dataIndex="date" />
        <Table.Column title="User ID" dataIndex="userId" />
        <Table.Column
          title="Action"
          render={(text, record) => (
            <Button onClick={() => {
              setIsDepositModalVisible(true);
            }}>
              Add
            </Button>
          )}
        />
      </Table>

      <Modal
        title="Add Deposit"
        visible={isDepositModalVisible}
        onOk={handleDepositAdd}
        onCancel={() => setIsDepositModalVisible(false)}
      >
        <Input placeholder="Enter Deposit Amount" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
      </Modal>
    </div></>
  );
};

export default PaymentRequestPage;
