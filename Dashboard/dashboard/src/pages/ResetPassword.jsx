import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import { resetPassword,clearAllForgotPasswordErrors } from "@/store/slices/forgotresetPasswordSlice";
import LoadingButton from "./sub-folder/loader";
import { getUser } from "@/store/slices/userSlice";



const ResetPassword=()=>{
    const {token}=useParams()
    const [password,setPassword]=useState("")
    const [confirmNewPassword,setConfirmNewPassword]=useState("")
    const {loading,error,message}=useSelector((state)=>state.forgotPasword)
    const dispatch=useDispatch()
    const {isAuthenticated}=useSelector((state)=>state.user)
    const navigateTo=useNavigate()

    const handleResetPassword=()=>{
        dispatch(resetPassword(token,password,confirmNewPassword))
    }

    useEffect(()=>{
        if(error){
            toast.error(error)
            dispatch(clearAllForgotPasswordErrors())
        }
        if(isAuthenticated){
            navigateTo("/dashboard")
        }
        if(message!==null){
           toast.success(message)
           dispatch(getUser())
        }
    },[dispatch,isAuthenticated,error,loading])

    
    return (
        <>
         <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-white text-3xl font-bold text-center">Welcome Praharsh</h2>
        <p className="text-gray-400 text-center mt-2">Reset Password</p>

        <form className="mt-6">
          {/* Password Input */}
          <div>
            <label className="text-gray-400">Password</label>
            <input
              type="password"
              
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>


          <div>
            <label className="text-gray-400">New Password</label>
            <input
              type="confirmNewPassword"
              
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmNewPassword}
              onChange={(e)=>setConfirmNewPassword(e.target.value)}
            />
          </div>

          
          

         
          {
            loading?(<LoadingButton content={"Reseting"}/>):
            (<motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300"
              onClick={handleResetPassword}
            >
              Reset Password
            </motion.button>)
          }

          {/* Login Button */}
          
        </form>

        
       
      </motion.div>
    </div>
        </>
    )
}

export default ResetPassword