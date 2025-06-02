import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const forgotResetPasswordSlice=createSlice({
    name:"forgotPassword",
    initialState:{
        loading:false,
        error:null,
        message:null
    },
    reducers:{
        forgotPasswordRequest(state,action){
            state.loading=true,
            state.error=null,
            state.message=null
        },
        forgotPasswordSuccess(state,action){
            state.loading=false,
            state.error=null,
            state.message=action.payload
        },
        forgotPasswordFailed(state,action){
            state.loading=false,
            state.error=action.payload,
            state.message=null
        },
        resetPasswordRequest(state,action){
            state.loading=true,
            state.error=null,
            state.message=null
        },
        resetPasswordSuccess(state,action){
            state.loading=false,
            state.error=null,
            state.message=action.payload
        },
        resetPasswordFailed(state,action){
            state.loading=false,
            state.error=action.payload,
            state.message=null
        },
        clearAllErrors(state,action){
            state.error=null,
            state=state
        }
    }
})

export const forgotPassword=(email)=>async(dispatch)=>{
    dispatch(forgotResetPasswordSlice.actions.forgotPasswordRequest())
    try{
        const data=await axios.post(`${import.meta.env.VITE_API_URL}/user/password/forgotpassword`,
        {email},
        {
            withCredentials:true, header:{"Content-Type":"application/json"}
        })
        console.log("Full response data:", data);
        dispatch(forgotResetPasswordSlice.actions.forgotPasswordSuccess(data.data.message))
        console.log(data.data.message)
        dispatch(forgotResetPasswordSlice.actions.clearAllErrors)

    }catch(error){
         dispatch(forgotResetPasswordSlice.actions.forgotPasswordFailed(error.response?.data?.message || error.message || "An unexpected error occurred"))
    }
}

export const resetPassword=(token,password,confirmNewPassword)=>async(dispatch)=>{
    dispatch(forgotResetPasswordSlice.actions.resetPasswordRequest())
    try{
        const data=await axios.put(`${import.meta.env.VITE_API_URL}/user/password/reset/${token}`,
        {password,confirmNewPassword},
        {
            withCredentials:true, header:{"Content-Type":"application/json"}
        })
        dispatch(forgotResetPasswordSlice.actions.resetPasswordSuccess(data.data.message))
        dispatch(forgotResetPasswordSlice.actions.clearAllErrors)

    }catch(error){
         dispatch(forgotResetPasswordSlice.actions.resetPasswordFailed(error.response?.data?.message || error.message || "An unexpected error occurred"))
    }
}

export const clearAllForgotPasswordErrors=()=>(dispatch)=>{
    dispatch(forgotResetPasswordSlice.actions.clearAllErrors())
}

export default forgotResetPasswordSlice.reducer