import { catchAsyncErrors } from "../Middleware/catchAsyncError.js";
import ErrorHandler from "../Middleware/errorMiddleware.js";
import { Project } from "../models/projectModel.js";
import { v2 as cloudinary } from "cloudinary";

export const addProject=catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Project picture is required",400))
    }
    const {projectImage}=req.files;
    const {title,description,gitRepoLink,technologies,deployed,projectLink}=req.body;
    const cloudinaryresponse=await cloudinary.uploader.upload(
        projectImage.tempFilePath,
        {folder:"Project IMAGE"}
    )
    if(!cloudinaryresponse || cloudinaryresponse.error){
        console.error(
            "Cloudinary error",
            cloudinaryresponse.error || "Unknown cloudinary error"
        )
    }

    const project=await Project.create({
        title,
        description,
        gitRepoLink,
        technologies,
        deployed,
        projectLink,
        projectImage:{
            public_id:cloudinaryresponse.public_id,
            url:cloudinaryresponse.secure_url
        }
    })

    res.status(200).json({
        success:true,
        message:"Project added successfully",
        project

    })
})    
export const getAllProject=catchAsyncErrors(async(req,res,next)=>{
    const project=await Project.find();
    res.status(200).json({
        success:true,
        message:"all Projects",
        project

    })
})

export const deleteProject= catchAsyncErrors(async (req,res,next)=>{
    const {id}=req.params;
    const project=await Project.findById(id);
    if(!project){
        return next(new ErrorHandler("Nothing to delete",400))
    }
    const projectimage=project.projectImage.public_id;
    await cloudinary.uploader.destroy(projectimage)
    await project.deleteOne()
    res.status(200).json({
        success:true,
        message:"Deleted successfully",
        project
    })
})

export const updateProject=catchAsyncErrors(async (req,res,next)=>{
    const {id}=req.params;
    const newProject={
        title:req.body.title,
        description:req.body.description,
        getRepoLink:req.body.getRepoLink,
        technologies:req.body.technologies,
        deployed:req.body.deployed,
        projectLink:req.body.projectLink
    }
    if(req.files && req.files.projectImage){
        const projectImage=req.files.projectImage;
        const project= await Project.findById(id);
        const projectImageId=project.projectImage.public_id;
        await cloudinary.uploader.destroy(projectImageId)

        const imageRes=await cloudinary.uploader.upload(
            projectImage.tempFilePath,{folder:"Project IMAGE"}
        );

        newProject.projectImage={
            public_id: imageRes.public_id,
            url:imageRes.secure_url
        }

    }

    const project= await Project.findByIdAndUpdate(id,newProject,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        message:"Successfully updated the project",
        project
    })
})

export const getProject=catchAsyncErrors(async (req,res,next)=>{
    console.log("I am working")
    const {id}=req.params;
    console.log(id);
    const project= await Project.findById(id);
    res.status(200).json({
        success:true,
        message:"Project detail",
        project
    })
})