import { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import {useNavigate, Outlet} from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'
import { toast } from 'react-toastify';
import axios from 'axios'
import Loading from '../components/Loading.jsx'
import {assets} from '../assets/assets.js'

const ManageJobs = () => {

  const navigate = useNavigate();

  const {backendUrl,companyToken} = useContext(AppContext)
  // console.log("Company token:", companyToken);

  const [jobs,setJobs] = useState(false);

  // Function to fetch company job applications data
  const fetchCompanyJobs = async()=>{
    try {
      const {data} = await axios.get(backendUrl+'/api/company/list-jobs',{headers:{token:companyToken}})

      if (data.success) {
        setJobs(data.jobsData.reverse());
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // Function to change job visibility
  const changeJobVisibility = async (id)=>{
    try {
      const {data} = await axios.post(backendUrl+'/api/company/change-visibility',{id}, {headers:{token:companyToken}})

      if(data.success){
        toast.success(data.message);
        fetchCompanyJobs();
      } else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  const deleteJob = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/company/delete-job/${id}`,
        {
          headers: { token: companyToken }
        }
      );
  
      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
  
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    if(companyToken){
      fetchCompanyJobs();
      // console.log(jobsData);      
    }
  },[companyToken])

  return jobs ? jobs.length ===0 ? (<div className='flex items-center justify-center h-[70vh]'>
    <p className='text-xl sm:text-2xl'>No Jobs Available or Posted</p>
  </div>): (
    <>
    <div className='container mx-w-5xl p-4'>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm rounded-lg'>
          <thead>
            <tr className='border-b border-gray-200'>
              <th className='py-2 px-4 text-left max-sm:hidden'>#</th>
              <th className='py-2 px-4 text-left'>Job Title</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Date</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 text-left'>Applicants</th>
              <th className='py-2 px-4 text-left'>Visible</th>
              <th className='py-2 px-4 text-center'>Edit Job</th>
              <th className='py-2 px-4 text-center'>Delete Job</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index)=>(
            <tr key={index} className='text-gray-700'>
              <td className='py-2 px-4 border-b border-gray-200 text-left max-sm:hidden'>{index+1}</td>
              <td className='py-2 px-4 border-b border-gray-200 text-left'>{job.title}</td>
              <td className='py-2 px-4 border-b border-gray-200 text-left max-sm:hidden'>{moment(job.date).format('ll')}</td>
              <td className='py-2 px-4 border-b border-gray-200 text-left max-sm:hidden'>{job.location}</td>
              <td className='py-2 px-4 border-b border-gray-200 text-left'>{job.applicants}</td>
              <td className='py-2 px-4 border-b border-gray-200 '>
                <input onChange={()=>changeJobVisibility(job._id)} className='scale-125 ml-4 accent-blue-500 cursor-pointer' type="checkbox" checked={job.visible}/>
              </td>
              <td className='py-2 px-4 border-b border-gray-200 text-center'><button onClick={() => navigate(`edit-job/${job._id}`)} className="cursor-pointer">Edit</button></td>
              <td className='py-2 px-4 border-b border-gray-200 text-center'><button className='cursor-pointer' onClick={()=>deleteJob(job._id)} ><img src={assets.delete_icon} alt="" /></button></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-3 flex justify-end'>
        <button onClick={()=> navigate('/dashboard/add-job')} className='py-2 px-4 mt-4 bg-black text-white cursor-pointer rounded'>Add New Job</button>
      </div>
    </div>
    <Outlet/>
    </>
  ):(<Loading/>)
}

export default ManageJobs