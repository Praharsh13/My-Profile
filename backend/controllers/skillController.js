import { catchAsyncErrors } from "../Middleware/catchAsyncError.js";
import ErrorHandler from "../Middleware/errorMiddleware.js";
import { Skills } from "../models/skillsModel.js";
import { v2 as cloudinary } from "cloudinary";

export const add=catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Software picture is required",400))
    }
    const {image}=req.files;
    const {name,profiency,type}=req.body;
    const cloudinaryresponse=await cloudinary.uploader.upload(
        image.tempFilePath,
        {folder:"Skill IMAGE"}
    )
    if(!cloudinaryresponse || cloudinaryresponse.error){
        console.error(
            "Cloudinary error",
            cloudinaryresponse.error || "Unknown cloudinary error"
        )
    }

    const skill=await Skills.create({
        name,
        profiency,
        type,
        image:{
            public_id:cloudinaryresponse.public_id,
            url:cloudinaryresponse.secure_url
        }
    })

    res.status(200).json({
        success:true,
        message:"Skill added successfully",
        skill

    })
})    
export const getAll=catchAsyncErrors(async(req,res,next)=>{
    const skill=await Skills.find();
    res.status(200).json({
        success:true,
        message:"all skills",
        skill

    })
})

export const deleteSkill= catchAsyncErrors(async (req,res,next)=>{
    const {id}=req.params;
    const skill=await Skills.findById(id);
    if(!skill){
        return next(new ErrorHandler("Nothing to delete",400))
    }
    const skillimage=skill.image.public_id;
    await cloudinary.uploader.destroy(skillimage)
    await skill.deleteOne()
    res.status(200).json({
        success:true,
        message:"Deleted successfully",
        skill
    })
})

export const updateSkill=catchAsyncErrors(async (req,res,next)=>{
    const {id}=req.params;
    const newSkill={
        name:req.body.name,
        type:req.body.type,
        profiency:req.body.profiency
    }
    if(req.files && req.files.image){
        const image=req.files.image;
        const skill= await Skills.findById(id);
        const profileImageId=skill.image.public_id;
        await cloudinary.uploader.destroy(profileImageId)

        const imageRes=await cloudinary.uploader.upload(
            image.tempFilePath,{folder:"Skill IMAGE"}
        );

        newSkill.image={
            public_id: imageRes.public_id,
            url:imageRes.secure_url
        }

    }

    const skill= await Skills.findByIdAndUpdate(id,newSkill,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        message:"Successfully updated the skill",
        skill
    })
})