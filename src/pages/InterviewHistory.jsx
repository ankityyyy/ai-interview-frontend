// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ServerUrl } from "../App";
// import { FaArrowLeft } from "react-icons/fa";

// function InterviewHistory() {
//   const [interviews, setInterviews] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getMyInterviews = async () => {
//       try {
//         const { data } = await axios.get(
//           `${ServerUrl}/interview/v1/history`,
//           {
//             withCredentials: true,
//           }
//         );

//         console.log("History:", data);

//         setInterviews(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getMyInterviews();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-10">
//       <div className="w-[90vw] lg:w-[70vw] mx-auto">

//         {/* Header */}
//         <div className="flex items-center gap-4 mb-10">
//           <button
//             onClick={() => navigate("/")}
//             className="p-3 rounded-full bg-white shadow hover:shadow-md"
//           >
//             <FaArrowLeft />
//           </button>

//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">
//               Interview History
//             </h1>

//             <p className="text-gray-500">
//               Track your completed AI interviews
//             </p>
//           </div>
//         </div>

//         {interviews.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow p-10 text-center">
//             <p className="text-gray-500 text-lg">
//               No completed interviews found.
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-6">
//             {interviews.map((item) => (
//               <div
//                 key={item._id}
//                 onClick={() => navigate(`/report/${item._id}`)}
//                 className="bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer border border-gray-100 p-6"
//               >
//                 <div className="flex flex-col md:flex-row justify-between gap-6">

//                   {/* Left */}
//                   <div>
//                     <h2 className="text-xl font-bold text-gray-800">
//                       {item.job?.title || "Job Title"}
//                     </h2>

//                     <p className="text-gray-500 mt-1">
//                       {item.job?.company || "Company"}
//                     </p>

//                     <p className="text-sm text-gray-400 mt-3">
//                       Interviewed on{" "}
//                       {new Date(item.createdAt).toLocaleDateString()}
//                     </p>

//                     <p className="text-sm text-gray-500 mt-1">
//                       Stage Completed: {item.currentStage}
//                     </p>
//                   </div>

//                   {/* Right */}
//                   <div className="flex items-center gap-6">

//                     <div className="text-right">
//                       <p className="text-3xl font-bold text-emerald-600">
//                         {item.overallRating ?? 0}/10
//                       </p>

//                       <p className="text-sm text-gray-500">
//                         Overall Rating
//                       </p>
//                     </div>

//                     <span
//                       className={`px-4 py-2 rounded-full text-sm font-semibold ${
//                         item.status === "completed"
//                           ? "bg-emerald-100 text-emerald-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {item.status}
//                     </span>

//                   </div>

