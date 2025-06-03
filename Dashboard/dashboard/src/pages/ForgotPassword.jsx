import { clearAllForgotPasswordErrors, forgotPassword } from "@/store/slices/forgotresetPasswordSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";


const ForgotPassword=()=>{
    const [email,setEmail]=useState("");
    const {loading,error,message}=useSelector((state)=>state.forgotPasword)
    const dispatch=useDispatch()
    const {isAuthenticated}=useSelector((state)=>state.user)
    const navigateTo=useNavigate()
    const handleForgotPassword=()=>{
        dispatch(forgotPassword(email))
    }
    useEffect(()=>{
        if(error){
            toast.error(error)
            dispatch(clearAllForgotPasswordErrors())
        }
        if(isAuthenticated){
            navigateTo("/")
        }
        if(message!==null){
           toast.success(message)
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
        <h2 className="text-white text-3xl font-bold text-center">Welcome Back</h2>
        <p className="text-gray-400 text-center mt-2">Forgot Password</p>

        <form className="mt-6">
          {/* Email Input */}
          <div>
            <label className="text-gray-400">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <Link to={"/login"} 
            className="text-blue-400 hover:underline">
              
            
            Remember Your Password?
            </Link>
          </div>

          

         
          {
            loading?(<LoadingButton content={"Waiting"}/>):
            (<motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300"
              onClick={handleForgotPassword}
            >
              Submit
            </motion.button>)
          }

          {/* Login Button */}
          
        </form>

        
       
      </motion.div>
    </div>
        </>
    )
}

export default ForgotPassword