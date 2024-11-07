import React, { useState } from 'react';
import { Form, Input, Button, Select, Typography, notification } from 'antd';
import Navbar from '../usercomp/user_nav';

const { Title } = Typography;
const { Option } = Select;

const CreateTask: React.FC = () => {
    const [form] = Form.useForm();
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [publisherReward, setPublisherReward] = useState<number>(0);
    const [workersNeeded, setWorkersNeeded] = useState<number>(0);
    const [totalPriceWithoutFee, setTotalPriceWithoutFee] = useState<number>(0);

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
        const totalWithoutFee = reward * workersNeeded; // Calculate total price without fee
        setTotalPriceWithoutFee(totalWithoutFee);
    };

    const handleSubmit = (values: any) => {
        if (values.publisherReward < 0.1) {
            notification.error({
                message: 'Invalid Publisher Reward',
                description: 'The publisher reward must be at least $0.10!',
            });
            return; // Prevent form submission if publisher reward is too low
        }

        notification.success({
            message: 'Task Created Successfully',
            description: 'Your task has been created!',
        });

        console.log('Form Values:', values);
        form.resetFields();
    };

    return (
        <>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <center>
                    <Title level={3}>Create a New Task</Title>
                </center>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    style={{ maxWidth: '600px', margin: 'auto' }}
                >
                    {/* Task Title */}
                    <Form.Item
                        label="Task Title"
                        name="taskTitle"
                        rules={[{ required: true, message: 'Please enter the task title!' }]}
                    >
                        <Input placeholder="Enter task title" />
                    </Form.Item>

                    {/* Task Description */}
                    <Form.Item
                        label="Task Description"
                        name="taskDescription"
                        rules={[{ required: true, message: 'Please enter the task description!' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Describe the task" />
                    </Form.Item>

                    {/* Category Selection */}
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

                    {/* Subcategory Selection */}
                    {selectedCategory && (
                        <Form.Item
                            label="Subcategory"
                            name="subcategory"
                            rules={[{ required: true, message: 'Please select a subcategory!' }]}
                        >
                            <Select
                                placeholder="Select a subcategory"
                                style={{ width: '100%' }}
                            >
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

                    {/* Instructions */}
                    <Form.Item
                        label="Instructions"
                        name="instructions"
                        rules={[{ required: true, message: 'Please provide instructions!' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Enter instructions" />
                    </Form.Item>

                    {/* Workers Needed */}
                    <Form.Item
                        label="Workers Needed"
                        name="workersNeeded"
                        rules={[
                            { required: true, message: 'Please enter the number of workers needed!' },
                            { validator: (_, value) => {
                                if (parseInt(value) < 1) {
                                    return Promise.reject('At least one worker is needed');
                                }
                                return Promise.resolve();
                            }}
                        ]}
                    >
                        <Input
                            type="number"
                            onChange={e => handleWorkersNeededChange(e.target.value)}
                            placeholder="Enter the number of workers"
                        />
                    </Form.Item>

                    {/* Publisher Reward */}
                    <Form.Item
                        label="Publisher Reward ($)"
                        name="publisherReward"
                        rules={[
                            { required: true, message: 'Please enter the publisher reward!' },
                            { validator: (_, value) => {
                                if (parseFloat(value) < 0.1) {
                                    return Promise.reject('Publisher reward must be at least $0.10');
                                }
                                return Promise.resolve();
                            }}
                        ]}
                    >
                        <Input
                            type="number"
                            onChange={e => handlePublisherRewardChange(e.target.value)}
                            placeholder="Enter reward"
                        />
                    </Form.Item>

                    {/* Target Countries */}
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

                    {/* Total Price Without Fee */}
                    <Form.Item label="Total Price Without Fee ($)">
                        <Input value={totalPriceWithoutFee.toFixed(2)} disabled />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
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
