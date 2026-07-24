import React, { useEffect, useState } from "react";
import axios from "axios";
import { ServerUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { BsBriefcase, BsGeoAlt } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${ServerUrl}/job/v1`, {
          withCredentials: true,
        });

        setJobs(res.data.allJob || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
  }, []);

return (
<div className="min-h-screen bg-[#f5f5f5] py-16">

<div className="max-w-7xl mx-auto">

 <h1 className="text-5xl font-bold text-center mb-14">
        Available <span className="text-green-600">Jobs</span>
      </h1>

<div className="grid lg:grid-cols-2 gap-8">

{jobs.map(job=>(

<div
key={job._id}
className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition"
>

<div className="flex gap-6">

<div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">

🏢

</div>

<div>

<h2 className="text-2xl font-bold">

{job.title}

</h2>

<p className="text-gray-500">

{job.company}

</p>

</div>

</div>

<div className="flex gap-3 mt-6 flex-wrap">

<span className="bg-gray-100 px-4 py-2 rounded-full">

📍 {job.location}

</span>

<span className="bg-gray-100 px-4 py-2 rounded-full">

💼 {job.experience || "Fresher"}

</span>

<span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">

Full Time

</span>

</div>

<p className="mt-6 text-gray-600">

{job.description?.slice(0,120)}...

</p>

<div className="flex gap-4 mt-8">

<button
className="bg-black text-white px-6 py-3 rounded-full"
onClick={()=>navigate(`/jobs/${job._id}`)}
>
View Details
</button>

<button
  onClick={() =>
    navigate("/apply", {
      state: {
        job,
      },
    })
  }
  className="bg-black text-white px-8 py-3 rounded-full"
>
  Apply Now
</button>

</div>

</div>

))}

</div>

</div>

</div>
);
}

export default Jobs;