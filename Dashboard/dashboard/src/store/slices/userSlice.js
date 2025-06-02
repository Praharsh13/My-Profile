import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const userSlice=createSlice({
    name:"user",
    initialState:{
        loading:false,
        user:{},
        isAuthenticated:false,
        error:null,
        message:null,
        isUpdated:false
    },
    reducers:{
        loginRequest(state,action){
            state.loading=true;
            state.isAuthenticated=false;
            state.user={};
            state.error=null;
        },
        loginSuccess(state,action){
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload;
            state.error=null;
        },
        loginFailed(state,action){
            state.loading=false;
            state.isAuthenticated=false;
            state.user={};
            state.error=action.payload;
        },

        loginUserRequest(state,action){
            state.loading=true;
            state.isAuthenticated=false;
            state.user={};
            state.error=null;
        },
        loginUserSuccess(state,action){
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload;
            state.error=null;
        },
        loginUserFailed(state,action){
            state.loading=false;
            state.isAuthenticated=false;
            state.user={};
            state.error=action.payload;
        },

        //fOR LOGOUT
        logoutUserSuccess(state,action){
            state.loading=false;
            state.isAuthenticated=false;
            state.user={};
            state.error=null;
            state.message=action.payload.message;
        },
        logoutUserFailed(state,action){
            state.loading=false;
            state.isAuthenticated=false;
            state.user={};
            state.error=action.payload;
        },
        //update password function
        updatePasswordRequest(state,action){
            state.loading=true,
            state.isUpdated=false,
            state.message=null,
            state.error=null

        },
        updatePasswordSuccess(state,action){
            state.loading=false,
            state.isUpdated=true,
            state.message=action.payload,
            state.error=null

        },
        updatePasswordFailed(state,action){
            state.loading=false,
            state.isUpdated=false,
            state.message=null,
            state.error=action.payload

        },
        //Update profile request
        updateProfileRequest(state,action){
            state.loading=true,
            state.isUpdated=false,
            state.message=null,
            state.error=null

        },
        updateProfileSuccess(state,action){
            state.loading=false,
            state.isUpdated=true,
            state.message=action.payload,
            state.error=null

        },
        updateProfileFailed(state,action){
            state.loading=false,
            state.isUpdated=false,
            state.message=null,
            state.error=action.payload

        },
        updateProfileResetAfterUpdate(state,action){
            state.error=null,
            state.isUpdated=false,
            state.message=null
        },
        //clearing the message
        clearAllErrors(state,action){
            state.error=null;
            state.user=state.user;
        }
    }
})

export const login=(email,password)=>async (dispatch)=>{
    dispatch(userSlice.actions.loginRequest());
    try{
        const {data}=await axios.post(
            `${import.meta.env.VITE_API_URL}/user/login`,
            {email,password},
            {withCredentials:true,headers:{"Content-Type":"application/json"}}
        )
        dispatch(userSlice.actions.loginSuccess(data.user));
        dispatch(userSlice.actions.clearAllErrors())
    }
        catch(error){
            dispatch(userSlice.actions.loginFailed(error.response.data.message))

        }
    
}
//to get the user and stay the user
export const getUser=()=>async (dispatch)=>{
    dispatch(userSlice.actions.loginUserRequest());
    try{
        const {data}=await axios.get(
            `${import.meta.env.VITE_API_URL}/user/getuser`,
            
            {withCredentials:true}
        )
        dispatch(userSlice.actions.loginUserSuccess(data.user));
        dispatch(userSlice.actions.clearAllErrors())
    }
        catch(error){
            dispatch(userSlice.actions.loginUserFailed(error.response?.data?.message || error.message || "An unexpected error occurred"))

        }
    
}

//logout function
export const logout=()=>async (dispatch)=>{
    
    try{
        const {data}=await axios.post(
            `${import.meta.env.VITE_API_URL}/user/logout`,
           
            {withCredentials:true}
        )
        dispatch(userSlice.actions.logoutUserSuccess(data.message));
        dispatch(userSlice.actions.clearAllErrors())
    }
        catch(error){
            dispatch(userSlice.actions.logoutUserFailed(error.response.data.message))

        }
    
}

//update password
export const updatePassword=(currentPassword,newPassword,confirmNewPassword)=>async(dispatch)=>{
    dispatch(userSlice.actions.updatePasswordRequest());
    try{
        const {data}=await axios.put(
            `${import.meta.env.VITE_API_URL}/user/updatePassword`,
            {currentPassword,newPassword,confirmNewPassword},
            {
                withCredentials:true,
                headers:{"Content-Type":"application/json"}
            }
        )
        dispatch(userSlice.actions.updatePasswordSuccess(data.message))
        dispatch(userSlice.actions.clearAllErrors())
    }
    catch(error){
        dispatch(userSlice.actions.updatePasswordFailed(error.response?.data?.message || error.message || "An unexpected error occurred"))

    }
}
//update profile
export const updateProfile=(newdata)=>async(dispatch)=>{
    dispatch(userSlice.actions.updateProfileRequest());
    try{
        const {data}=await axios.put(
            `${import.meta.env.VITE_API_URL}/user/updateProfile`,
            newdata,
            {
                withCredentials:true,
                headers:{"Content-Type":"multipart/form-data"}
            }
        )
        dispatch(userSlice.actions.updateProfileSuccess(data.message))
        dispatch(userSlice.actions.clearAllErrors())
    }
    catch(error){
        dispatch(userSlice.actions.updateProfileFailed(error.response?.data?.message || error.message || "An unexpected error occurred"))

    }
}
//reset profile
export const resetProfile=()=>(dispatch)=>{
    dispatch(userSlice.actions.updateProfileResetAfterUpdate())
}
export const clearAllUserErrors=()=>(dispatch)=>{
    dispatch(userSlice.actions.clearAllErrors())
}


export default userSlice.reducer