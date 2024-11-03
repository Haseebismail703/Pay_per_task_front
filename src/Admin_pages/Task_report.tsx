import React, { useState } from 'react';
import { Table, Button, Modal, Input } from 'antd';
import Admin_navb from '../Admin_comp/Admin_navb';

interface Task {
    id: string;
    name: string;
    taskName: string;
    reportDate: string;
    payout: number;
}

const taskData: Task[] = [
    { id: '1', name: 'John Doe', taskName: 'Design Landing Page', reportDate: '2024-11-01', payout: 150 },
    { id: '2', name: 'Jane Smith', taskName: 'Develop API', reportDate: '2024-10-30', payout: 200 },
    { id: '3', name: 'Alice Johnson', taskName: 'Write Documentation', reportDate: '2024-11-02', payout: 100 },
    // Add more task data as needed
];

const Task_report : React.FC = () => {
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [searchText, setSearchText] = useState<string>('');

    const showDetailModal = (task: Task) => {
        setSelectedTask(task);
        setIsDetailModalVisible(true);
    };

    const handleDetailCancel = () => {
        setIsDetailModalVisible(false);
    };

    const filteredTasks = taskData.filter(task => {
        return task.name.toLowerCase().includes(searchText.toLowerCase()) || 
               task.id.includes(searchText);
    });

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Task Name',
            dataIndex: 'taskName',
            key: 'taskName',
        },
        {
            title: 'Task ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Report Date',
            dataIndex: 'reportDate',
            key: 'reportDate',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, task: Task) => (
                <>
                    <Button type="link" onClick={() => showDetailModal(task)}>View Details</Button>
                    <Button type="link" style={{ color: 'blue' }}>Visit Task</Button>
                </>
            ),
        },
    ];

    return (
        <>
        <Admin_navb/>
        <div style={{ padding: 20 }}>
            <Input
                placeholder="Search by Task ID or User Name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 20, width: 300 }}
            />

            <Table
                columns={columns}
                dataSource={filteredTasks}
                pagination={false}
                scroll={{ x: 'max-content' }}
            />

            {/* Detail Modal */}
            <Modal
                title={`Task Details: ${selectedTask?.taskName}`}
                visible={isDetailModalVisible}
                onCancel={handleDetailCancel}
                footer={null}
            >
                {selectedTask && (
                    <div>
                        <p><strong>Task ID:</strong> {selectedTask.id}</p>
                        <p><strong>User Name:</strong> {selectedTask.name}</p>
                        <p><strong>Task Name:</strong> {selectedTask.taskName}</p>
                        <p><strong>Report Date:</strong> {selectedTask.reportDate}</p>
                        <p><strong>Payout:</strong> ${selectedTask.payout.toFixed(2)}</p>
                    </div>
                )}
            </Modal>
        </div></>
    );
};

export default Task_report;
