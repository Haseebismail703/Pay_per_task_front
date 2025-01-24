import React, { useState } from 'react';
import { Form, Input, Button, Select, Typography, notification, Collapse } from 'antd';
import Navbar from '../usercomp/user_nav';
import axios from 'axios';
import api from '../api/api.js';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;
const { Option } = Select;

const CreateTask: React.FC = () => {
    const [form] = Form.useForm();
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [publisherReward, setPublisherReward] = useState<number>(0);
    const [workersNeeded, setWorkersNeeded] = useState<number>(0);
    const [totalPriceWithoutFee, setTotalPriceWithoutFee] = useState<number>(0);
    const navigate = useNavigate()
    const countries = [
        { value: 'usa', label: 'United States' },
        { value: 'canada', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'australia', label: 'Australia' },
    ];

    const categories = [
        { value: 'development', label: 'Development', subcategories: ['Web Development', 'App Development', 'Software Development'] },
        { value: 'design', label: 'Design', subcategories: ['Graphic Design', 'UI/UX Design', 'Product Design'] },
        { value: 'marketing', label: 'Marketing', subcategories: ['SEO', 'Content Marketing', 'Social Media'] },
        { value: 'writing', label: 'Writing', subcategories: ['Blog Writing', 'Technical Writing', 'Copywriting'] },
    ];

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
    };

    const handlePublisherRewardChange = (value: string) => {
        const reward = parseFloat(value);
        setPublisherReward(reward);
        calculateTotalPrice(reward, workersNeeded);
    };

    const handleWorkersNeededChange = (value: string) => {
        const newWorkersNeeded = parseInt(value);
        setWorkersNeeded(newWorkersNeeded);
        calculateTotalPrice(publisherReward, newWorkersNeeded);
    };

    const calculateTotalPrice = (reward: number, workersNeeded: number) => {
        const totalWithoutFee = reward * workersNeeded;
        setTotalPriceWithoutFee(totalWithoutFee);
    };

    const handleSubmit = async (values: any) => {
        if (values.publisherReward < 0.1) {
            notification.error({
                message: 'Invalid Publisher Reward',
                description: 'The publisher reward must be at least $0.10!',
            });
            return;
        }

        try {
            let user = JSON.parse(localStorage.getItem('user') || '{}');
            const response = await axios.post(`${api}/createTask`, {
                ...values,
                totalPriceWithoutFee,
                advertiserId: user?.user_data.id || '',
                path: '/admin/task/pending',
                message: "Task Approval pending",
                type : "Task",
                role : "admin"
            });
        // console.log(user)
            if (response.status === 200) {
                notification.success({
                    message: 'Task Created Successfully',
                    description: 'Your task has been created!',
                });
                navigate('/myCampaign')
                form.resetFields();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // console.log(error.response?.data.message);
                notification.error({
                message: 'Error Creating Task',
                description: error.response?.data.message || 'There was an issue creating your task. Please try again.',
            });
            } else {
                console.log(error);
            }
            
        }
    };

    const collapseItems = [
        {
            key: '1',
            label: 'Task Details',
            children: (
                <>
                    <Form.Item
                        label="Task Title"
                        name="taskTitle"
                        rules={[{ required: true, message: 'Please enter the task title!' }]}
                    >
                        <Input placeholder="Enter task title" />
                    </Form.Item>
                    <Form.Item
                        label="Task Description"
                        name="taskDescription"
                        rules={[{ required: true, message: 'Please enter the task description!' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Describe the task" />
                    </Form.Item>
                </>
            ),
        },
        {
            key: '2',
            label: 'Category & Subcategory',
            children: (
                <>
                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please select a category!' }]}
                    >
                        <Select
                            placeholder="Select category"
                            onChange={handleCategoryChange}
                            style={{ width: '100%' }}
                        >
                            {categories.map(category => (
                                <Option key={category.value} value={category.value}>
                                    {category.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {selectedCategory && (
                        <Form.Item
                            label="Subcategory"
                            name="subcategory"
                            rules={[{ required: true, message: 'Please select a subcategory!' }]}
                        >
                            <Select placeholder="Select a subcategory" style={{ width: '100%' }}>
                                {categories
                                    .find(cat => cat.value === selectedCategory)
                                    ?.subcategories.map(subcat => (
                                        <Option key={subcat} value={subcat}>
                                            {subcat}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    )}
                </>
            ),
        },
        {
            key: '3',
            label: 'Financial Details',
            children: (
                <>
                    <Form.Item
                        label="Workers Needed"
                        name="workersNeeded"
                        rules={[{ required: true, message: 'Please enter the number of workers needed!' }]}
                    >
                        <Input
                            type="number"
                            onChange={e => handleWorkersNeededChange(e.target.value)}
                            placeholder="Enter the number of workers"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Publisher Reward ($)"
                        name="publisherReward"
                        rules={[{ required: true, message: 'Please enter the publisher reward!' }]}
                    >
                        <Input
                            type="number"
                            onChange={e => handlePublisherRewardChange(e.target.value)}
                            placeholder="Enter reward"
                        />
                    </Form.Item>
                    <Form.Item label="Total Price Without Fee ($)">
                        <Input value={totalPriceWithoutFee.toFixed(2)} disabled />
                    </Form.Item>
                </>
            ),
        },
        {
            key: '4',
            label: 'Target Audience & Instructions',
            children: (
                <>
                    <Form.Item
                        label="Target Countries"
                        name="targetCountries"
                        rules={[{ required: true, message: 'Please select target countries!' }]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Select countries"
                            style={{ width: '100%' }}
                        >
                            {countries.map(country => (
                                <Option key={country.value} value={country.value}>
                                    {country.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Task proof instruction"
                        name="instructions"
                        rules={[{ required: true, message: 'Please provide instructions!' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Enter instructions" />
                    </Form.Item>
                </>
            ),
        },
    ];

    return (
        <>
            <Navbar />
            <div style={{ padding: '30px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
                <center>
                    <Title level={3}>Create a New Task</Title>
                </center>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    style={{
                        maxWidth: '700px',
                        margin: '20px auto',
                        padding: '20px',
                        background: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Collapse items={collapseItems} defaultActiveKey={['1']} bordered={false} />

                    <Form.Item style={{ marginTop: '20px' }}>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Create Task
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default CreateTask;
