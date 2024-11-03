import React, { useState } from 'react';
import { Table, Button, Modal, Tag, Input, Select } from 'antd';
import Admin_navb from '../Admin_comp/Admin_navb';

interface User {
    id: string;
    name: string;
    earnings: number;
    advertisingBalance: number;
    status: string; // "Active" or "Blocked"
}

const usersData: User[] = [
    { id: '1', name: 'John Doe', earnings: 500, advertisingBalance: 300, status: 'Active' },
    { id: '2', name: 'Jane Smith', earnings: 700, advertisingBalance: 200, status: 'Blocked' },
    { id: '3', name: 'Alice Johnson', earnings: 400, advertisingBalance: 150, status: 'Active' },
    // Add more user data as needed
];

const UserTable: React.FC = () => {
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [searchText, setSearchText] = useState<string>('');

    const showDetailModal = (user: User) => {
        setSelectedUser(user);
        setIsDetailModalVisible(true);
    };

    const handleDetailCancel = () => {
        setIsDetailModalVisible(false);
    };

    const handleBlockUser = (id: string) => {
        // Logic to block the user (e.g., update user status in the database)
        console.log(`User with ID ${id} has been blocked.`);
    };

    const filteredUsers = usersData.filter(user => {
        const isStatusMatch = filterStatus === 'All' || user.status === filterStatus;
        const isSearchMatch = user.name.toLowerCase().includes(searchText.toLowerCase()) || user.id.includes(searchText);
        return isStatusMatch && isSearchMatch;
    });

    const columns = [
        {
            title: 'User ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Earnings',
            dataIndex: 'earnings',
            key: 'earnings',
            render: (text: number) => `$${text.toFixed(2)}`,
        },
        {
            title: 'Advertising Balance',
            dataIndex: 'advertisingBalance',
            key: 'advertisingBalance',
            render: (text: number) => `$${text.toFixed(2)}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const color = status === 'Active' ? 'green' : 'volcano';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, user: User) => (
                <>
                    <Button type="link" onClick={() => showDetailModal(user)}>View Details</Button>
                    <Button 
                        type="link" 
                        onClick={() => handleBlockUser(user.id)} 
                        style={{ color: 'red' }}
                    >
                        Block
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
        
        <Admin_navb/>
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
                style={{ marginBottom: 20, width: 150 }}
            >
                <Select.Option value="All">All Users</Select.Option>
                <Select.Option value="Active">Active Users</Select.Option>
                <Select.Option value="Blocked">Blocked Users</Select.Option>
            </Select>

            <Table
                columns={columns}
                dataSource={filteredUsers}
                pagination={false}
                scroll={{ x: 'max-content' }}
            />

            {/* Detail Modal */}
            <Modal
                title={`User Details: ${selectedUser?.name}`}
                visible={isDetailModalVisible}
                onCancel={handleDetailCancel}
                footer={null}
            >
                {selectedUser && (
                    <div>
                        <p><strong>User ID:</strong> {selectedUser.id}</p>
                        <p><strong>Name:</strong> {selectedUser.name}</p>
                        <p><strong>Earnings:</strong> ${selectedUser.earnings.toFixed(2)}</p>
                        <p><strong>Advertising Balance:</strong> ${selectedUser.advertisingBalance.toFixed(2)}</p>
                        <p><strong>Status:</strong> <Tag color={selectedUser.status === 'Active' ? 'green' : 'volcano'}>{selectedUser.status}</Tag></p>
                    </div>
                )}
            </Modal>
        </div></>
    );
};

export default UserTable;
