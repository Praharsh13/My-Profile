import {createSlice} from "@reduxjs/toolkit";
import axios from 'axios'

const timelineSlice=createSlice({
    name:"timeline",
    initialState:{
        loading:false,
        timeline:[],
        error:null,
        message:null
    },
    reducers:{
        getAllTimelineRequest(state,action){
           
            state.error=null,
            state.timeline=[],
            state.loading=true

        },
        getAllTimelineSuccess(state,action){
           
            state.error=null,
            state.timeline=action.payload,
            state.loading=false

        },
        getAllTimelineFailed(state,action){
           
            state.error=action.payload,
            state.timeline=state.timeline,
            state.loading=false

        },

        deleteTimelineRequest(state,action){
           
            state.error=null,
            state.message=null,
            state.loading=true

        },
        deleteTimelineSuccess(state,action){
           
            state.error=null,
            state.message=action.payload,
            state.loading=false

        },
        deleteTimelineFailed(state,action){
           
            state.error=action.payload,
            state.message=null,
            state.loading=false

        },
        addTimelineRequest(state,action){
           
            state.error=null,
            state.message=null,
            state.loading=true

        },
        addTimelineSuccess(state,action){
           
            state.error=null,
            state.message=action.payload,
            state.loading=false

        },
        addTimelineFailed(state,action){
           
            state.error=action.payload,
            state.message=null,
            state.loading=false

        },
        resetTimelineSlice(state,action){
            state.error=null,
            state.message=null,
            state.timeline=state.timeline,
            state.loading=false

        },
        clearAllErrors(state,action){
            state.error=null,
            state.timeline=state.timeline
        }
    }
})

export const getAllTimeline=()=>async(dispatch)=>{
    dispatch(timelineSlice.actions.getAllTimelineRequest())
    try{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/timeline/allTimeline`,
        {withCredentials:true})
        dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timeline))
        dispatch(timelineSlice.actions.clearAllErrors())
    }catch(error){
        dispatch(timelineSlice.actions.getAllTimelineFailed(error.response.data.message))
    }
}

export const deleteTimeline=(id)=>async(dispatch)=>{
    dispatch(timelineSlice.actions.deleteTimelineRequest())
    try{
        const {data}=await axios.delete(`${import.meta.env.VITE_API_URL}/timeline/delete/${id}`,
        {withCredentials:true})
        dispatch(timelineSlice.actions.deleteTimelineSuccess(data.message))
        dispatch(timelineSlice.actions.clearAllErrors())
    }catch(error){
        dispatch(timelineSlice.actions.deleteTimelineFailed(error?.response?.data?.message || error?.message || "Something went wrong"
        ))
    }

}

export const addNewTimeline=(timeLinedata)=>async(dispatch)=>{
    dispatch(timelineSlice.actions.addTimelineRequest())
    try{
        const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/timeline/add`,
        timeLinedata,
        {withCredentials:true, headers:{"Content-Type":"application/json"}})
        dispatch(timelineSlice.actions.addTimelineSuccess(data.message))
        dispatch(timelineSlice.actions.clearAllErrors())
    }catch(error){
        dispatch(timelineSlice.actions.addTimelineFailed(error.response.data.message))
    }

}

export const clearAllTimelineErrors=()=>(dispatch)=>{
    dispatch(timelineSlice.actions.clearAllErrors())
}

export const resetAllTimelineSlice=()=>(dispatch)=>{
    dispatch(timelineSlice.actions.resetTimelineSlice())
}

export default timelineSlice.reducer;