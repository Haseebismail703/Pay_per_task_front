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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Publisher */}
          <Route path='/' element={<Dashboard />} />
          <Route path='/all-tasks' element={<Alltask />} />
          <Route path='/all-tasks/:id' element={<TaskSubmitPage />} />
          <Route path='/my-work' element={<Opera_hist  />} />
          <Route path='/withdraw' element={<Writhdrow  />} />
          <Route path='/transaction-history' element={<Trans_hist  />} />
          <Route path='/profile' element={<Profile  />} />
          {/* advertiser */}
          <Route path='/create-campaign' element={<CreateTask />} />
          <Route path='/my-campaign' element={<Youre_site/>} />
          <Route path='/my-campaign/:Statistics' element={<ViewStatisticsPage/>} />
          <Route path='/my_task' element={<My_task  />} />
          <Route path='/add-fund' element={<Deposite  />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
