import { catchAsyncErrors } from "../Middleware/catchAsyncError.js";
import { Timeline } from "../models/timelineModel.js";
import ErrorHandler from "../Middleware/errorMiddleware.js";

//Making timeline controller

//Post the timeline
export const postTimeline=catchAsyncErrors(async(req,res,next)=>{
     const {title,description,from,to,location,contenttype}=req.body;
     const newTimeline= await Timeline.create({
        title,
        description,
        timeline:{from,to},
        location,
        contenttype

     })
     
     res.status(200).json({
        success:true,
        message:"Timeline Added",
        newTimeline
     })

})

export const deleteTimeline=catchAsyncErrors(async (req,res,next)=>{
    const {id}=req.params;
    
    const timeline=await Timeline.findById(id)
    if(!timeline){
        return next(new ErrorHandler("Timeline not found",400))

    }
    console.log(timeline)
    await timeline.deleteOne();
    res.status(200).json({
        success:true,
        message:"timeline deleted"
    })

})

export const allTimeline=catchAsyncErrors(async(req,res,next)=>{
    const timeline=await Timeline.find();
    res.status(200).json({
        success:true,
        message:"All the timelines are here",
        timeline,
        
    })
})