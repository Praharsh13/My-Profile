import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice=createSlice({
    name:"project",
    initialState:{
        loading:false,
        projects:[],
        message:null,
        error:null
    },
    reducers:{
        getAllProjectsRequest(state,action){
            state.loading=true
            state.error=null
            state.projects=[]

        },
        getAllProjectsSuccess(state,action){
            state.loading=false
            state.error=null
            state.projects=action.payload

        },
        getAllProjectsFailed(state,action){
            state.loading=false
            state.error=action.payload
            state.projects=state.projects

        },
        addNewProjectsRequest(state,action){
            state.loading=true
            state.error=null
            state.message=null
            

        },
        addNewProjectssuccess(state,action){
            state.loading=false
            state.error=null
            state.message=action.payload
            

        },
        addNewProjectsFailed(state,action){
            state.loading=false
            state.error=action.payload
            state.message=null
            

        },
        deleteProjectsRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
          },
          deleteProjectssuccess(state, action) {
            state.error = null;
            state.loading = false;
            state.message = action.payload;
          },
          deleteProjectsFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.message = null;
          },
          updateProjectsRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
          },
          updateProjectssuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
          },
          updateProjectsFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.message = null;
          },
          resetProjectsSlice(state, action) {
            state.error = null;
            state.projects = state.projects;
            state.message = null;
            state.loading = false;
          },
          clearAllErrors(state, action) {
            state.error = null;
            state.projects = state.projects;
          },
    }
})

export const addNewProject = (data) => async (dispatch) => {
    dispatch(projectSlice.actions.addNewProjectsRequest());
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/project/addproject`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);
      console.log(response.data.message);
      dispatch(projectSlice.actions.addNewProjectssuccess(response.data.message));
      dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(projectSlice.actions.addNewProjectsFailed(error.response.data.message));
    }
  };
  
  export const updateProject = (id,formData) => async (dispatch) => {
    dispatch(projectSlice.actions.updateProjectsRequest());
    console.log(formData)
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/project/updateproject/${id}`,
         formData ,
        
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(projectSlice.actions.updateProjectssuccess(response.data.message));
      dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(projectSlice.actions.updateProjectsFailed(error?.response?.data?.message || error.message || "Update failed"));
    }
  };
  export const getAllProjects = () => async (dispatch) => {
    dispatch(projectSlice.actions.getAllProjectsRequest());
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/project/getallproject`,
        { withCredentials: true }
      );
      dispatch(projectSlice.actions.getAllProjectsSuccess(response.data.project));
      dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        projectSlice.actions.getAllProjectsFailed(error.response.data.message)
      );
    }
  };
  export const deleteProject = (id) => async (dispatch) => {
    dispatch(projectSlice.actions.deleteProjectsRequest());
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/project/deleteproject/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(projectSlice.actions.deleteProjectssuccess(response.data.message));
      dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(projectSlice.actions.deleteProjectsFailed(error.response.data.message));
    }
  };
  
  export const clearAllProjectErrors = () => (dispatch) => {
    dispatch(projectSlice.actions.clearAllErrors());
  };
  
  export const resetProjectSlice = () => (dispatch) => {
    dispatch(projectSlice.actions.resetProjectsSlice());
  };
  
  export default projectSlice.reducer;