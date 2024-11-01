import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Space, Drawer, Button } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header } = Layout;

const Navbar: React.FC = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);

    const handleDrawerOpen = () => {
        setDrawerVisible(true);
    };

    const handleDrawerClose = () => {
        setDrawerVisible(false);
    };

    // Profile menu items
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

    // Drawer menu items
    const drawerMenuItems: MenuProps['items'] = [
        { key: '1', label: 'Dashboard' },
        { key: '2', label: 'Tasks' },
        { key: '3', label: 'Earnings' },
        { key: '4', label: 'Deposits' },
    ];

    return (
        <>
            <Header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 16px',
                backgroundColor: 'rgba(0, 21, 41, 0.8)',  // Transparent background
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(5px)',
                zIndex: 10,
              
            }}>
                {/* Drawer Toggle Button */}
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

                <Dropdown
                    menu={{ items: profileMenuItems }}
                    placement="bottomRight"
                >
                    <Space align="center" style={{ cursor: 'pointer' }}>
                        <Avatar size="large" icon={<UserOutlined />} />
                        <span style={{ color: 'white', fontWeight: 500 }}>John Doe</span>
                    </Space>
                </Dropdown>
            </Header>

            {/* Drawer Component */}
            <Drawer
                title="Menu"
                placement="left"
                closable={true}
                onClose={handleDrawerClose}
                open={drawerVisible}
                width={240}
                style={{marginTop : 8}}
            >
                <Menu
                    mode="inline"
                    style={{
                        borderRight: 0,
                        fontSize: '16px',
                    }}
                    items={drawerMenuItems}
                    
                />
            </Drawer>
        </>
    );
};

export default Navbar;
