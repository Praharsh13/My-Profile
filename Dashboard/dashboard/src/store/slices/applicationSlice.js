import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice=createSlice({
    name:"application",
    initialState:{
        loading:false,
        applications:[],
        message:null,
        error:null
    },
    reducers:{
        getAllApplicationsRequest(state,action){
            state.loading=true
            state.error=null
            state.applications=[]

        },
        getAllApplicationsSuccess(state,action){
            state.loading=false
            state.error=null
            state.applications=action.payload

        },
        getAllApplicationsFailed(state,action){
            state.loading=false
            state.error=action.payload
            state.applications=state.applications

        },
        addNewApplicationsRequest(state,action){
            state.loading=true
            state.error=null
            state.message=null
            

        },
        addNewApplicationssuccess(state,action){
            state.loading=false
            state.error=null
            state.message=action.payload
            

        },
        addNewApplicationsFailed(state,action){
            state.loading=false
            state.error=action.payload
            state.message=null
            

        },
        deleteApplicationsRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
          },
          deleteApplicationssuccess(state, action) {
            state.error = null;
            state.loading = false;
            state.message = action.payload;
          },
          deleteApplicationsFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.message = null;
          },
          updateApplicationsRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
          },
          updateApplicationssuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
          },
          updateApplicationsFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.message = null;
          },
          resetApplicationsSlice(state, action) {
            state.error = null;
            state.applications = state.applications;
            state.message = null;
            state.loading = false;
          },
          clearAllErrors(state, action) {
            state.error = null;
            state.applications = state.applications;
          },
    }
})

export const addNewApplication = (data) => async (dispatch) => {
    dispatch(applicationSlice.actions.addNewApplicationsRequest());
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/software/add`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);
      console.log(response.data.message);
      dispatch(applicationSlice.actions.addNewApplicationssuccess(response.data.message));
      dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(applicationSlice.actions.addNewApplicationsFailed(error.response.data.message));
    }
  };
  
//   export const updateProject = (id, proficiency) => async (dispatch) => {
//     dispatch(applicationSlice.actions.updateApplicationsRequest());
//     try {
//       const response = await axios.put(
//         `http://localhost:3201/api/v1/project/updateproject/${id}`,
//         { proficiency },
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       dispatch(applicationSlice.actions.updateApplicationssuccess(response.data.message));
//       dispatch(applicationSlice.actions.clearAllErrors());
//     } catch (error) {
//       dispatch(applicationSlice.actions.updateApplicationsFailed(error.response.data.message));
//     }
//   };
  export const getAllApplications = () => async (dispatch) => {
    dispatch(applicationSlice.actions.getAllApplicationsRequest());
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/software/getallsoftware`,
        { withCredentials: true }
      );
      dispatch(applicationSlice.actions.getAllApplicationsSuccess(response.data.software));
      dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        applicationSlice.actions.getAllApplicationsFailed(error.response.data.message)
      );
    }
  };
  export const deleteApplication = (id) => async (dispatch) => {
    dispatch(applicationSlice.actions.deleteApplicationsRequest());
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/software/deletesoftware/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(applicationSlice.actions.deleteApplicationssuccess(response.data.message));
      dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(applicationSlice.actions.deleteApplicationsFailed(error.response.data.message));
    }
  };
  
  export const clearAllApplicationErrors = () => (dispatch) => {
    dispatch(applicationSlice.actions.clearAllErrors());
  };
  
  export const resetApplication = () => (dispatch) => {
    dispatch(applicationSlice.actions.resetApplicationsSlice());
  };
  
  export default applicationSlice.reducer;