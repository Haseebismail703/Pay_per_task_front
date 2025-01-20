import React, { useEffect, useState } from 'react';
import { Card, Typography, Steps, Button, Row, Col, Input, Radio, Image, message } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import Navbar from '../usercomp/user_nav';
import api from '../api/api';

const { Title, Text } = Typography;
const { Step } = Steps;
interface User {
    id: number;
    earning: string;
    advBalance: string;
    payeer: string;
    perfectMoney: string;
}
const DepositPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedMethod, setSelectedMethod] = useState<'payeer' | 'perfectMoney' | null>(null);
    const [depositAmount, setDepositAmount] = useState<number | null>(null);
    const [TID, setTID] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState<User | null>(null);
   
    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);

    const handleMethodChange = (e: any) => setSelectedMethod(e.target.value);
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setDepositAmount(isNaN(value) ? null : value);
    };
    const handleTIDChange = (e: React.ChangeEvent<HTMLInputElement>) => setTID(e.target.value);

    const getUser = async () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const response = await axios.get<User>(`${api}/getUserByid/${user.user_data?.id}`);
        setUserData(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        getUser();
    }, []);


    const handleDeposit = async () => {
        if (depositAmount && depositAmount > 0 && selectedMethod && TID) {
            setLoading(true); // Disable button while loading
            let user = JSON.parse(localStorage.getItem('user') || '{}');
            try {
                const payload = {
                    userId: user?.user_data.id,
                    amount: depositAmount,
                    paymentMethod: selectedMethod,
                    paymentType: 'Deposit',
                    TID,
                    path : '/transaction-history',
                    message : `Deposite ${depositAmount}$ request send successfully`,
                    role : 'user',
                    type : 'Deposite under review'
                };

                const response = await axios.post(`${api}/addFund`, payload);
                if (response.status === 201) {
                    message.success('Deposit submitted successfully!');
                    setCurrentStep(2); // Move to success step
                    setDepositAmount(null);
                    setSelectedMethod(null);
                    setTID('');
                } else {
                    throw new Error('Unexpected response from server.');
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Failed to submit deposit. Please try again.';
                message.error(errorMessage);
            } finally {
                setLoading(false); // Re-enable button
            }
        } else {
            message.error('Please complete all fields correctly before proceeding.');
        }
    };

    const resetForm = () => {
        setCurrentStep(0);
        setDepositAmount(null);
        setSelectedMethod(null);
        setTID('');
    };

    return (
        <>
            <Navbar />
            <Row
                justify="center"
                align="middle"
                style={{ minHeight: '100vh', padding: '20px', backgroundColor: '#f0f2f5' }}
            >
                <Col xs={24} sm={20} md={16} lg={10}>
                    <Card
                        title={
                            <Title level={3}>
                                Advertising Balance: <span style={{ color: '#52c41a' }}>${parseFloat(userData?.advBalance || '0').toFixed(2)}</span>
                            </Title>
                        }
                        bordered={false}
                        style={{
                            borderRadius: '8px',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
                            textAlign: 'center',
                            backgroundColor: '#fff',
                        }}
                    >
                        <Steps current={currentStep} style={{ marginBottom: '20px' }}>
                            <Step title="Choose Payment Method" />
                            <Step title="Enter Details" />
                            <Step title="Success" />
                        </Steps>

                        {currentStep === 0 && (
                            <div style={{ padding: '20px' }}>
                                <Title level={4}>Select Payment Method</Title>
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
                                                <Text style={{ display: 'block', marginTop: '8px' }}>Payeer (Min: $2)</Text>
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
                                                <Text style={{ display: 'block', marginTop: '8px' }}>Perfect Money (Min: $3)</Text>
                                            </Radio>
                                        </Col>
                                    </Row>
                                </Radio.Group>
                                <Button
                                    type="primary"
                                    onClick={nextStep}
                                    disabled={!selectedMethod}
                                    style={{ width: '100%', marginTop: '20px' }}
                                >
                                    Continue
                                </Button>
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div style={{ padding: '20px' }}>
                                <Title level={4}>Enter Deposit Details</Title>
                                <Input
                                    type="number"
                                    placeholder={`Enter amount in $ (Min: ${selectedMethod === 'payeer' ? 2 : 3})`}
                                    prefix="$"
                                    onChange={handleAmountChange}
                                    value={depositAmount || ''}
                                    style={{ width: '100%', marginBottom: '15px' }}
                                />
                                <Input
                                    placeholder="Enter Transaction ID (TID)"
                                    onChange={handleTIDChange}
                                    value={TID}
                                    style={{ width: '100%', marginBottom: '20px' }}
                                />
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<DollarCircleOutlined />}
                                    onClick={handleDeposit}
                                    loading={loading}
                                    disabled={
                                        !depositAmount ||
                                        depositAmount < (selectedMethod === 'payeer' ? 2 : 3) ||
                                        !TID
                                    }
                                    style={{ width: '100%' }}
                                >
                                    Deposit
                                </Button>
                                <Button
                                    type="default"
                                    onClick={prevStep}
                                    style={{ width: '100%', marginTop: '10px' }}
                                >
                                    Go Back
                                </Button>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div style={{ padding: '20px' }}>
                                <Title level={4} style={{ color: '#52c41a' }}>Deposit Successful!</Title>
                                <Text style={{ display: 'block', marginBottom: '20px' }}>
                                    Your deposit has been successfully submitted.
                                </Text>
                                <Text>
                                    After verification, the funds will be available for use.
                                </Text>
                                <Button
                                    type="primary"
                                    onClick={resetForm}
                                    style={{ width: '100%', marginTop: '20px' }}
                                >
                                    Make Another Deposit
                                </Button>
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default DepositPage;
