import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Space, Drawer, Button, Badge, Tag, Divider } from 'antd';
import {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    MenuOutlined,
    DashboardOutlined,
    CheckSquareOutlined,
    AppstoreAddOutlined,
    HistoryOutlined,
    ProjectOutlined,
    SolutionOutlined,
    BellOutlined,
    WalletOutlined,
    ExportOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Header } = Layout;

const Navbar: React.FC = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [notifications, setNotifications] = useState([
        { message: "Task completed successfully!", type: "Task Complete", path: "/tasks" },
        { message: "Deposit successful! Amount added.", type: "Deposit Successful", path: "/deposit-history" },
        { message: "Withdrawal rejected due to insufficient balance.", type: "Withdrawal Rejected", path: "/withdraw-history" },
    ]);
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

    const profileMenuItems = [
        {
            key: 'profile',
            label: 'Profile Settings',
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
            icon: <DashboardOutlined />,
            label: <Link to="/dashboard">Dashboard</Link>,
        },
        {
            key: '2',
            icon: <CheckSquareOutlined />,
            label: <Link to="/all-tasks">All Tasks</Link>,
        },
        {
            key: '3',
            icon: <SolutionOutlined />,
            label: <Link to="/my-work">My Work</Link>,
        },
        {
            key: '4',
            icon: <ExportOutlined />,
            label: <Link to="/withdraw">Withdraw</Link>,
        },
        {
            key: '5',
            icon: <ProjectOutlined />,
            label: 'Advertising',
            children: [
                {
                    key: '5.1',
                    icon: <WalletOutlined />,
                    label: <Link to="/add-fund">Add Fund</Link>,
                },
                {
                    key: '5.2',
                    icon: <AppstoreAddOutlined />,
                    label: <Link to="/create-campaign">Create Campaign</Link>,
                },
                {
                    key: '5.3',
                    icon: <AppstoreAddOutlined />,
                    label: <Link to="/my-campaign">My Campaign</Link>,
                },
            ],
        },
        {
            key: '6',
            icon: <HistoryOutlined />,
            label: <Link to="/transaction-history">Transaction History</Link>,
        },
    ];

    return (
        <>
            <Header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 16px',
                backgroundColor: 'rgba(0, 21, 41, 0.8)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(5px)',
                zIndex: 10,
            }}>
                <Button
                    type="text"
                    icon={<MenuOutlined />}
                    onClick={handleDrawerOpen}
                    style={{
                        color: 'white',
                        fontSize: '18px',
                        marginRight: '16px',
                    }}
                />
                <div style={{
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'bold',
                }}>
                    My App
                </div>
                <Space align="center">
                    <Badge count={notifications.length} style={{ marginTop: 29, marginRight: 6 }}>
                        <Button
                            type="text"
                            icon={<BellOutlined style={{ color: 'white', fontSize: 23, marginTop: 50 }} />}
                            onClick={handleNotificationDrawerOpen}
                        />
                    </Badge>
                    <Dropdown
                        menu={{ items: profileMenuItems }}
                        placement="bottomRight"
                    >
                        <Space align="center" style={{ cursor: 'pointer', color: 'white' }}>
                            <Avatar icon={<UserOutlined />} />
                            <span style={{ color: 'white', fontWeight: 500 }}>John Doe</span>
                        </Space>
                    </Dropdown>
                </Space>
            </Header>

            {/* Drawer for Balances and Menu */}
            <Drawer
                title="Account Balances"
                placement="left"
                closable={true}
                onClose={handleDrawerClose}
                open={drawerVisible}
                width={300}
            >
                <div>
                    <center>
                        <h3>Earnings</h3>
                        
                        <Tag color="green" style={{ marginLeft: '8px' }}>$1000</Tag>
                        <h3>Advertising Balance</h3>
                        <Tag color="green" style={{ marginLeft: '8px' }}>$1000</Tag>
                    </center>

                    <Divider />
                </div>
                <Menu
                    mode="inline"
                    style={{
                        borderRight: 0,
                        fontSize: '16px',
                    }}
                    items={drawerMenuItems}
                />
            </Drawer>

            {/* Notification Drawer */}
            <Drawer
                title="Notifications"
                placement="right"
                closable={true}
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
                                cursor: 'pointer'
                            }}
                            onClick={() => handleNotificationClick(notification.path)}
                        >
                            <Tag color={getTagColor(notification.type)}>
                                {notification.type}
                            </Tag>
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

// Function to get tag color based on notification type
const getTagColor = (type: string) => {
    switch (type) {
        case "Task Complete":
            return "green";
        case "Deposit Successful":
            return "blue";
        case "Withdrawal Rejected":
            return "volcano";
        default:
            return "default";
    }
};

export default Navbar;
