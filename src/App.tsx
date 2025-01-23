import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Spin } from 'antd'
import Alltask from './user_pages/Alltask'
// import My_task from './user_pages/My_work'
import CreateTask from './user_pages/Create_task'
import TaskSubmitPage from './user_pages/Task_detail'
import Opera_hist from './user_pages/Opera_hist'
import Mycompaign from './user_pages/Mycompaign'
import ViewStatisticsPage from './user_pages/View_statics'
import Writhdrow from './user_pages/Writhdrow'
import Deposite from './user_pages/Add_fund'
import Trans_hist from './user_pages/Trans_hist'
import Profile from './user_pages/Profile'
import Admin_dash from './Admin_pages/Admin_dash'
import PendingTasks from './Admin_pages/Task_pending'
import Appr_rej_task from './Admin_pages/Task_appr_rej'
import All_user from './Admin_pages/All_user'
import Task_report from './Admin_pages/Task_report'
import PaymentRequestPage from './Admin_pages/Payment_req'
import Payment_history from './Admin_pages/Payment_hist'
import Admin_profile from './Admin_pages/Admin_profile'
import Admin_login from './Admin_pages/Admin_login'
import LoginPage from './user_pages/Login'
import ApRejRev from './user_pages/ApRejRev'
import ReportTask from './Admin_pages/ReportTask'
import SignUpForm from './user_pages/Signup'
import HomePage from './Home/Home'
import { useEffect, useState } from 'react'
import Page from './user_pages/Page'
function App() {
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const auth_role = JSON.parse(localStorage.getItem('user') || '{}')
      setRole(auth_role.user_data.role);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '30px 50px' }}>
        <Spin
          size="large"
          indicator={
            <div style={{ color: 'green', fontSize: '24px' }}>
              <i className="anticon anticon-loading anticon-spin"></i>
            </div>
          }
        />
      </div>
    );
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public route */}
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpForm />} />
          <Route path="*" element={<Page />} />
          {/* Publisher */}
          <Route path='/allTask' element={role === 'user' ? <Alltask /> : <Navigate to="/" />} />
          <Route path='/allTask/:taskId' element={role === 'user' ? <TaskSubmitPage /> : <Navigate to="/" />} />
          <Route path='/myWork' element={role === 'user' ? <Opera_hist /> : <Navigate to="/" />} />
          <Route path='/withdraw' element={role === 'user' ? <Writhdrow /> : <Navigate to="/" />} />
          <Route path='/transactionHistory' element={role === 'user' ? <Trans_hist /> : <Navigate to="/" />} />
          <Route path='/profile' element={role === 'user' ? <Profile /> : <Navigate to="/" />} />
          

          {/* advertiser */}
          <Route path='/createCampaign' element={role === 'user' ? <CreateTask /> : <Navigate to="/" />} />
          <Route path='/myCampaign' element={role === 'user' ? <Mycompaign /> : <Navigate to="/" />} />
          <Route path='/myCampaign/:id' element={role === 'user' ? <ViewStatisticsPage /> : <Navigate to="/" />} />
          <Route path='/myCampaign/:id/allApRejRevTask' element={role === 'user' ? <ApRejRev /> : <Navigate to="/" />} />
          {/* <Route path='/my_task' element={role === 'user' ? <My_task /> : <Navigate to="/" />} /> */}
          <Route path='/addFund' element={role === 'user' ? <Deposite /> : <Navigate to="/" />} />

          {/* Admin Routes */}
          <Route path='/admin/dashboard' element={role === 'admin' ? <Admin_dash /> : <Navigate to="/" />} />
          <Route path='/admin/task/pending' element={role === 'admin' ? <PendingTasks /> : <Navigate to="/" />} />
          <Route path='/admin/task/approved_reject' element={role === 'admin' ? <Appr_rej_task /> : <Navigate to="/" />} />
          <Route path='/admin/All_users' element={role === 'admin' ? <All_user /> : <Navigate to="/" />} />
          <Route path='/admin/task_report' element={role === 'admin' ? <Task_report /> : <Navigate to="/" />} />
          <Route path='/admin/task_report/:taskId' element={role === 'admin' ? <ReportTask /> : <Navigate to="/" />} />
          <Route path='/admin/payment_request' element={role === 'admin' ? <PaymentRequestPage /> : <Navigate to="/" />} />
          <Route path='/admin/payment_history' element={role === 'admin' ? <Payment_history /> : <Navigate to="/" />} />
          <Route path='/admin/profile' element={role === 'admin' ? <Admin_profile /> : <Navigate to="/" />} />
          <Route path='/admin/login' element={<Admin_login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
