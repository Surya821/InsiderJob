import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Quill from "quill";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { JobCategories, JobLocations, assets } from "../assets/assets";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl, companyToken } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [level, setLevel] = useState("");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  /* Init Quill */
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  /* Fetch Job */
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/company/job/${id}`,
          { headers: { token: companyToken } }
        );

        if (data.success) {
          const job = data.job;
          setTitle(job.title);
          setCategory(job.category);
          setLocation(job.location);
          setLevel(job.level);
          setSalary(job.salary);

          setTimeout(() => {
            quillRef.current.root.innerHTML = job.description;
          }, 0);
        } else {
          toast.error(data.message);
        }
      } catch {
        toast.error("Failed to load job");
      }
    };

    fetchJob();
  }, [id]);

  /* Save */
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const description = quillRef.current.root.innerHTML;

      const { data } = await axios.put(
        `${backendUrl}/api/company/edit-job/${id}`,
        { title, description, location, salary, level, category },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success("Job updated");
        navigate(-1);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    /* BLUR BACKDROP */
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      
      {/* MODAL */}
      <div className="bg-white w-[95%] max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl p-6 relative">

        {/* CLOSE */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-2xl"
        >
          <img src={assets.cross_icon} alt="" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Job</h2>

        <form onSubmit={handleSave} className="space-y-4">

          <div>
            <p>Job Title</p>
            <input
              className="w-full border-2 px-3 py-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* FULL WIDTH DESCRIPTION */}
          <div>
            <p className="mb-2">Job Description</p>
            <div
              ref={editorRef}
              className="w-full border-2 rounded min-h-[220px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select value={category} onChange={e => setCategory(e.target.value)} className="border-2 p-2 rounded">
              {JobCategories.map((c, i) => <option key={i}>{c}</option>)}
            </select>

            <select value={location} onChange={e => setLocation(e.target.value)} className="border-2 p-2 rounded">
              {JobLocations.map((l, i) => <option key={i}>{l}</option>)}
            </select>

            <select value={level} onChange={e => setLevel(e.target.value)} className="border-2 p-2 rounded">
              <option>Beginner Level</option>
              <option>Intermediate Level</option>
              <option>Senior Level</option>
            </select>

            <input
              type="number"
              value={salary}
              onChange={e => setSalary(e.target.value)}
              className="border-2 p-2 rounded"
              placeholder="Salary"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button className="px-5 py-2 bg-black text-white rounded">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
