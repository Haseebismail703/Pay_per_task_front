import React, { useEffect, useState } from 'react';
import { Card, Typography, Radio, Space, Button, Row, Col, Divider, Input, Image, message } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import Navbar from '../usercomp/user_nav';
import axios from 'axios';
import api from '../api/api';
const { Title, Text } = Typography;
interface User {
    id: number;
    earning: string;
    advBalance: string;
}
const WithdrawPage: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState<'payeer' | 'perfectMoney' | null>(null);
    const [payoutAmount, setPayoutAmount] = useState<number | null>(null);
    const [userData, setUserData] = useState<User>()

    const availableBalance = 50; // Example balance
    const minimumWithdrawals = {
        payeer: 2,
        perfectMoney: 3,
    };
    let getUser = async () => {
        let user = JSON.parse(localStorage.getItem('user') || '{}');
        let response = await axios.get<User>(`${api}/getUserByid/${user.user_data?.id}`)
        setUserData(response.data)
        console.log(response.data)
    }
    useEffect(() => {
        getUser()
    }, [])
    // Handle payout method change
    const handleMethodChange = (e: any) => {
        const method = e.target.value;
        setSelectedMethod(method);
        console.log('Selected Method:', method);
    };

    // Handle payout amount change
    const handlePayoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setPayoutAmount(isNaN(value) ? null : value);
        console.log('Payout Amount:', payoutAmount);
    };

    // Handle withdraw action
 const handleWithdraw = async () => {
    if (!userData) {
        message.error('User data is not available.');
        return;
    }

    if (
        payoutAmount &&
        payoutAmount <= availableBalance &&
        selectedMethod &&
        payoutAmount >= minimumWithdrawals[selectedMethod]
    ) {
        // Check if user's earning is greater than or equal to the payout amount
        if (parseFloat(userData.earning) < payoutAmount) {
            message.error('Insufficient earnings. Payout amount exceeds available earnings.');
            return;
        }

        let user = JSON.parse(localStorage.getItem('user') || '{}');
        try {
            const response = await axios.post(`${api}/payment`, {
                userId: user.user_data?.id,
                paymentMethod: selectedMethod,
                paymentType: 'Withdraw',
                amount: payoutAmount,
            });

            if (response.status === 200) {
                message.success(`Successfully withdrew $${payoutAmount} via ${selectedMethod}`);
                setPayoutAmount(null);
                setSelectedMethod(null);
            } else {
                message.error('Withdrawal failed. Please try again.');
            }
        } catch (error) {
            console.error('Error processing withdrawal:', error);
            message.error('An error occurred. Please try again.');
        }
    } else {
        message.error('Invalid withdrawal amount or method.');
    }
};


    return (
        <>
            <Navbar />
            <Row
                justify="center"
                align="middle"
                style={{ minHeight: '100vh', padding: '20px', backgroundColor: '#f5f7fa' }}
            >
                <Col xs={24} sm={20} md={16} lg={10}>
                    <Card
                        title={
                            <Title level={3}>
                                Available Balance:{' '}
                                <span style={{ color: '#52c41a' }}>${availableBalance.toFixed(2)}</span>
                            </Title>
                        }
                        bordered={false}
                        style={{
                            borderRadius: '10px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center',
                            backgroundColor: '#ffffff',
                        }}
                    >
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <Title level={4}>Select Payout Method</Title>
                            <Radio.Group
                                onChange={handleMethodChange}
                                value={selectedMethod}
                                style={{ width: '100%' }}
                            >
                                <Row justify="space-around">
                                    <Col span={12} style={{ textAlign: 'center' }}>
                                        <Radio value="payeer">
                                            <Image
                                                preview={false}
                                                width={50}
                                                src="https://s3.idle-empire.com/public/shop/platforms/payeer.png"
                                                alt="Payeer Logo"
                                            />
                                            <Text style={{ display: 'block', marginTop: '8px' }}>Payeer</Text>
                                        </Radio>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'center' }}>
                                        <Radio value="perfectMoney">
                                            <Image
                                                preview={false}
                                                width={50}
                                                src="https://e7.pngegg.com/pngimages/214/412/png-clipart-logo-circle-graphics-sign-food-network-circle-food-text.png"
                                                alt="Perfect Money Logo"
                                            />
                                            <Text style={{ display: 'block', marginTop: '8px' }}>Perfect Money</Text>
                                        </Radio>
                                    </Col>
                                </Row>
                            </Radio.Group>

                            <Divider />

                            {selectedMethod && (
                                <Space direction="vertical">
                                    <Text strong>
                                        Minimum Withdrawal:{' '}
                                        <span style={{ color: '#faad14', marginLeft: '5px' }}>
                                            ${minimumWithdrawals[selectedMethod]}
                                        </span>
                                    </Text>
                                    <Text>
                                        Please note: Ensure your balance meets the minimum requirement for the selected
                                        withdrawal method.
                                    </Text>
                                </Space>
                            )}

                            <Input
                                type="number"
                                placeholder="Enter amount to withdraw in $"
                                prefix="$"
                                onChange={handlePayoutChange}
                                value={payoutAmount || ''}
                                style={{ width: '100%', marginTop: '20px' }}
                            />

                            <Button
                                type="primary"
                                size="large"
                                icon={<DollarCircleOutlined />}
                                onClick={handleWithdraw}
                                disabled={
                                    !selectedMethod ||
                                    !payoutAmount ||
                                    payoutAmount > availableBalance ||
                                    payoutAmount < (selectedMethod ? minimumWithdrawals[selectedMethod] : 0)
                                }
                                style={{ width: '100%', marginTop: '20px' }}
                            >
                                Withdraw
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default WithdrawPage;
