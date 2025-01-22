import React, { useEffect, useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Space, Drawer, Button, Badge, Tag, Divider } from 'antd';
import {
    SettingOutlined,
    LogoutOutlined,
    MenuOutlined,
    CheckSquareOutlined,
    AppstoreAddOutlined,
    HistoryOutlined,
    ProjectOutlined,
    SolutionOutlined,
    BellOutlined,
    WalletOutlined,
    ExportOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api/api';

const { Header } = Layout;

interface User {
    earning: number;
    advBalance: number;
    username: string;
    profileurl: string;
    pending: number;
    completed: string;
}

interface Noti {
    path: string;
    message: string;
    messageId: string;
    role: string;
    type: string;
    isRead : boolean;
}

interface NotiResponse {
    user: Noti[];   // Array of notifications for users
}

const Navbar: React.FC = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [notifications, setNotifications] = useState<Noti[]>([]);
    const [notificationDrawerVisible, setNotificationDrawerVisible] = useState(false);
    const [user, setUser] = useState<User | undefined>(undefined);
    const navigate = useNavigate();

    const fetchNotifications = async () => {
        try {
            const res = await axios.get<NotiResponse>(`${api}/getNoti`);
            const userNotifications = res.data.user;
    
            // Handle notifications separately or combine them if needed
            setNotifications([...userNotifications]); // Example: Combine both arrays
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };
    

    const fetchUserData = async () => {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (userData?.user_data?.id) {
            try {
                const res = await axios.get<{ user: User }>(`${api}/userProfile/${userData.user_data.id}`);
                setUser(res.data.user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    useEffect(() => {
        fetchNotifications();
        fetchUserData();
    }, []);
    const handleReadAllNotifications = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            await axios.put(`${api}/isRead/${user?.user_data.id}`);
            fetchNotifications(); 
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

     let countNotification = notifications.filter(item=> item.isRead === false)
    const handleDrawerOpen = () => setDrawerVisible(true);
    const handleDrawerClose = () => setDrawerVisible(false);
    const handleNotificationDrawerOpen = () => setNotificationDrawerVisible(true);
    const handleNotificationDrawerClose = () => setNotificationDrawerVisible(false);

    const handleNotificationClick = (path: string) => {
        navigate(path);
        handleNotificationDrawerClose();
    };

    const getTagColor = (type: string) => {
        switch (type) {
            case 'Task':
                return 'green';
            case 'Deposit':
                return 'blue';
            case 'Withdrow':
                return 'volcano';
                case 'reject' :
                    return 'red'
            default:
                return 'default';
        }
    };

    const profileMenuItems = [
        {
            key: 'profile',
            label: <Link to={'/profile'}>Profile Settings</Link>,
            icon: <SettingOutlined />,
        },
        {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
        },
    ];

    const drawerMenuItems = [
        {
            key: '1',
            icon: <CheckSquareOutlined />,
            label: <Link to="/all-tasks">All Tasks</Link>,
        },
        {
            key: '2',
            icon: <SolutionOutlined />,
            label: <Link to="/my-work">My Work</Link>,
        },
        {
            key: '3',
            icon: <ExportOutlined />,
            label: <Link to="/withdraw">Withdraw</Link>,
        },
        {
            key: '4',
            icon: <ProjectOutlined />,
            label: 'Advertising',
            children: [
                { key: '4.1', icon: <WalletOutlined />, label: <Link to="/add-fund">Add Fund</Link> },
                { key: '4.2', icon: <AppstoreAddOutlined />, label: <Link to="/create-campaign">Create Campaign</Link> },
                { key: '4.3', icon: <AppstoreAddOutlined />, label: <Link to="/my-campaign">My Campaign</Link> },
            ],
        },
        {
            key: '5',
            icon: <HistoryOutlined />,
            label: <Link to="/transaction-history">Transaction History</Link>,
        },
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
                <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>User Dashboard</div>
                <Space align="center">
                    <Badge count={countNotification?.length} style={{ marginTop: 29, marginRight: 6 }}>
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
                <center>
                    <h3>Earnings</h3>
                    <Tag color="green">{user?.earning}$</Tag>
                    <h3>Advertising Balance</h3>
                    <Tag color="green">{user?.advBalance}$</Tag>
                </center>
                <Divider />
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
                {countNotification.length > 0 && (
                    <>
                                    <Button
                                        type="primary"
                                        onClick={handleReadAllNotifications}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Mark All as Read
                                    </Button>
                                    <br /> <br /></>
                                )}
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <div
                            key={index}
                            style={{
                                marginBottom: '10px',
                                padding: '8px',
                                borderBottom: '1px solid #e8e8e8',
                                cursor: 'pointer',
                                backgroundColor: notification.isRead ? '#ffffff' : '#f0f0f0', 
                                borderRadius : 10
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

export default Navbar;
