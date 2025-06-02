import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotresetPasswordReducer from "./slices/forgotresetPasswordSlice";
import messageReducer from "./slices/messageSlice";
import timelineReducer from "./slices/timelineSlice";
import skillReducer from "./slices/skillSlice";
import projectReducer from "./slices/projectSlice";
import applicationReducer from "./slices/applicationSlice";

export const store=configureStore({
    reducer:{
        user:userReducer,
        forgotPasword:forgotresetPasswordReducer,
        messages:messageReducer,
        timeline:timelineReducer,
        skill:skillReducer,
        project:projectReducer,
        application:applicationReducer

    }
})