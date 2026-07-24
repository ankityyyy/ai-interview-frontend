import React, { useEffect, useState } from "react";
import axios from "axios";
import { ServerUrl } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { BsGeoAlt, BsCashStack, BsBriefcase } from "react-icons/bs";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${ServerUrl}/job/v1/${id}`, {
          withCredentials: true,
        });

        setJob(res.data.job);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

   return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center items-center p-6">

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg border border-gray-200 p-8">

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          {job.employmentType}
        </span>

        <h1 className="text-3xl font-bold mt-4">
          {job.title}
        </h1>

        <p className="text-lg text-gray-500">
          {job.company}
        </p>

        <div className="flex flex-wrap gap-3 mt-6">

          <div className="bg-gray-100 px-4 py-2 rounded-full flex items-center gap-2">
            <BsGeoAlt />
            {job.location}
          </div>

          <div className="bg-gray-100 px-4 py-2 rounded-full flex items-center gap-2">
            <BsBriefcase />
            {job.experienceLevel}
          </div>

          <div className="bg-gray-100 px-4 py-2 rounded-full flex items-center gap-2">
            <BsCashStack />
            ₹{job.salaryRange.min.toLocaleString()} -
            ₹{job.salaryRange.max.toLocaleString()}
          </div>

        </div>

        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-2">
            Description
          </h3>

          <p className="text-gray-600 leading-7">
            {job.description}
          </p>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-3">
            Skills Required
          </h3>

          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.map((skill) => (
              <span
                key={skill}
                className="bg-green-50 text-green-700 px-3 py-2 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-4">

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-full border"
          >
            Back
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

    </div>
  );


   
}

export default JobDetails;