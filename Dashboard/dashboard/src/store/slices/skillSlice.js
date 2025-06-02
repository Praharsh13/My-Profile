import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice=createSlice({
    name:"skill",
    initialState:{
        loading:false,
        skills:[],
        message:null,
        error:null
    },
    reducers:{
        getAllSkillsRequest(state,action){
            state.loading=true
            state.error=null
            state.skills=[]

        },
        getAllSkillsSuccess(state,action){
            state.loading=false
            state.error=null
            state.skills=action.payload

        },
        getAllSkillsFailed(state,action){
            state.loading=false
            state.error=action.payload
            state.skills=state.skills

        },
        addNewSkillRequest(state,action){
            state.loading=true
            state.error=null
            state.message=null
            

        },
        addNewSkillSuccess(state,action){
            state.loading=false
            state.error=null
            state.message=action.payload
            

        },
        addNewSkillFailed(state,action){
            state.loading=false
            state.error=action.payload
            state.message=null
            

        },
        deleteSkillRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
          },
          deleteSkillSuccess(state, action) {
            state.error = null;
            state.loading = false;
            state.message = action.payload;
          },
          deleteSkillFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.message = null;
          },
          updateSkillRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
          },
          updateSkillSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
          },
          updateSkillFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.message = null;
          },
          resetSkillSlice(state, action) {
            state.error = null;
            state.skills = state.skills;
            state.message = null;
            state.loading = false;
          },
          clearAllErrors(state, action) {
            state.error = null;
            state.skills = state.skills;
          },
    }
})

export const addNewSkill = (data) => async (dispatch) => {
    dispatch(skillSlice.actions.addNewSkillRequest());
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/skill/addskill`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);
      console.log(response.data.message);
      dispatch(skillSlice.actions.addNewSkillSuccess(response.data.message));
      dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(skillSlice.actions.addNewSkillFailed(error.response.data.message));
    }
  };
  
  export const updateSkill = (id, proficiency) => async (dispatch) => {
    dispatch(skillSlice.actions.updateSkillRequest());
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/skill/updateskill/${id}`,
        { profiency:proficiency },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(skillSlice.actions.updateSkillSuccess(response.data.message));
      dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(skillSlice.actions.updateSkillFailed(error.response?.data?.message || "Something went wrong"));
    }
  };
  export const getAllSkills = () => async (dispatch) => {
    dispatch(skillSlice.actions.getAllSkillsRequest());
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/skill/getallskill`,
        { withCredentials: true }
      );
      dispatch(skillSlice.actions.getAllSkillsSuccess(response.data.skill));
      dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        skillSlice.actions.getAllSkillsFailed(error.response.data.message)
      );
    }
  };
  export const deleteSkill = (id) => async (dispatch) => {
    dispatch(skillSlice.actions.deleteSkillRequest());
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/skill/deleteskill/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(skillSlice.actions.deleteSkillSuccess(response.data.message));
      dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(skillSlice.actions.deleteSkillFailed(error.response.data.message));
    }
  };
  
  export const clearAllSkillErrors = () => (dispatch) => {
    dispatch(skillSlice.actions.clearAllErrors());
  };
  
  export const resetSkillSlice = () => (dispatch) => {
    dispatch(skillSlice.actions.resetSkillSlice());
  };
  
  export default skillSlice.reducer;