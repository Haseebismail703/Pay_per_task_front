import React, { useState } from 'react';
import { Form, Input, Button, Select, Row, Col, Typography, notification } from 'antd';
import Navbar from '../usercomp/user_nav';

const { Title } = Typography;
const { Option } = Select;

const CreateTask: React.FC = () => {
    const [form] = Form.useForm();
    const [budget, setBudget] = useState<number>(0);
    const [workerCount, setWorkerCount] = useState<number>(1);
    const [estimatedCost, setEstimatedCost] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

    const countries = [
        { value: 'usa', label: 'United States' },
        { value: 'canada', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'australia', label: 'Australia' },
        // Add more countries as needed
    ];

    const categories = [
        { value: 'development', label: 'Development', subcategories: ['Web Development', 'App Development', 'Software Development'] },
        { value: 'design', label: 'Design', subcategories: ['Graphic Design', 'UI/UX Design', 'Product Design'] },
        { value: 'marketing', label: 'Marketing', subcategories: ['SEO', 'Content Marketing', 'Social Media'] },
        { value: 'writing', label: 'Writing', subcategories: ['Blog Writing', 'Technical Writing', 'Copywriting'] },
        // Add more categories and subcategories as needed
    ];

    const handleBudgetChange = (value: number) => {
        setBudget(value);
        calculateEstimatedCost(value, workerCount);
    };

    const handleWorkerChange = (value: number) => {
        setWorkerCount(value);
        calculateEstimatedCost(budget, value);
    };

    const calculateEstimatedCost = (budget: number, workers: number) => {
        const cost = budget * workers;
        setEstimatedCost(cost);
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
    };

    const handleSubmit = (values: any) => {
        notification.success({
            message: 'Task Created',
            description: 'Your task has been created successfully!',
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
                    {/* Job Title */}
                    <Form.Item
                        label="Job Title"
                        name="jobTitle"
                        rules={[{ required: true, message: 'Please enter the job title!' }]}
                    >
                        <Input placeholder="Enter the job title" />
                    </Form.Item>

                    {/* Job Description */}
                    <Form.Item
                        label="Job Description"
                        name="jobDescription"
                        rules={[{ required: true, message: 'Please enter the job description!' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Describe the job..." />
                    </Form.Item>

                    {/* Select Countries (Multiple) */}
                    <Form.Item
                        label="Select Country"
                        name="countries"
                        rules={[{ required: true, message: 'Please select at least one country!' }]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Select countries"
                            style={{ width: '100%' }}
                            dropdownStyle={{ backgroundColor: '#f0f0f0' }}
                        >
                            {countries.map(country => (
                                <Option key={country.value} value={country.value}>
                                    {country.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Select Category */}
                    <Form.Item
                        label="Select Category"
                        name="category"
                        rules={[{ required: true, message: 'Please select a category!' }]}
                    >
                        <Select
                            placeholder="Select a category"
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
                            label="Select Subcategory"
                            name="subcategory"
                            rules={[{ required: true, message: 'Please select a subcategory!' }]}
                        >
                            <Select
                                placeholder="Select a subcategory"
                                style={{ width: '100%' }}
                            >
                                {categories.find(cat => cat.value === selectedCategory)?.subcategories.map(subcat => (
                                    <Option key={subcat} value={subcat}>
                                        {subcat}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}

                    {/* Required Proof */}
                    <Form.Item
                        label="Required Proof Task Completed"
                        name="requiredProof"
                        rules={[{ required: true, message: 'Please provide required proof details!' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Describe the required proof for task completion..." />
                    </Form.Item>

                    {/* Budget */}
                    <Form.Item
                        label="Budget ($)"
                        name="budget"
                        rules={[{ required: true, message: 'Please enter the budget!' }]}
                    >
                        <Input type="number" onChange={e => handleBudgetChange(Number(e.target.value))} />
                    </Form.Item>

                    {/* Workers Needed */}
                    <Form.Item
                        label="Workers Needed"
                        name="workersNeeded"
                        rules={[{ required: true, message: 'Please enter the number of workers needed!' }]}
                    >
                        <Input
                            type="number"
                            value={workerCount}
                            onChange={e => handleWorkerChange(Number(e.target.value))}
                            placeholder="Enter number of workers needed"
                        />
                    </Form.Item>

                    {/* Estimated Job Cost */}
                    <Form.Item label="Estimated Job Cost ($)">
                        <Input value={estimatedCost} disabled />
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
