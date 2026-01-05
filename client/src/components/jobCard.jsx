import { useContext,useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {AppContext} from '../context/AppContext.jsx'

const jobCard = ({job}) => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [isAlreadyApplied, SetIsAlreadyApplied] = useState(false);
    const [JobData, setJobData] = useState(null);
    
    const { jobs, backendUrl, userData, userApplication, fetchUserApplications } = useContext(AppContext);

    const checkAlreadyApplied = () => {
        const hasApplied = userApplication.some(
            (item) => item.jobId._id === job._id
        );
        SetIsAlreadyApplied(hasApplied);
    };

    useEffect(() => {
        if (userApplication.length > 0) {
            checkAlreadyApplied();
        }
    }, [userApplication, job._id]);

    return (
        <div className='border border-gray-300 p-6 shadow rounded'>
            <div className='flex justify-start items-center'>
                <img className='h-8' src={job.companyId.image} alt="" />
                <h3 className='font-medium text-gray-600 text-xl mt-2 capitalize pl-2 mb-2'>{job.companyId.name}</h3>
            </div>
            <h4 className='font-medium text-xl mt-2 '>{job.title}</h4>
            <div className='flex items-center gap-3 mt-2 text-xs '>
                <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>{job.location}</span>
                <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded'>{job.level}</span>
            </div>
            <p className='text-gray-500 text-sm mt-4' dangerouslySetInnerHTML={{__html:job.description.slice(0,150)+'...'}}></p>
            <div className='mt-4 flex gap-4 text-sm'>
            {isAlreadyApplied? <button title='Already Applied' className='bg-gray-600 text-white px-4 py-2 rounded'>Applied</button>: <button title='Apply for this job' onClick={()=> {navigate(`/apply-job/${job._id}`); scrollTo(0,0); }} className='bg-blue-600 text-white px-4 py-2 rounded cursor-pointer'>Apply Now</button>}
            
            <button title='Learn More' onClick={()=> {navigate(`/apply-job/${job._id}`); scrollTo(0,0); }} className='bg-gray-100 border border-gray-500 px-4 py-2 rounded cursor-pointer'>Learn More</button>
            </div>
        </div>
    )
}

export default jobCard
