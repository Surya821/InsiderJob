import React, {useContext} from 'react'
import Home from './pages/Home.jsx'
import ApplyJob from './pages/ApplyJob.jsx'
import Applications from './pages/Applications.jsx'
import {Route, Routes} from 'react-router-dom'
import RecruiterLogin from './components/RecruiterLogin.jsx'
import { AppContext } from './context/AppContext.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ManageJobs from './pages/ManageJobs.jsx'
import AddJob from './pages/AddJob.jsx'
import ViewApplications from './pages/ViewApplications.jsx'
import 'quill/dist/quill.snow.css';
import { ToastContainer } from 'react-toastify';

const App = () => {

  const {showRecruiterLogin, companyToken} = useContext(AppContext);
  
  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications/>} />

        {companyToken ? <>
        <Route path='/dashboard' element={<Dashboard />} >
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>
        </>:null}
      </Routes>
    </div>
  )
}

export default App;