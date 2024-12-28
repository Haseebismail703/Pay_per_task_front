import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Row, Col, Spin } from 'antd';
import Admin_navb from '../Admin_comp/Admin_navb';
import axios from 'axios';
import api from '../api/api';

interface PaymentRecord {
  key: string;
  userName: string;
  paymentType: string;
  createdAt: string;
  amount: number;
  paymentMethod: string;
  TID: string;
}

const PaymentRequestPage: React.FC = () => {
  const [isWithdrawalModalVisible, setIsWithdrawalModalVisible] = useState(false);
  const [isDepositModalVisible, setIsDepositModalVisible] = useState(false);
  const [withdrawalId, setWithdrawalId] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [deposit, setDeposit] = useState<PaymentRecord[]>([]);
  const [withdraw, setWithdraw] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(false);

  // State for filtering
  const [withdrawalFilter, setWithdrawalFilter] = useState('');
  const [depositFilter, setDepositFilter] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}/getPayment`);
      const depositData = response.data?.getDeposite.map((item: any, index: number) => ({
        key: `${index + 1}`,
        userName: item.userName,
        paymentType: item.paymentType,
        paymentMethod: item.paymentMethod,
        createdAt: item.created_at?.substring(0, 10),
        amount: item.amount,
        TID: item.TID,
      }));
      setDeposit(depositData);

      const withdrawData = response.data?.getWithdraw.map((item: any, index: number) => ({
        key: `${index + 1}`,
        userName: item.userName,
        paymentType: item.paymentType,
        paymentMethod: item.paymentMethod,
        createdAt: item.created_at?.substring(0, 10),
        amount: item.amount,
        TID: item.TID,
      }));
      setWithdraw(withdrawData);
      console.log('Data fetched:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter logic for withdrawals
  const filteredWithdrawals = withdraw.filter((record) => {
    const matchesUserName = record.userName && record.userName.toLowerCase().includes(withdrawalFilter.toLowerCase());
    return matchesUserName;
  });

  // Filter logic for deposits
  const filteredDeposits = deposit.filter((record) => {
    const matchesUserName = record.userName && record.userName.toLowerCase().includes(depositFilter.toLowerCase());
    return matchesUserName;
  });

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

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Payment Type',
      dataIndex: 'paymentType',
      key: 'paymentType',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'TID',
      dataIndex: 'TID',
      key: 'TID',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  return (
    <>
      <Admin_navb />
      <div style={{ padding: '20px' }}>
        <h2>Withdrawals</h2>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Filter by User Name"
              value={withdrawalFilter}
              onChange={(e) => setWithdrawalFilter(e.target.value)}
            />
          </Col>
        </Row>
        <Spin spinning={loading}>
          <Table dataSource={filteredWithdrawals.length > 0 ? filteredWithdrawals : withdraw} columns={columns} pagination={false} style={{ width: '100%' }} />
        </Spin>


        <Modal
          title="Mark Payment as Paid"
          open={isWithdrawalModalVisible}
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
              onChange={(e) => setDepositFilter(e.target.value)}
            />
          </Col>
        </Row>
        <Spin spinning={loading}>
          <Table dataSource={filteredDeposits.length > 0 ? filteredDeposits : deposit} columns={columns} pagination={false} style={{ width: '100%' }} />
        </Spin>
        <Modal
          title="Add Deposit"
          open={isDepositModalVisible}
          onOk={handleDepositAdd}
          onCancel={() => setIsDepositModalVisible(false)}
        >
          <Input placeholder="Enter Deposit Amount" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
        </Modal>
      </div>
    </>
  );
};

export default PaymentRequestPage;
