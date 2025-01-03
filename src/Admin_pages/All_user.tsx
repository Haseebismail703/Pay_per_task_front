import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Tag, Input, Select, message } from 'antd';
import axios from 'axios';
import Admin_navb from '../Admin_comp/Admin_navb';
import api from '../api/api';

interface User {
    id: string;
    username: string,
    created_at: string,
    email: string,
    gender: string,
    profileurl: string,
    status: string,
    earning: string,
    advBalance: string,
}

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [searchText, setSearchText] = useState<string>('');


 const fetchUsers = async () => {
            try {
                const response = await axios.get(`${api}/getUser`);
                let data = response.data;
                const userData = data.map((item: any, index: number) => ({
                    key: `${index + 1}`,
                    id : item._id,
                    username: item.username,
                    created_at: item.created_at?.substring(0, 10),
                    email: item.email,
                    gender: item.gender,
                    profileurl: item.profileurl,
                    status: item.status,
                    earning: item.earning,
                    advBalance: item.advBalance,
                }));
                setUsers(userData);
            } catch (error) {
                message.error('Failed to fetch users.');
                console.error(error);
            }
        };
    // Fetch users from API
    useEffect(() => {
        fetchUsers();
    }, []);

    const showDetailModal = (user: User) => {
        setSelectedUser(user);
        setIsDetailModalVisible(true);
    };

    const handleDetailCancel = () => {
        setIsDetailModalVisible(false);
    };

    const handleBlockUser = async (user: User) => {
        let status = user.status === 'active' ? 'blocked' : 'active';
        try {
            await axios.put(`${api}/blockUser/${user.id}`, { status: status });
            message.success(`User has been ${status === 'active' ? 'unblocked' : 'blocked'} successfully.`);
            fetchUsers();
        } catch (error) {
            message.error('Failed to block the user.');
            console.error(error);
        } finally {
            setIsConfirmModalVisible(false);
        }
    };

    const showConfirmModal = (user: User) => {
        setSelectedUser(user);
        setIsConfirmModalVisible(true);
    };

    const handleConfirmCancel = () => {
        setIsConfirmModalVisible(false);
    };

    const filteredUsers = users.filter(user => {
        const isStatusMatch = filterStatus === 'All' || user.status === filterStatus;
        const isSearchMatch = (user.username?.toLowerCase() || '').includes(searchText.toLowerCase()) || user.id.includes(searchText);
        return isStatusMatch && isSearchMatch;
    });

    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'name',
        },
        {
            title: 'Earnings',
            dataIndex: 'earning',
            key: 'earnings',
            render: (text: string) => `$${parseFloat(text).toFixed(2)}`,
        },
        {
            title: 'Advertising Balance',
            dataIndex: 'advBalance',
            key: 'advertisingBalance',
            render: (text: number) => `$${text?.toFixed(2)}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const color = status === 'active' ? 'green' : 'red';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, user: User) => (
                <div key={user.id}>
                    <Button type="link" onClick={() => showDetailModal(user)}>View Details</Button>
                    <Button 
                        type="link" 
                        onClick={() => showConfirmModal(user)} 
                        style={{ color: 'red' }}
                    >
                        {user.status === 'active' ? 'Block User' : 'Unblock User'}
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Admin_navb />
            <div style={{ padding: 20 }}>
                <Input
                    placeholder="Search by name or ID"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ marginBottom: 20, width: 300 }}
                />

                <Select
                    value={filterStatus}
                    onChange={setFilterStatus}
                    style={{ marginBottom: 20, width: 150, marginLeft: 10}}
                >
                    <Select.Option value="All">All Users</Select.Option>
                    <Select.Option value="active">Active Users</Select.Option>
                    <Select.Option value="blocked">Blocked Users</Select.Option>
                </Select>

                <Table
                    columns={columns}
                    dataSource={filteredUsers}
                    rowKey="id"
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                />

                {/* Detail Modal */}
                <Modal
                    title={`User Details: ${selectedUser?.username}`}
                    open={isDetailModalVisible}
                    onCancel={handleDetailCancel}
                    footer={null}
                >
                    {selectedUser && (
                        <div>
                            <p><strong>User ID:</strong> {selectedUser.id}</p>
                            <p><strong>Name:</strong> {selectedUser.username}</p>
                            <p><strong>Earnings:</strong> ${selectedUser.earning}</p>
                            <p><strong>Advertising Balance:</strong> ${selectedUser.advBalance}</p>
                            <p><strong>Status:</strong> <Tag color={selectedUser.status === 'active' ? 'green' : 'red'}>{selectedUser.status}</Tag></p>
                        </div>
                    )}
                </Modal>

                {/* Confirm Block Modal */}
                <Modal
                    title={`Block User: ${selectedUser?.status === 'active' ? 'Block' : 'Unblock'} ${selectedUser?.username}`}
                    open={isConfirmModalVisible}
                    onOk={() => selectedUser && handleBlockUser(selectedUser)}
                    onCancel={handleConfirmCancel}
                >
                    <p>{`Are you sure you want to ${selectedUser?.status === 'active' ? 'Block' : 'Unblock'} this user?`}</p>
                </Modal>
            </div>
        </>
    );
};

export default UserTable;
