import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAllUserErrors, login } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import LoadingButton from "./sub-folder/loader";

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const {loading,isAuthenticated,error}=useSelector((state)=>state.user)
  console.log(loading)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePassword = () => setPasswordVisible(!passwordVisible);
  console.log("hello")
  const dispatch=useDispatch();
  const navigateTo=useNavigate();

  const handleLogin=(e)=>{
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password!");
      return;
    }
    
    dispatch(login(email,password))
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllUserErrors())

    }
    if(isAuthenticated){
      navigateTo("/")
    }
  },[dispatch,isAuthenticated,error,loading])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-white text-3xl font-bold text-center">Welcome Back</h2>
        <p className="text-gray-400 text-center mt-2">Login to continue</p>

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

          {/* Password Input */}
          <div className="mt-4 relative">
            <label className="text-gray-400">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-12 text-gray-400 hover:text-gray-200"
            >
              {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {/* Forgot Password & Submit */}
          <div className="flex justify-between items-center mt-4">
            <Link to={"/password/forgot"} 
            className="text-blue-400 hover:underline">
              
            
            Forgot Password?
            </Link>
          </div>
          {
            loading?(<LoadingButton content={"Logging In"}/>):
            (<motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300"
              onClick={handleLogin}
            >
              Login
            </motion.button>)
          }

          {/* Login Button */}
          
        </form>

        {/* Sign Up */}
        <p className="text-gray-400 text-center mt-6">
          Don't have an account?{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
}


