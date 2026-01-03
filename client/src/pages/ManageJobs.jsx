import React from 'react'
import {manageJobsData} from '../assets/assets.js'
import moment from 'moment'
import {useNavigate} from 'react-router-dom'

const ManageJobs = () => {

  const navigate = useNavigate();


  return (
    <div className='container mx-w-5xl p-4'>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm rounded-lg'>
          <thead>
            <tr className='border-b border-gray-200'>
              <th className='py-2 px-4 text-left max-sm:hidden'>#</th>
              <th className='py-2 px-4 text-left'>Job Title</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Date</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 text-center'>Applicants</th>
              <th className='py-2 px-4 text-left'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job, index)=>(
            <tr key={index} className='text-gray-700'>
              <td className='py-2 px-4 border-b border-gray-200 text-center max-sm:hidden'>{index+1}</td>
              <td className='py-2 px-4 border-b border-gray-200 text-left'>{job.title}</td>
              <td className='py-2 px-4 border-b border-gray-200 text-left max-sm:hidden'>{moment(job.date).format('ll')}</td>
              <td className='py-2 px-4 border-b border-gray-200 text-left max-sm:hidden'>{job.location}</td>
              <td className='py-2 px-4 border-b border-gray-200 text-left'>{job.applicants}</td>
              <td className='py-2 px-4 border-b border-gray-200 '>
                <input className='scale-125 ml-4 accent-blue-500 cursor-pointer' type="checkbox"/>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-3 flex justify-end'>
        <button onClick={()=> navigate('/dashboard/add-job')} className='py-2 px-4 mt-4 bg-black text-white cursor-pointer rounded'>Add New Job</button>
      </div>
    </div>
  )
}

export default ManageJobs