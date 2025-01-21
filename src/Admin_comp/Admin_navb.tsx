import React, { useEffect, useState } from 'react';
import {
    Layout, Menu, Dropdown, Avatar, Space, Drawer, Button, Badge, Tag,
} from 'antd';
import {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    MenuOutlined,
    DashboardOutlined,
    FileDoneOutlined,
    AppstoreAddOutlined,
    HistoryOutlined,
    FundOutlined,
    UsergroupAddOutlined,
    BellOutlined,
    WalletOutlined,
    FileTextOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api/api';

const { Header } = Layout;

interface Noti {
    path: string;
    message: string;
    type: string;
}

interface User {
    username: string;
    profileurl: string;
}

const Admin_navb: React.FC = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [user, setUser] = useState<User>();
    const [notifications, setNotifications] = useState<Noti[]>([]);
    const [notificationDrawerVisible, setNotificationDrawerVisible] = useState(false);
    const navigate = useNavigate();

    const handleDrawerOpen = () => setDrawerVisible(true);
    const handleDrawerClose = () => setDrawerVisible(false);
    const handleNotificationDrawerOpen = () => setNotificationDrawerVisible(true);
    const handleNotificationDrawerClose = () => setNotificationDrawerVisible(false);

    const handleNotificationClick = (path: string) => {
        navigate(path);
        handleNotificationDrawerClose();
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get(`${api}/getNoti`);
                // Assuming the API returns separate arrays for user and admin notifications
                setNotifications(res.data.admin || []);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        const fetchUserProfile = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                const res = await axios.get(`${api}/userProfile/${user?.user_data.id}`);
                setUser(res.data.user);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchNotifications();
        fetchUserProfile();
    }, []);

    const profileMenuItems = [
        {
            key: 'profile',
            label: <Link to="/admin/profile">Profile Settings</Link>,
            icon: <SettingOutlined />,
        },
        {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
        },
    ];

    const drawerMenuItems = [
        { key: '1', icon: <DashboardOutlined />, label: <Link to="/admin/dashboard">Dashboard</Link> },
        {
            key: '2',
            icon: <FileDoneOutlined />,
            label: 'Task Requests',
            children: [
                { key: '2.1', icon: <WalletOutlined />, label: <Link to="/admin/task/pending">Pending</Link> },
                { key: '2.2', icon: <AppstoreAddOutlined />, label: <Link to="/admin/task/approved_reject">Approved/Reject</Link> },
            ],
        },
        { key: '3', icon: <UsergroupAddOutlined />, label: <Link to="/admin/all_users">All Users</Link> },
        { key: '4', icon: <FileTextOutlined />, label: <Link to="/admin/task_report">Task Reports</Link> },
        { key: '5', icon: <FundOutlined />, label: <Link to="/admin/payment_request">Payment Requests</Link> },
        { key: '6', icon: <WalletOutlined />, label: <Link to="/admin/payment_history">Payment History</Link> },
    ];

    return (
        <>
            <Header
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 16px',
                    backgroundColor: 'rgba(0, 21, 41, 0.8)',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 10,
                }}
            >
                <Button
                    type="text"
                    icon={<MenuOutlined />}
                    onClick={handleDrawerOpen}
                    style={{ color: 'white', fontSize: '18px', marginRight: '16px' }}
                />
                <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
                    Admin Dashboard
                </div>
                <Space align="center">
                    <Badge count={notifications.length} style={{ marginTop: 29, marginRight: 6 }}>
                        <Button
                            type="text"
                            icon={<BellOutlined style={{ color: 'white', fontSize: 23, marginTop: 50 }} />}
                            onClick={handleNotificationDrawerOpen}
                        />
                    </Badge>
                    <Dropdown menu={{ items: profileMenuItems }} placement="bottomRight">
                        <Space align="center" style={{ cursor: 'pointer', color: 'white' }}>
                            <Avatar src={user?.profileurl || ''} />
                            <span style={{ color: 'white', fontWeight: 500 }}>{user?.username}</span>
                        </Space>
                    </Dropdown>
                </Space>

            </Header>

            <Drawer
                title="Account Balances"
                placement="left"
                closable
                onClose={handleDrawerClose}
                open={drawerVisible}
                width={300}
            >
                <Menu mode="inline" style={{ borderRight: 0, fontSize: '16px' }} items={drawerMenuItems} />
            </Drawer>

            <Drawer
                title="Notifications"
                placement="right"
                closable
                onClose={handleNotificationDrawerClose}
                open={notificationDrawerVisible}
                width={400}
            >
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <div
                            key={index}
                            style={{
                                marginBottom: '10px',
                                padding: '8px',
                                borderBottom: '1px solid #e8e8e8',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleNotificationClick(notification.path)}
                        >
                            <Tag color={getTagColor(notification.type)}>{notification.type}</Tag>
                            <span style={{ marginLeft: '8px' }}>{notification.message}</span>
                        </div>
                    ))
                ) : (
                    <div>No notifications</div>
                )}
            </Drawer>
        </>
    );
};

const getTagColor = (type: string) => {
    switch (type) {
        case 'Task Complete':
            return 'green';
        case 'Deposit Successful':
            return 'blue';
        case 'Withdrawal Rejected':
            return 'volcano';
        default:
            return 'default';
    }
};

export default Admin_navb;
