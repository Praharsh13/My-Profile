//importing express

import express from "express";

//Import Router
import messageRouter from "./routers/messageRouter.js";
import userRouter from "./routers/userRouter.js"
import timelineRouter from "./routers/timelineRouter.js"
import softwareRouter from "./routers/softwareRouter.js"
import skillRouter from "./routers/skillRouter.js"
import projectRouter from "./routers/projectRouter.js"

//Import database connection
import dbConnection from "./database/dbConnect.js";

//Import errorHandle middleware
import { errorMiddleware } from "./Middleware/errorMiddleware.js";

//IMPORTING ENV
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";

import fileUpload from "express-fileupload";


const app=express();

//fetching value from env file

dotenv.config({path:"./config/config.env"});

//MIDDLEWARE TO CONNECT BACKEND AND FRONTEND
app.use(
    cors({
        origin:[process.env.PORTFOLIO_URL,process.env.DASHBOARD_URL],
        methods:["GET","POST","DELETE","PUT"],
        credentials:true
    })
)
//use to fetch cookie from browser when created
app.use(cookieParser());
//use to parse the incoming request in json format that can be access by req.body
app.use(express.json());
//use to parse the the body in key value pair
app.use(express.urlencoded({extended:true}))
//use to upload the file which can be use to send to frontend
app.use(fileUpload(
    {
        useTempFiles:true,
        tempFileDir:"/tmp/"
    }
))

app.use("/api/v1/message",messageRouter);
app.use("/api/v1/user",userRouter)
app.use("/api/v1/timeline",timelineRouter)
app.use("/api/v1/software",softwareRouter)
app.use("/api/v1/skill",skillRouter)
app.use("/api/v1/project",projectRouter)

dbConnection();
//Using error middleware to take error
app.use(errorMiddleware);



export default app;

// In this file we are creating the instance of express