import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, message } from 'antd';
import Admin_navb from '../Admin_comp/Admin_navb';
import axios from 'axios';
import api from '../api/api';
import { Link } from 'react-router-dom';

interface TaskReport {
  id: string;
  taskName: string;
  userName: string;
  reportType: string;
  reportDesc: string;
  created_at: string;
  taskId: string;
  userId : string;
}

const TaskReportPage: React.FC = () => {
  const [taskData, setTaskData] = useState<TaskReport[]>([]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskReport | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  // Fetch task data from API
  const fetchTaskData = async () => {
    try {
      const response = await axios.get<TaskReport[]>(`${api}/getTaskReport`);
      const taskData = response.data?.map((item: any, index: number) => ({
        id: item._id,
        key: `${index + 1}`,
        userName: item.userName,
        created_at: item.created_at?.substring(0, 10),
        taskName: item.taskName,
        reportType: item.reportType,
        reportDesc: item.reportDesc,
        taskId: item.taskId,
        userId : item.userId,
      }));
      setTaskData(taskData);
    } catch (error) {
      message.error('Failed to fetch task data');
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, []);

  // Open the detail modal
  const showDetailModal = (task: TaskReport) => {
    setSelectedTask(task);
    setIsDetailModalVisible(true);
  };

  // Close the detail modal
  const handleDetailCancel = () => {
    setIsDetailModalVisible(false);
  };

  // Filter tasks based on search text
  const filteredTasks = taskData.filter((task) => {
    return (
      task.userName.toLowerCase().includes(searchText.toLowerCase()) ||
      task.id.includes(searchText)
    );
  });

  const columns = [
    {
        title: '#',
        dataIndex: 'key',
        key: 'key',
      },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
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
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, task: TaskReport) => (
        <>
          <Button type="link" onClick={() => showDetailModal(task)}>
            View Details
          </Button>
          <Button type="link" style={{ color: 'blue' }}>
            <Link   to={`/admin/task_report/${task.taskId}/user/${task.userId}`}>
            Visit Task
            </Link>
          </Button>

        </>
      ),
    },
  ];

  return (
    <>
      <Admin_navb />
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
          rowKey="id"
        />

        {/* Detail Modal */}
        <Modal
          title={`Task Details: ${selectedTask?.taskName || 'N/A'}`}
          open={isDetailModalVisible}
          onCancel={handleDetailCancel}
          footer={null}
        >
          {selectedTask && (
            <div>
              <p>
                <strong>Task ID:</strong> {selectedTask.id}
              </p>
              <p>
                <strong>User Name:</strong> {selectedTask.userName}
              </p>
              <p>
                <strong>Task Name:</strong> {selectedTask.taskName}
              </p>
              <p>
                <strong>Report Date:</strong> {selectedTask.created_at}
              </p>
              <p>
                <strong>Report Description:</strong> {selectedTask.reportDesc}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default TaskReportPage;