//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default InterviewHistory;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";
import { FaArrowLeft } from "react-icons/fa";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function InterviewHistory() {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyInterviews = async () => {
      try {
        const { data } = await axios.get(
          `${ServerUrl}/interview/v1/history`,
          {
            withCredentials: true,
          }
        );

        setInterviews(data);
      } catch (error) {
        console.log(error);
      }
    };

    getMyInterviews();
  }, []);

  const averageRating =
    interviews.length > 0
      ? (
          interviews.reduce(
            (sum, item) => sum + (item.overallRating || 0),
            0
          ) / interviews.length
        ).toFixed(1)
      : 0;

  const barData = interviews.map((item, index) => ({
    interview: `#${index + 1}`,
    rating: item.overallRating || 0,
  }));

  const pieData = [
    {
      name: "Completed",
      value: interviews.filter(
        (item) => item.status === "completed"
      ).length,
    },
    {
      name: "Started",
      value: interviews.filter(
        (item) => item.status === "started"
      ).length,
    },
  ];

  const COLORS = ["#10B981", "#F59E0B"];

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-10">
  //     <div className="w-[90vw] lg:w-[75vw] mx-auto">

  //       {/* Header */}
  //       <div className="flex items-center gap-4 mb-10">
  //         <button
  //           onClick={() => navigate("/")}
  //           className="p-3 rounded-full bg-white shadow hover:shadow-md"
  //         >
  //           <FaArrowLeft />
  //         </button>

  //         <div>
  //           <h1 className="text-3xl font-bold text-gray-800">
  //             Interview History
  //           </h1>

  //           <p className="text-gray-500">
  //             Track your completed AI interviews
  //           </p>
  //         </div>
  //       </div>

  //       {interviews.length === 0 ? (
  //         <div className="bg-white rounded-2xl shadow p-10 text-center">
  //           <p className="text-gray-500 text-lg">
  //             No completed interviews found.
  //           </p>
  //         </div>
  //       ) : (
  //         <>
  //           {/* Summary Cards */}
  //           <div className="grid md:grid-cols-3 gap-6 mb-8">

  //             <div className="bg-white rounded-2xl shadow p-6">
  //               <p className="text-gray-500">
  //                 Total Interviews
  //               </p>

  //               <h2 className="text-4xl font-bold text-emerald-600 mt-2">
  //                 {interviews.length}
  //               </h2>
  //             </div>

  //             <div className="bg-white rounded-2xl shadow p-6">
  //               <p className="text-gray-500">
  //                 Average Rating
  //               </p>

  //               <h2 className="text-4xl font-bold text-blue-600 mt-2">
  //                 {averageRating}/10
  //               </h2>
  //             </div>

  //             <div className="bg-white rounded-2xl shadow p-6">
  //               <p className="text-gray-500">
  //                 Completed
  //               </p>

  //               <h2 className="text-4xl font-bold text-green-600 mt-2">
  //                 {pieData[0].value}
  //               </h2>
  //             </div>
  //           </div>

  //           {/* Charts */}
  //           <div className="grid lg:grid-cols-2 gap-6 mb-10">

  //             {/* Bar Chart */}
  //             <div className="bg-white rounded-2xl shadow p-6">
  //               <h2 className="text-xl font-bold mb-5">
  //                 Interview Ratings
  //               </h2>

  //               <ResponsiveContainer width="100%" height={300}>
  //                 <BarChart data={barData}>
  //                   <XAxis dataKey="interview" />
  //                   <YAxis domain={[0, 10]} />
  //                   <Tooltip />
  //                   <Bar
  //                     dataKey="rating"
  //                     fill="#10B981"
  //                     radius={[8, 8, 0, 0]}
  //                   />
  //                 </BarChart>
  //               </ResponsiveContainer>
  //             </div>

  //             {/* Pie Chart */}
  //             <div className="bg-white rounded-2xl shadow p-6">
  //               <h2 className="text-xl font-bold mb-5">
  //                 Interview Status
  //               </h2>

  //               <ResponsiveContainer width="100%" height={300}>
  //                 <PieChart>
  //                   <Pie
  //                     data={pieData}
  //                     dataKey="value"
  //                     outerRadius={100}
  //                     label
  //                   >
  //                     {pieData.map((entry, index) => (
  //                       <Cell
  //                         key={index}
  //                         fill={COLORS[index % COLORS.length]}
  //                       />
  //                     ))}
  //                   </Pie>

  //                   <Tooltip />
  //                   <Legend />
  //                 </PieChart>
  //               </ResponsiveContainer>
  //             </div>
  //           </div>

  //           {/* Interview Cards */}
  //           <div className="grid gap-6">
  //             {interviews.map((item) => (
  //               <div
  //                 key={item._id}
  //                 onClick={() => navigate(`/report/${item._id}`)}
  //                 className="bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer border border-gray-100 p-6"
  //               >
  //                 <div className="flex flex-col md:flex-row justify-between gap-6">

  //                   <div>
  //                     <h2 className="text-xl font-bold text-gray-800">
  //                       {item.job?.title || "Job Title"}
  //                     </h2>

  //                     <p className="text-gray-500 mt-1">
  //                       {item.job?.company || "Company"}
  //                     </p>

  //                     <p className="text-sm text-gray-400 mt-3">
  //                       Interviewed on{" "}
  //                       {new Date(item.createdAt).toLocaleDateString()}
  //                     </p>

  //                     <p className="text-sm text-gray-500 mt-1">
  //                       Stage Completed: {item.currentStage}
  //                     </p>
  //                   </div>

  //                   <div className="flex items-center gap-6">

  //                     <div className="text-right">
  //                       <p className="text-3xl font-bold text-emerald-600">
  //                         {item.overallRating ?? 0}/10
  //                       </p>

  //                       <p className="text-sm text-gray-500">
  //                         Overall Rating
  //                       </p>
  //                     </div>

  //                     <span
  //                       className={`px-4 py-2 rounded-full text-sm font-semibold ${
  //                         item.status === "completed"
  //                           ? "bg-emerald-100 text-emerald-700"
  //                           : "bg-yellow-100 text-yellow-700"
  //                       }`}
  //                     >
  //                       {item.status}
  //                     </span>
  //                   </div>

  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </>
  //       )}
  //     </div>
  //   </div>
  // );

  return (
  <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-emerald-50 py-3">
    <div className="w-[90vw] lg:w-[75vw] h-full mx-auto flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-full bg-white shadow hover:shadow-md"
        >
          <FaArrowLeft />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Interview History
          </h1>

          <p className="text-sm text-gray-500">
            Track your completed AI interviews
          </p>
        </div>
      </div>

      {interviews.length === 0 ? (
        <div className="flex-1 flex items-center justify-center bg-white rounded-2xl shadow">
          <p className="text-gray-500 text-lg">
            No completed interviews found.
          </p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-3 mb-3">
            <div className="bg-white rounded-xl shadow p-3">
              <p className="text-sm text-gray-500">
                Total Interviews
              </p>

              <h2 className="text-2xl font-bold text-emerald-600 mt-1">
                {interviews.length}
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow p-3">
              <p className="text-sm text-gray-500">
                Average Rating
              </p>

              <h2 className="text-2xl font-bold text-blue-600 mt-1">
                {averageRating}/10
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow p-3">
              <p className="text-sm text-gray-500">
                Completed
              </p>

              <h2 className="text-2xl font-bold text-green-600 mt-1">
                {pieData[0].value}
              </h2>
            </div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-3 mb-3">

            {/* Bar Chart */}
            <div className="bg-white rounded-xl shadow p-3">
              <h2 className="text-lg font-bold mb-2">
                Interview Ratings
              </h2>

              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={barData}>
                  <XAxis dataKey="interview" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Bar
                    dataKey="rating"
                    fill="#10B981"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-xl shadow p-3">
              <h2 className="text-lg font-bold mb-2">
                Interview Status
              </h2>

              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={60}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Interview Cards */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {interviews.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/report/${item._id}`)}
                className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-gray-100 p-3"
              >
                <div className="flex flex-col md:flex-row justify-between items-center gap-3">

                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {item.job?.title || "Job Title"}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {item.job?.company || "Company"}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Interviewed on{" "}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>

                    <p className="text-xs text-gray-500">
                      Stage Completed: {item.currentStage}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">

                    <div className="text-right">
                      <p className="text-xl font-bold text-emerald-600">
                        {item.overallRating ?? 0}/10
                      </p>

                      <p className="text-xs text-gray-500">
                        Overall Rating
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </div>

                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  </div>
);
}

export default InterviewHistory;