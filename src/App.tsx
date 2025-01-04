import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Alltask from './user_pages/Alltask'
import My_task from './user_pages/My_work'
import CreateTask from './user_pages/Create_task'
import TaskSubmitPage from './user_pages/Task_detail'
import Opera_hist from './user_pages/Opera_hist'
import Mycompaign from './user_pages/Mycompaign'
import ViewStatisticsPage from './user_pages/View_statics'
import Dashboard from './user_pages/Dashboard'
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
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Publisher */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/all-tasks' element={<Alltask />} />
          <Route path='/all-tasks/:taskId' element={<TaskSubmitPage />} />
          <Route path='/my-work' element={<Opera_hist />} />
          <Route path='/withdraw' element={<Writhdrow />} />
          <Route path='/transaction-history' element={<Trans_hist />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<LoginPage/>} />

          {/* advertiser */}
          <Route path='/create-campaign' element={<CreateTask />} />
          <Route path='/my-campaign' element={<Mycompaign />} />
          <Route path='/my-campaign/:id' element={<ViewStatisticsPage />} />
          <Route path='/my-campaign/:id/allApRejRevTask' element={<ApRejRev/>} />
          <Route path='/my_task' element={<My_task />} />
          <Route path='/add-fund' element={<Deposite />} />
      
          {/* Admin Routes */}
          <Route path='/admin/dashboard' element={<Admin_dash />} />
          <Route path='/admin/task/pending' element={<PendingTasks/>} />
          <Route path='/admin/task/approved_reject' element={<Appr_rej_task/>} />
          <Route path='/admin/All_users' element={<All_user/>} />
          <Route path='/admin/task_report' element={<Task_report/>} />
          <Route path='/admin/task_report/:taskId' element={<ReportTask/>} />
          <Route path='/admin/payment_request' element={<PaymentRequestPage/>} />
          <Route path='/admin/payment_history' element={<Payment_history/>} />
          <Route path='/admin/profile' element={<Admin_profile/>} />
          <Route path='/admin/login' element={<Admin_login/>} /> 

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
