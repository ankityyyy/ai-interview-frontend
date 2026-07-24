import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BsCheckCircleFill,
  BsAward,
  BsCodeSlash,
  BsBook,
  BsBriefcase,
} from "react-icons/bs";



function ScreeningResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log("State =", state);
console.log("Application =", state?.application);


  if (!state) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        No screening result found.
      </div>
    );
  }

  const { application, matchScore, status, eligible } = state;

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-12">

      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}

        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

          <BsCheckCircleFill
            className="mx-auto text-green-600 mb-4"
            size={60}
          />

          <h1 className="text-3xl font-bold">
            Resume Screening Complete
          </h1>

          <p className="text-gray-500 mt-2">
            Your resume has been analyzed by our AI.
          </p>

        </div>

        {/* Score */}

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-3xl shadow p-6 text-center">

            <h3 className="text-gray-500">
              Match Score
            </h3>

            <h1 className="text-5xl font-bold text-green-600 mt-2">
              {matchScore}%
            </h1>

          </div>

          <div className="bg-white rounded-3xl shadow p-6 text-center">

            <h3 className="text-gray-500">
              Status
            </h3>

            <h2 className="text-2xl font-bold mt-2 capitalize">
              {status}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow p-6 text-center">

            <h3 className="text-gray-500">
              Eligibility
            </h3>

            <h2
              className={`text-2xl font-bold mt-2 ${
                eligible
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {eligible ? "Eligible" : "Not Eligible"}
            </h2>

          </div>

        </div>

        {/* Skills */}

        <div className="bg-white rounded-3xl shadow p-6 mt-8">

          <div className="flex items-center gap-2 mb-5">

            <BsCodeSlash />

            <h2 className="text-xl font-semibold">
              Matched Skills
            </h2>

          </div>

          <div className="flex flex-wrap gap-3">

            {application?.matchedSkills?.map((skill) => (
  <span
    key={skill}
    className="bg-green-100 text-green-700 px-4 py-2 rounded-full"
  >
    {skill}
  </span>
))}

          </div>

        </div>

        {application?.resumeSummary?.projects?.map((project) => (
  <li key={project}>• {project}</li>
))}

        <div className="bg-white rounded-3xl shadow p-6 mt-8">

          <div className="flex items-center gap-2 mb-5">

            <BsAward />

            <h2 className="text-xl font-semibold">
              Projects Found
            </h2>

          </div>

          <ul className="space-y-3">

            {application.resumeSummary.projects.map((project) => (

              <li key={project}>
                • {project}
              </li>

            ))}

          </ul>

        </div>

        {application?.resumeSummary?.experience?.map((exp) => (
  <p key={exp}>• {exp}</p>
))}

        <div className="bg-white rounded-3xl shadow p-6 mt-8">

          <div className="flex items-center gap-2 mb-5">

            <BsBook />

            <h2 className="text-xl font-semibold">
              Education
            </h2>

          </div>

          <div className="space-y-2">

            {application.resumeSummary.education.map((item) => (

              <p key={item}>
                • {item}
              </p>

            ))}

          </div>

        </div>

        {/* Experience */}

        <div className="bg-white rounded-3xl shadow p-6 mt-8">

          <div className="flex items-center gap-2 mb-5">

            <BsBriefcase />

            <h2 className="text-xl font-semibold">
              Experience
            </h2>

          </div>

          <div className="space-y-2">

            {application.resumeSummary.experience.map((exp) => (

              <p key={exp}>
                • {exp}
              </p>

            ))}

          </div>

        </div>

        {/* Button */}

        <div className="text-center mt-10">

          {eligible ? (
                console.log("Application =", application),

            <button
              onClick={() =>
               
                navigate("/interview", {
                  state: {
                    applicationId: application._id,
                    jobId: application.job,
                  },
                })
              }
              className="bg-black text-white px-10 py-4 rounded-full hover:bg-gray-900"
            >
              Start AI Interview
            </button>

          ) : (

            <button
              onClick={() => navigate("/jobs")}
              className="border px-10 py-4 rounded-full"
            >
              Browse Other Jobs
            </button>

          )}

        </div>

      </div>

    </div>
  );
}

export default ScreeningResult;