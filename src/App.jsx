import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from "./pages/Auth";
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewPage from './pages/InterviewPage'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Apply from "./pages/Apply";
import ScreeningResult from "./pages/ScreeningResult";
import Interview from "./pages/Interview";




export const ServerUrl  = "https://ai-interviewbackend-p6xa.onrender.com"

function App() {

  const dispatch = useDispatch()
  useEffect(()=>{
    const getUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/user/v1/me", {withCredentials:true})
        dispatch(setUserData(result.data))
      } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
      }
    }
    getUser()

  },[dispatch])
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path="/jobs" element={<Jobs />} />
      <Route path='/interview' element={<Interview/>}/>
      <Route path='/history' element={<InterviewHistory/>}/>
      <Route path='/pricing' element={<Pricing/>}/>
      <Route path="/apply" element={<Apply />} />
      <Route path="/screening-result" element={<ScreeningResult />}/>
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path='/report/:id' element={<InterviewReport/>}/>



    </Routes>
  )
}

export default App
