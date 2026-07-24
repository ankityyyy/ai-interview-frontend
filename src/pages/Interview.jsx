import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import { ServerUrl } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import maleVideo from "../assets/videos/male-ai.mp4";


function Interview() {
  const navigate = useNavigate();
  const { state } = useLocation();

const videoRef = useRef(null);

const [selectedVoice, setSelectedVoice] = useState(null);
const [subtitle, setSubtitle] = useState("");
const [isAIPlaying, setIsAIPlaying] = useState(false);

  const applicationId = state?.applicationId;
  const jobId = state?.jobId;

  const [loading, setLoading] = useState(true);

  const [interviewId, setInterviewId] = useState("");

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);

  const [currentStage, setCurrentStage] = useState("INTRO");

  useEffect(() => {
  const loadVoices = () => {
    const voices = speechSynthesis.getVoices();

    if (!voices.length) return;

    setSelectedVoice(voices[0]);
  };

  loadVoices();

  speechSynthesis.onvoiceschanged = loadVoices;
}, []);


const speakText = (text) => {
  if (!selectedVoice) return;

  speechSynthesis.cancel();

  const humanText = text
  .replace(/,/g, ", ... ")
  .replace(/\./g, ". ... ");

  const utterance = new SpeechSynthesisUtterance(humanText);

  utterance.voice = selectedVoice;

utterance.rate = 0.88;
utterance.pitch = 1.02;
utterance.volume = 1;

  utterance.onstart = () => {
    setIsAIPlaying(true);
    setSubtitle(text);

    videoRef.current?.play();
  };

  utterance.onend = () => {
    setIsAIPlaying(false);

    videoRef.current?.pause();
    videoRef.current.currentTime = 0;

    setSubtitle("");
  };

  speechSynthesis.speak(utterance);
};

useEffect(() => {
  if (!loading && question && selectedVoice) {
    speakText(question);
  }
}, [question, selectedVoice, loading]);

  useEffect(() => {
    startInterview();
  }, []);

  const startInterview = async () => {
    try {
      const res = await axios.post(
        `${ServerUrl}/interview/v1/start/${applicationId}`,
        {},
        {
          withCredentials: true,
        }
      );

      setInterviewId(res.data.interviewId);

      setQuestion(res.data.question);

      setLoading(false);
    } catch (err) {
      console.log(err);

      alert("Unable to start interview");

      navigate("/jobs");
    }
  };

  if (!applicationId) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Invalid Interview
      </div>
    );
  }
const handleSubmit = async () => {
  if (!answer.trim()) {
    alert("Please enter your answer.");
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(
      `${ServerUrl}/interview/v1/answer/${interviewId}`,
      {
        prevQuestion: question,
        answer,
        jobId,
      },
      {
        withCredentials: true,
      }
    );

    if (res.data.completed) {
      navigate("/history", {
        state: res.data,
      });
      return;
    }

    // Next Question
    setQuestion(res.data.question);
    setCurrentStage(res.data.currentStage);

    // Increase Question Number
    setQuestionNumber((prev) => prev + 1);

    // Clear textarea
    setAnswer("");

  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Starting AI Interview...
      </div>
    );
  }

  return (
  <div className="min-h-[50vh] bg-gradient-to-br from-emerald-50 via-white to-teal-100 py-5 px-4">

    <div className="max-w-4xl  mx-auto">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
      >
        <BsArrowLeft size={18} />
        <span className="text-base">Back</span>
      </button>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row h-[680px]">

        {/* LEFT SIDE */}
        <div className="lg:w-[32%] border-r p-5 bg-white flex flex-col">

          {/* AI Image */}
          {/* <img
            src="https://placehold.co/600x350"
            alt="AI Interviewer"
            className="w-full h-52 rounded-2xl object-cover"
          /> */}

          <div className="w-full rounded-2xl overflow-hidden shadow-lg">
  <video
    ref={videoRef}
    src={maleVideo}
    muted
    playsInline
    loop
    preload="auto"
    className="w-full h-52 object-cover"
/>
</div>

{subtitle && (
  <div className="mt-4 bg-gray-100 rounded-xl p-3">
    <p className="text-center text-sm text-gray-700">
      {subtitle}
    </p>
  </div>
)}

          {/* Status */}
          <div className="mt-5 bg-gray-50 rounded-2xl p-5 flex-1">

            <h3 className="text-xl font-bold mb-5">
              Interview Status
            </h3>

            <div className="space-y-5">

              <div>
                <p className="text-sm text-gray-500">
                  Current Stage
                </p>

                <p className="text-xl font-bold text-green-600 mt-1">
                  {currentStage}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Interview ID
                </p>

                <p className="text-xs break-all mt-1">
                  {interviewId}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Questions
                </p>

                <p className="text-xl font-semibold mt-1">
                  {questionNumber} / 17
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="lg:w-[68%] p-6 flex flex-col">

          <h1 className="text-3xl font-bold text-green-600">
            AI Smart Interview
          </h1>

          <p className="text-gray-500 mt-1">
            Answer naturally. You can type or speak.
          </p>

          {/* Question */}
          <div className="mt-5 border rounded-2xl p-5 bg-gray-50">

            <p className="text-sm text-gray-500">
              Current Question
            </p>

            <h2 className="text-2xl font-semibold mt-2 leading-9">
              {question}
            </h2>

          </div>

          {/* Answer */}
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here..."
            className="mt-5 h-64 border rounded-2xl p-5 text-base outline-none resize-none focus:ring-2 focus:ring-green-500"
          />

          {/* Buttons */}
          <div className="flex items-center gap-3 mt-5">

            {/* <button
              className="w-12 h-12 rounded-full bg-black text-white text-lg hover:bg-gray-800"
            >
              🎤
            </button> */}

            <button
    disabled={isAIPlaying}
    className="w-12 h-12 rounded-full bg-black text-white disabled:bg-gray-400"
>
    🎤
</button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-base font-semibold transition"
            >
              {loading ? "Submitting..." : "Submit Answer"}
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}

export default Interview;