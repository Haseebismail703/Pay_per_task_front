import React, { useState } from 'react';
import { Card, Typography, Steps, Button, Row, Col, Input, Radio, Image, message } from 'antd';
import { DollarCircleOutlined, WalletOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Step } = Steps;

const DepositPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedMethod, setSelectedMethod] = useState<'payeer' | 'perfectMoney' | null>(null);
    const [depositAmount, setDepositAmount] = useState<number | null>(null);
    const [userId, setUserId] = useState<string>("");

    // Example advertising balance
    const advertisingBalance = 250; // Displayed in the header

    // Move to the next or previous step
    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);

    // Handle method selection
    const handleMethodChange = (e: any) => setSelectedMethod(e.target.value);

    // Handle deposit amount change
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setDepositAmount(isNaN(value) ? null : value);
    };

    // Handle User ID input change
    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserId(e.target.value);

    // Process deposit submission
    const handleDeposit = () => {
        if (depositAmount && depositAmount > 0 && selectedMethod && userId) {
            message.success(`Deposited $${depositAmount} for User ID ${userId} via ${selectedMethod} successfully!`);
            setDepositAmount(null);
            setSelectedMethod(null);
            setUserId("");
            setCurrentStep(2); // Move to the success step
        } else {
            message.error("Please enter a valid amount, User ID, and select a payment method.");
        }
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: '20px', backgroundColor: '#f0f2f5' }}>
            <Col xs={24} sm={20} md={16} lg={10}>
                <Card
                    title={
                        <Title level={3}>
                            Advertising Balance: <span style={{ color: '#52c41a' }}>${advertisingBalance.toFixed(2)}</span>
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
                    {/* Step Indicator */}
                    <Steps current={currentStep} style={{ marginBottom: '20px' }}>
                        <Step title="Choose Payment Method" />
                        <Step title="Enter Amount and UID" />
                        <Step title="Success" />
                    </Steps>

                    {/* Step Content */}
                    {currentStep === 0 && (
                        <div style={{ padding: '20px' }}>
                            <Title level={4}>Select Payment Method</Title>
                            <Radio.Group onChange={handleMethodChange} value={selectedMethod} style={{ width: '100%' }}>
                                <Row justify="space-around">
                                    <Col span={12} style={{ textAlign: 'center' }}>
                                        <Radio value="payeer">
                                            <Image
                                                preview={false}
                                                width={50}
                                                src="https://s3.idle-empire.com/public/shop/platforms/payeer.png" // Replace with actual Payeer logo URL
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
                                                src="https://e7.pngegg.com/pngimages/214/412/png-clipart-logo-circle-graphics-sign-food-network-circle-food-text.png" // Replace with actual Perfect Money logo URL
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
                            <Title level={4}>Enter Deposit Amount and User ID</Title>
                            <Input
                                type="number"
                                placeholder={`Enter amount in $ (Min: ${
                                    selectedMethod === 'payeer' ? 2 : 3
                                })`}
                                prefix="$"
                                onChange={handleAmountChange}
                                value={depositAmount || ""}
                                style={{ width: '100%', marginBottom: '15px' }}
                            />
                            <Input
                                placeholder="Enter User ID (UID)"
                                onChange={handleUserIdChange}
                                value={userId}
                                style={{ width: '100%', marginBottom: '20px' }}
                            />

                            <Button
                                type="primary"
                                size="large"
                                icon={<DollarCircleOutlined />}
                                onClick={handleDeposit}
                                disabled={
                                    !depositAmount ||
                                    depositAmount < (selectedMethod === 'payeer' ? 2 : 3) ||
                                    !userId
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
                                Your deposit of ${depositAmount} has been successfully added to your account.
                            </Text>
                            <Text>
                                After verification, the funds will be available for use.
                            </Text>
                        </div>
                    )}
                </Card>
            </Col>
        </Row>
    );
};

export default DepositPage;
