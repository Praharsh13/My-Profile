import {createSlice} from "@reduxjs/toolkit";
import axios from 'axios'

const messageSlice=createSlice({
    name:"messages",
    initialState:{
        loading:false,
        messages:[],
        error:null,
        message:null
    },
    reducers:{
        getAllMessagesRequest(state,action){
           
            state.error=null,
            state.messages=[],
            state.loading=true

        },
        getAllMessagesSuccess(state,action){
           
            state.error=null,
            state.messages=action.payload,
            state.loading=false

        },
        getAllMessagesFailed(state,action){
           
            state.error=action.payload,
            state.messages=state,
            state.loading=false

        },

        deleteMessagesRequest(state,action){
           
            state.error=null,
            state.message=null,
            state.loading=true

        },
        deleteMessagesSuccess(state,action){
           
            state.error=null,
            state.message=action.payload,
            state.loading=false

        },
        deleteMessagesFailed(state,action){
           
            state.error=action.payload,
            state.message=null,
            state.loading=false

        },
        resetMessageSlice(state,action){
            state.error=null,
            state.message=null,
            state.messages=state.messages,
            state.loading=false

        },
        clearAllErrors(state,action){
            state.error=null,
            state.messages=state.messages
        }
    }
})

export const getAllMessages=()=>async(dispatch)=>{
    dispatch(messageSlice.actions.getAllMessagesRequest())
    try{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/message/allmessage`,
        {withCredentials:true})
        dispatch(messageSlice.actions.getAllMessagesSuccess(data.messages))
        dispatch(messageSlice.actions.clearAllErrors())
    }catch(error){
        dispatch(messageSlice.actions.getAllMessagesFailed(error.response.data.message))
    }
}

export const deleteMessage=(id)=>async(dispatch)=>{
    dispatch(messageSlice.actions.deleteMessagesRequest())
    try{
        const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/message/deleteMessage/${id}`,
        {withCredentials:true})
        dispatch(messageSlice.actions.deleteMessagesSuccess(data.message))
        dispatch(messageSlice.actions.clearAllErrors())
    }catch(error){
        dispatch(messageSlice.actions.deleteMessagesFailed(error.response.data.message))
    }

}

export const clearAllMessageErrors=()=>(dispatch)=>{
    dispatch(messageSlice.actions.clearAllErrors())
}

export const resetMessagesSlice=()=>(dispatch)=>{
    dispatch(messageSlice.actions.resetMessageSlice())
}

export default messageSlice.reducer;