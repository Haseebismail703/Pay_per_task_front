import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Alltask from './user_pages/Alltask'
import My_task from './user_pages/My_work'
import CreateTask from './user_pages/Create_task'
import TaskSubmitPage from './user_pages/Task_detail'
import Opera_hist from './user_pages/Opera_hist'
import Youre_site from './user_pages/Youre_site'
import ViewStatisticsPage from './user_pages/View_statics'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Publisher */}
          <Route path='/' element={<Alltask />} />
          <Route path='/operation_history' element={<Opera_hist  />} />
           
          {/* advertiser */}
          <Route path='/creat_task' element={<CreateTask />} />
          <Route path='/creat_task/:id' element={<TaskSubmitPage />} />
          <Route path='/my_task' element={<My_task  />} />
          <Route path='/youre_site' element={<Youre_site/>} />
          <Route path='/Statistics' element={<ViewStatisticsPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
