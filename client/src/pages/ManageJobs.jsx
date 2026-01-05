import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../components/Loading.jsx";
import { assets } from "../assets/assets.js";

const ManageJobs = () => {
  const navigate = useNavigate();
  const { backendUrl, companyToken } = useContext(AppContext);

  const [jobs, setJobs] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  // Fetch jobs
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/company/list-jobs",
        { headers: { token: companyToken } }
      );

      if (data.success) {
        setJobs(data.jobsData.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Change visibility
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-visibility",
        { id },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete job
  const deleteJob = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/company/delete-job/${id}`,
        { headers: { token: companyToken } }
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

  useEffect(() => {
    if (companyToken) fetchCompanyJobs();
  }, [companyToken]);

  // Close menu on outside click
  useEffect(() => {
    const close = () => setOpenMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  if (!jobs) return <Loading />;

  if (jobs.length === 0)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl">No Jobs Available or Posted</p>
      </div>
    );

  return (
    <>
      <div className="w-full max-w-6xl my-3 px-2 sm:px-4">
        <table className="w-full table-fixed bg-white border border-gray-200 rounded-lg text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 px-2 text-left max-sm:hidden">#</th>
              <th className="py-2 px-2 text-left">Job Title</th>
              <th className="py-2 px-2 text-center max-sm:hidden">Date</th>
              <th className="py-2 px-2 text-center max-sm:hidden">Location</th>
              <th className="py-2 px-2 text-center">Applicants</th>
              <th className="py-2 px-2 text-center">Visible</th>

              {/* Desktop */}
              <th className="py-2 px-2 text-center max-sm:hidden">Edit Job</th>
              <th className="py-2 px-2 text-center max-sm:hidden">Delete Job</th>

              {/* Mobile */}
              <th className="py-2 px-2 text-left sm:hidden w-10"></th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job, index) => (
              <tr key={job._id} className="border-b border-gray-300 text-gray-700">
                <td className="py-2 px-2 max-sm:hidden">{index + 1}</td>

                {/* Job title wraps */}
                <td className="py-2 px-2 break-words max-w-[140px] sm:max-w-none font-medium">
                  {job.title}
                </td>

                <td className="py-2 px-2 text-center max-sm:hidden">
                  {moment(job.date).format("ll")}
                </td>

                <td className="py-2 px-2 text-center max-sm:hidden">{job.location}</td>

                <td className="py-2 px-2 text-center">{job.applicants}</td>

                <td className="py-2 px-2 text-center">
                  <input
                    type="checkbox"
                    checked={job.visible}
                    onChange={() => changeJobVisibility(job._id)}
                    className="scale-110 accent-blue-500 cursor-pointer"
                  />
                </td>

                {/* Desktop Edit */}
                <td className="py-2 px-2 text-center max-sm:hidden">
                  <button
                    onClick={() => navigate(`edit-job/${job._id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>

                {/* Desktop Delete */}
                <td className="py-2 px-2 text-center max-sm:hidden">
                  <button onClick={() => deleteJob(job._id)}>
                    <img
                      src={assets.delete_icon}
                      className="w-8 mx-auto cursor-pointer"
                    />
                  </button>
                </td>

                {/* Mobile ⋮ Menu */}
                <td
                  className="py-2 px-2 text-center sm:hidden relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === job._id ? null : job._id)
                    }
                    className="text-xl font-bold"
                  >
                    ⋮
                  </button>

                  {openMenu === job._id && (
                    <div className="absolute right-2 top-8 z-20 bg-white border rounded shadow-md w-28">
                      <button
                        onClick={() => navigate(`edit-job/${job._id}`)}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteJob(job._id)}
                        className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => navigate("/dashboard/add-job")}
            className="py-2 px-4 bg-black text-white rounded"
          >
            Add New Job
          </button>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default ManageJobs;
