//import HomePage from "./pages/HomePage";
import React, { useEffect } from "react";
import { BrowserRouter ,Routes,Route,  } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ManageSkill from "./pages/ManageSkill";
import ManageTimeline from "./pages/ManageTimeline";
import ManageProject from "./pages/ManageProject";
import ViewProject from "./pages/ViewProject";
import UpdateProject from "./pages/UpdateProject";
import { ToastContainer} from 'react-toastify';
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/userSlice";
import HomePage from "./pages/HomePage";
import { getAllMessages } from "./store/slices/messageSlice";
import { getAllTimeline } from "./store/slices/timelineSlice";
import { getAllProjects } from "./store/slices/projectSlice";
import { getAllSkills } from "./store/slices/skillSlice";
import { getAllApplications } from "./store/slices/applicationSlice";
import { DarkModeProvider } from "./context/DarkMode";
  

const App=()=>{
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getUser())
    dispatch(getAllMessages())
    dispatch(getAllTimeline())
    dispatch(getAllProjects())
    dispatch(getAllSkills())
    dispatch(getAllApplications())
  },[])
  return(
    <>
    <BrowserRouter basename="/dashboard">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/password/forgot" element={<ForgotPassword/>}/>
        <Route path="/password/reset/:token" element={<ResetPassword/>}/>
        <Route path="/manage/skills" element={<ManageSkill/>}/>
        <Route path="/manage/timelines" element={<ManageTimeline/>}/>
        <Route path="/manage/projects" element={<ManageProject/>}/>
        <Route path="/view/project/:id"element={<ViewProject/>}/>
        <Route path="/update/project/:id" element={<UpdateProject/>}/>
      </Routes>
      <ToastContainer position="bottom-right" theme="dark"/>
    </BrowserRouter>
    </>
  )
}

export default App