import React, { useState } from "react";
import axios from "axios";
import { ServerUrl } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BsCloudUpload,
  BsCheckCircle,
  BsArrowLeft,
} from "react-icons/bs";

function Apply() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const job = state?.job;

  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [resume, setResume] = useState(null);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Job not found
      </div>
    );
  }

  const handleApply = async () => {
    if (!resume) {
      alert("Please upload resume");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("phone", phone);
      formData.append("experience", experience);
      formData.append("file", resume);

      const res = await axios.post(
        `${ServerUrl}/application/v1/create/${job._id}`,
        formData,
        {
          withCredentials: true,
        }
      );

    const response = {
  application: res.data.application,
  matchScore: res.data.matchScore,
  status: res.data.status,
  eligible: res.data.eligible,
};



navigate("/screening-result", {
  state: response,
});
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-12 pb-16">

  <div className="max-w-5xl mx-auto px-6">

    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black"
    >
      <BsArrowLeft />
      Back
    </button>

    <h1 className="text-3xl font-bold">
      Apply for {job.title}
    </h1>

    <p className="text-gray-500 mt-1 mb-8">
      {job.company} • {job.location}
    </p>

    <div className="grid lg:grid-cols-2 gap-6">

      {/* LEFT CARD */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-5">
          AI Hiring Process
        </h2>

        <div className="space-y-4">

          {[
            "Upload Resume",
            "AI Resume Screening",
            "Skill Matching",
            "Minimum 70% Match",
            "AI Interview",
            "Final Report",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3"
            >
              <BsCheckCircle className="text-green-600 text-lg" />

              <span className="text-[15px]">
                {item}
              </span>
            </div>
          ))}

        </div>

        <div className="mt-8 bg-green-50 rounded-xl p-4">

          <h3 className="font-semibold mb-1">
            Estimated Time
          </h3>

          <p className="text-sm text-gray-600">
            3–5 minutes for resume screening.
          </p>

        </div>

      </div>

      {/* RIGHT CARD */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-5">
          Application Form
        </h2>

        <div className="space-y-4">

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Experience (e.g. 1 Year)"
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <label className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition">

            <BsCloudUpload size={40} className="text-green-600" />

            <p className="mt-3 text-gray-700 font-medium">

              {resume ? resume.name : "Upload Resume"}

            </p>

            <p className="text-sm text-gray-400 mt-1">
              PDF only
            </p>

            <input
              type="file"
              hidden
              accept=".pdf"
              onChange={(e) =>
                setResume(e.target.files[0])
              }
            />

          </label>

          <button
            onClick={handleApply}
            disabled={loading}
            className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-xl transition"
          >
            {loading
              ? "Analyzing Resume..."
              : "Apply & Start Screening"}
          </button>

        </div>

      </div>

    </div>

    {result && (

      <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-center mb-5">
          Resume Screening Result
        </h2>

        <div className="text-center">

          <h1 className="text-5xl font-bold text-green-600">
            {result.matchScore}%
          </h1>

          <p className="mt-3 text-lg">
            Status :
            <span className="font-semibold capitalize">
              {" "}
              {result.status}
            </span>
          </p>

          {result.eligible ? (
            <>
              <p className="mt-5 text-green-600 font-semibold">
                Congratulations! You are eligible for the AI Interview.
              </p>

              <button
                onClick={() =>
                  navigate("/interview", {
                    state: {
                      applicationId: result.application._id,
                      jobId: result.application.job,
                    },
                  })
                }
                className="mt-6 bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-900"
              >
                Start AI Interview
              </button>
            </>
          ) : (
            <p className="mt-5 text-red-500 font-medium">
              Minimum 70% score is required to start the interview.
            </p>
          )}

        </div>

      </div>

    )}

  </div>

</div>
  )
}

export default Apply;