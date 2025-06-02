import { catchAsyncErrors } from "../Middleware/catchAsyncError.js";
import ErrorHandler from "../Middleware/errorMiddleware.js";
import { Software } from "../models/softwareModel.js";
import { v2 as cloudinary } from "cloudinary";

export const add=catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Software picture is required",400))
    }
    const {image}=req.files;
    const {softwarename}=req.body;
    const cloudinaryresponse=await cloudinary.uploader.upload(
        image.tempFilePath,
        {folder:"SOFTWARE IMAGE"}
    )
    if(!cloudinaryresponse || cloudinaryresponse.error){
        console.error(
            "Cloudinary error",
            cloudinaryresponse.error || "Unknown cloudinary error"
        )
    }
    const softwareapp= await Software.create({
        softwarename,
        image:{
            public_id:cloudinaryresponse.public_id,
            url:cloudinaryresponse.secure_url
        }
    })

    res.status(200).json({
        success:true,
        message:"Created succesfully",
        softwareapp
    })
})

export const getAllSoftware=catchAsyncErrors(async (req,res,next)=>{
    // const {id}=req.params;
    // if(!id){
    //     return next(new ErrorHandler("nothing to delete",400))
    // }

    const software= await Software.find();

    res.status(200).json({
        success:true,
        message:"All softwares are these",
        software
    })

})

export const deleteSoftware= catchAsyncErrors(async (req,res,next)=>{
    const {id}=req.params;
    const software=await Software.findById(id);
    if(!software){
        return next(new ErrorHandler("Nothing to delete",400))
    }
    const softwareimage=software.image.public_id;
    await cloudinary.uploader.destroy(softwareimage)
    await software.deleteOne()
    res.status(200).json({
        success:true,
        message:"Deleted successfully",
        software
    })
})