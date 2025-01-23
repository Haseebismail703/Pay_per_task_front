import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import Alltask from './user_pages/Alltask';
import CreateTask from './user_pages/Create_task';
import TaskSubmitPage from './user_pages/Task_detail';
import OperaHist from './user_pages/Opera_hist';
import MyCampaign from './user_pages/Mycompaign';
import ViewStatisticsPage from './user_pages/View_statics';
import Withdraw from './user_pages/Writhdrow';
import Deposit from './user_pages/Add_fund';
import TransactionHistory from './user_pages/Trans_hist';
import Profile from './user_pages/Profile';
import AdminDashboard from './Admin_pages/Admin_dash';
import PendingTasks from './Admin_pages/Task_pending';
import ApproveRejectTask from './Admin_pages/Task_appr_rej';
import AllUsers from './Admin_pages/All_user';
import TaskReport from './Admin_pages/Task_report';
import PaymentRequestPage from './Admin_pages/Payment_req';
import PaymentHistory from './Admin_pages/Payment_hist';
import AdminProfile from './Admin_pages/Admin_profile';
import AdminLogin from './Admin_pages/Admin_login';
import LoginPage from './user_pages/Login';
import ApRejRev from './user_pages/ApRejRev';
import ReportTask from './Admin_pages/ReportTask';
import SignUpForm from './user_pages/Signup';
import HomePage from './Home/Home';
import PageNotFound from './user_pages/Page';

function App() {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const authRole = JSON.parse(localStorage.getItem('user') || '{}');
        setRole(authRole?.user_data?.role || '');
      } catch (error) {
        console.error('Error parsing user data:', error);
        setRole('');
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const renderElement = (requiredRole: string, Component: JSX.Element) => {
    return role === requiredRole ? Component : <Navigate to="/" />;
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '30px 50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="*" element={<PageNotFound />} />

        {/* User Routes */}
        <Route path="/allTask" element={renderElement('user', <Alltask />)} />
        <Route path="/allTask/:taskId" element={renderElement('user', <TaskSubmitPage />)} />
        <Route path="/myWork" element={renderElement('user', <OperaHist />)} />
        <Route path="/withdraw" element={renderElement('user', <Withdraw />)} />
        <Route path="/transactionHistory" element={renderElement('user', <TransactionHistory />)} />
        <Route path="/profile" element={renderElement('user', <Profile />)} />
        <Route path="/createCampaign" element={renderElement('user', <CreateTask />)} />
        <Route path="/myCampaign" element={renderElement('user', <MyCampaign />)} />
        <Route path="/myCampaign/:id" element={renderElement('user', <ViewStatisticsPage />)} />
        <Route path="/myCampaign/:id/allApRejRevTask" element={renderElement('user', <ApRejRev />)} />
        <Route path="/addFund" element={renderElement('user', <Deposit />)} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={renderElement('admin', <AdminDashboard />)} />
        <Route path="/admin/task/pending" element={renderElement('admin', <PendingTasks />)} />
        <Route path="/admin/task/approved_reject" element={renderElement('admin', <ApproveRejectTask />)} />
        <Route path="/admin/All_users" element={renderElement('admin', <AllUsers />)} />
        <Route path="/admin/task_report" element={renderElement('admin', <TaskReport />)} />
        <Route path="/admin/task_report/:taskId" element={renderElement('admin', <ReportTask />)} />
        <Route path="/admin/payment_request" element={renderElement('admin', <PaymentRequestPage />)} />
        <Route path="/admin/payment_history" element={renderElement('admin', <PaymentHistory />)} />
        <Route path="/admin/profile" element={renderElement('admin', <AdminProfile />)} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
