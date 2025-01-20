import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Spin, message } from 'antd';
import Admin_navb from '../Admin_comp/Admin_navb';
import axios from 'axios';
import api from '../api/api';
import { CopyOutlined } from '@ant-design/icons';
interface PaymentRecord {
  id: string;
  key: string;
  userName: string;
  paymentType: string;
  createdAt: string;
  amount: number;
  paymentMethod: string;
  TID: string;
  userId: string;
  payeer: string;
  perfectMoney: string;
  walletAddress: string;
}
// interface User {
//   earning: string;
//   advBalance: string;
// }
const PaymentRequestPage: React.FC = () => {
  const [isTIDModalVisible, setIsTIDModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isAddFundsModalVisible, setIsAddFundsModalVisible] = useState(false); // Add fund modal state
  const [selectedRecord, setSelectedRecord] = useState<PaymentRecord | null>(null);
  const [newTID, setNewTID] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [deposit, setDeposit] = useState<PaymentRecord[]>([]);
  const [withdraw, setWithdraw] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [fundAmount, setFundAmount] = useState(''); // New state to handle fund amount input
  // const [user, setUser] = useState<User>()



  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}/getPayment`);
      const depositData = response.data?.getDeposite.map((item: any, index: number) => ({
        id: item._id,
        key: `${index + 1}`,
        userName: item.userName,
        paymentType: item.paymentType,
        paymentMethod: item.paymentMethod,
        createdAt: item.created_at?.substring(0, 10),
        amount: `${item.amount}`,
        userId: item.userId,
        TID: item.TID || 'N/A',
        walletAddress: item.walletAddress
      }));
      setDeposit(depositData);

      const withdrawData = response.data?.getWithdraw.map((item: any, index: number) => ({
        id: item._id,
        key: `${index + 1}`,
        userName: item.userName,
        paymentType: item.paymentType,
        paymentMethod: item.paymentMethod,
        createdAt: item.created_at?.substring(0, 10),
        amount: `${item.amount}`,
        TID: item.TID || 'N/A',
        userId: item.userId,
        walletAddress: item.walletAddress
      }));
      setWithdraw(withdrawData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenTIDModal = (record: PaymentRecord) => {
    setSelectedRecord(record);
    setNewTID(record.TID || '');
    setIsTIDModalVisible(true);
  };

  const handleOpenRejectModal = (record: PaymentRecord) => {
    console.log(record)
    setSelectedRecord(record);
    setRejectReason('');
    setIsRejectModalVisible(true);
  };

  const handleOpenAddFundsModal = (record: PaymentRecord) => {
    setSelectedRecord(record);
    setFundAmount('');
    setIsAddFundsModalVisible(true);
  };

  const handleUpdateTID = async () => {
    if (!selectedRecord) return;
    console.log(selectedRecord)
    try {
      const payload = { TID: newTID, status: 'paid', amount: Number(selectedRecord.amount), rejectReason: rejectReason || 'N/A', userId: selectedRecord.userId };
      await axios.put(`${api}/paidWithdrow/${selectedRecord.id}`, payload);
      message.success('TID and status updated successfully');
      setIsTIDModalVisible(false);
      fetchData();
    } catch (error) {
      console.error('Error updating TID:', error);
      message.error('Failed to update TID');
    }
  };

  const handleRejectPayment = async () => {
    if (!selectedRecord) return;
    try {
      const payload = { TID: newTID, status: 'reject', amount: Number(fundAmount), rejectReason: rejectReason || 'N/A', userId: selectedRecord.userId };
      await axios.put(`${api}/paidWithdrow/${selectedRecord.id}`, payload);
      message.success('Payment request rejected successfully');
      setIsRejectModalVisible(false);
      fetchData();
    } catch (error) {
      console.error('Error rejecting payment:', error);
      message.error('Failed to reject payment');
    }
  };

  const handleAddFunds = async () => {
    if (!selectedRecord) return;
    try {
      const payload = { amount: Number(fundAmount), status: 'added', rejectReason: 'N/A', userId: selectedRecord.userId , messageId :selectedRecord.id  };
      console.log(payload, selectedRecord)
      await axios.put(`${api}/paidWithdrow/${selectedRecord.id}`, payload);
      message.success('Funds added successfully');
      setIsAddFundsModalVisible(false);
      fetchData();
    } catch (error) {
      console.error('Error adding funds:', error);
      message.error('Failed to add funds');
    }
  };

  const withdrowColumns = [
    {
      title: 'userId',
      dataIndex: 'userId',
      key: 'userId',
    },
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
      title: 'Amount($)',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Wallet Address',
      dataIndex: 'walletAddress',
      key: 'walletAddress',
      render: (walletAddress: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>{walletAddress}</span>
          <Button
            type="link"
            icon={<CopyOutlined />}
            onClick={() => {
              navigator.clipboard.writeText(walletAddress);
              message.success('Wallet address copied to clipboard!');
            }}
          />
        </div>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: PaymentRecord) => (
        <>
          <Button type="primary" onClick={() => handleOpenTIDModal(record)}>
            Paid
          </Button>
          <Button
            style={{ marginLeft: 10, color: 'red' }}
            onClick={() => handleOpenRejectModal(record)}
          >
            Reject
          </Button>
        </>
      ),
    },
  ];

  const depositeColumns = [
    {
      title: 'userId',
      dataIndex: 'userId',
      key: 'userId',
    },
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
      title: 'Amount($)',
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
      render: (tid: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>{tid}</span>
          <Button
            type="link"
            icon={<CopyOutlined />}
            onClick={() => {
              navigator.clipboard.writeText(tid);
              message.success('TID copied to clipboard!');
            }}
          />
        </div>
      ),
    },

    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: PaymentRecord) => (
        <>
          <Button type="primary" onClick={() => handleOpenAddFundsModal(record)}>
            Add fund
          </Button>
          <Button
            style={{ marginLeft: 10, color: 'red' }}
            onClick={() => handleOpenRejectModal(record)}
          >
            Reject
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Admin_navb />
      <div style={{ padding: '20px' }}>
        <h2>Withdrawals</h2>
        <Spin spinning={loading}>
          <Table scroll={{ "x": "100" }} dataSource={withdraw} columns={withdrowColumns} pagination={false} style={{ width: '100%' }} />
        </Spin>

        <h2>Deposits</h2>
        <Spin spinning={loading}>
          <Table scroll={{ "x": "100" }} dataSource={deposit} columns={depositeColumns} pagination={false} style={{ width: '100%' }} />
        </Spin>

        {/* Modal for Add Fund */}
        <Modal
          title="Add Funds"
          open={isAddFundsModalVisible}
          onOk={handleAddFunds}
          onCancel={() => setIsAddFundsModalVisible(false)}
        >
          <Input
            placeholder="Enter amount"
            value={fundAmount}
            onChange={(e) => setFundAmount(e.target.value)}
          />
        </Modal>

        {/* Modal for TID */}
        <Modal
          title="Add TID"
          open={isTIDModalVisible}
          onOk={handleUpdateTID}
          onCancel={() => setIsTIDModalVisible(false)}
        >
          <Input
            placeholder="Enter TID"
            value={newTID}
            onChange={(e) => setNewTID(e.target.value)}
          />
        </Modal>

        {/* Modal for Reject Payment */}
        <Modal
          title="Reject Payment"
          open={isRejectModalVisible}
          onOk={handleRejectPayment}
          onCancel={() => setIsRejectModalVisible(false)}
        >
          <Input
            placeholder="Enter rejection reason"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </Modal>
      </div>
    </>
  );
};

export default PaymentRequestPage;
