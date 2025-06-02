import { catchAsyncErrors } from "../Middleware/catchAsyncError.js";
import ErrorHandler from "../Middleware/errorMiddleware.js";
import { Message } from "../models/messageModel.js";

//Creating controller for message for profile

export const sendMessage=catchAsyncErrors(async(req,res,next)=>{
    const {senderName,subject,message}=req.body;
    if(!senderName|| !subject || !message){
        return next(new ErrorHandler("Please fill the full form",400))
    }

    const data = await Message.create({senderName,subject,message})
    res.status(200).json({
        success:true,
        message:"Message sent",
        data
    })
})

// Creating controller to get all the messages

export const getAllMessage=catchAsyncErrors(async(req,res,next)=>{
    const messages=await Message.find()
    res.status(200).json({
        success:true,
        messages
    })
})

// Deleting the message

export const deleteMessage=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    const message=await Message.findById(id);
    if(!message){
        return next(new ErrorHandler("Message already deleted",400))
    }
    await message.deleteOne();
    res.status(200).json({
        success:true,
        message:"Deleted successfully"
    })

})