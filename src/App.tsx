import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Alltask from './user_pages/Alltask'
import My_task from './user_pages/My_work'
import CreateTask from './user_pages/Create_task'
import TaskSubmitPage from './user_pages/Task_detail'
import Opera_hist from './user_pages/Opera_hist'
import Youre_site from './user_pages/Youre_site'
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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Publisher */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/all-tasks' element={<Alltask />} />
          <Route path='/all-tasks/:id' element={<TaskSubmitPage />} />
          <Route path='/my-work' element={<Opera_hist />} />
          <Route path='/withdraw' element={<Writhdrow />} />
          <Route path='/transaction-history' element={<Trans_hist />} />
          <Route path='/profile' element={<Profile />} />
          {/* advertiser */}
          <Route path='/create-campaign' element={<CreateTask />} />
          <Route path='/my-campaign' element={<Youre_site />} />
          <Route path='/my-campaign/:Statistics' element={<ViewStatisticsPage />} />
          <Route path='/my_task' element={<My_task />} />
          <Route path='/add-fund' element={<Deposite />} />

          {/* Admin Routes */}
          <Route path='/admin/dashboard' element={<Admin_dash />} />
          <Route path='/admin/task/pending' element={<PendingTasks/>} />
          <Route path='/admin/task/approved_reject' element={<Appr_rej_task/>} />
          <Route path='/admin/All_users' element={<All_user/>} />
          <Route path='/admin/task_report' element={<Task_report/>} />
          <Route path='/admin/payment_request' element={<PaymentRequestPage/>} />
          <Route path='/admin/payment_history' element={<Payment_history/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
