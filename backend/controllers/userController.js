import { catchAsyncErrors } from "../Middleware/catchAsyncError.js";
import ErrorHandler from "../Middleware/errorMiddleware.js";
import { User } from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";
import { SendEmail } from "../utils/sendEmail.js";
import crypto from 'crypto'

export const register= catchAsyncErrors( async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Avatar and Resume are required"))
    }
    // uploading file in cloudinary
    const {avatar,resume}=req.files;
   
    const cloudAvtar=await cloudinary.uploader.upload(
        avatar.tempFilePath,{folder:"Avatar", resource_type: "raw"}
    );
    if(!cloudAvtar || cloudAvtar.error){
        console.error(
            "Cloudinary Error :", cloudAvtar.error || "Unknown cloud error"
        )
    }

    const cloudResume=await cloudinary.uploader.upload(
        resume.tempFilePath,{folder:"Resume", resource_type: "raw", filename_override: "Praharsh_Resume",
        use_filename: true, unique_filename: false,type: "upload"}
    );
    if(!cloudResume || cloudResume.error){
        console.error(
            "Cloudinary Error :", cloudResume.error || "Unknown cloud error"
        )
    }
    console.log(avatar,resume)

    const { userName, password, email, portfolioURL, githubURL,linkInURL, contact , aboutMe,facebookURL,instagramURL,xURL}= req.body;
    console.log(userName)
    const user=await User.create({
        userName,
        password,
        email, 
        portfolioURL, 
        githubURL,
        linkInURL, 
        contact , 
        aboutMe,
        facebookURL,
        instagramURL,
        xURL,
        avatar:
        {public_id: cloudAvtar.public_id,
         url:cloudAvtar.secure_url
        },
        resume:
        {public_id: cloudResume.public_id,
         url:cloudResume.secure_url
        }
    })
    console.log(user);

    generateToken(user,"User Register",201, res);
} )

export const login=catchAsyncErrors(async (req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("Email and password is mandatory"))
    }

    //Searching from database
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("User not exist"))
    }
    const isPasswordMatch=await user.comparePassword(password)
    if(!isPasswordMatch){
        return next(new ErrorHandler("Wrong password"))

    }

    generateToken(user,"Looged in",200,res);

})

//Logout of the user
export const logout=catchAsyncErrors(async(req,res,next)=>{
    res.status(200)
    .cookie("token","",{
        expires:new Date(Date.now()),
        httpOnly:true

    })
    .json({
        success:true,
        message:"Logged Out"
    })
})

//Get user

export const getUser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id);
    console.log(user);
    res.status(200).json(
        {
            success:true,
            
            user
        }
    )
})

//update user
export const updateProfile=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        userName:req.body.userName,
        email:req.body.email, 
        portfolioURL:req.body.portfolioURL, 
        githubURL:req.body.githubURL,
        linkInURL:req.body.linkInURL, 
        contact:req.body.contact , 
        aboutMe:req.body.aboutMe,
        facebookURL:req.body.facebookURL,
        instagramURL:req.body.instagramURL,
        xURL:req.body.xURL

    }
    if(req.files && req.files.avatar){
        const avatar=req.files.avatar;
        const user= await User.findById(req.user.id);
        const profileImageId=user.avatar.public_id;
        await cloudinary.uploader.destroy(profileImageId)

        const cloudAvtar=await cloudinary.uploader.upload(
            avatar.tempFilePath,{folder:"Avatar"}
        );

        newUserData.avatar={
            public_id: cloudAvtar.public_id,
            url:cloudAvtar.secure_url
        }

    }

    if(req.files && req.files.resume){
        const resume=req.files.resume;
        const user= await User.findById(req.user.id);
        const profileImageI=user.resume.public_id;
        await cloudinary.uploader.destroy(profileImageI,{resource_type: "raw"})

        const cloudResume=await cloudinary.uploader.upload(
            resume.tempFilePath,{folder:"Resume", resource_type: "raw", filename_override: "Praharsh_Resume",
            use_filename: true, unique_filename: false,type: "upload"}
        );

        newUserData.resume={
            public_id: cloudResume.public_id,
            url:cloudResume.secure_url
        }

    }

    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

   res.status(200).json({
    success:true,
    message:"Portfolio updated",
    user
   })
    
})

//To update password
export const updatePassword=catchAsyncErrors(async(req,res,next)=>{
    const{currentPassword,newPassword,confirmNewPassword}=req.body;
    if(!currentPassword||!newPassword||!confirmNewPassword){
        return next(new ErrorHandler("All the feilds are mandatory",400))
    }
    const user=await User.findById(req.user.id).select("+password");
    const isPasswordMatch=await user.comparePassword(currentPassword);
    if(!isPasswordMatch){
        return next(new ErrorHandler("Incorrect password",400))
    }
    if(newPassword!==confirmNewPassword){
        return next(new ErrorHandler("new password and confirm new password is not matched",400))
    }
    user.password=newPassword;
    await user.save();
    res.status(200).json({
        success:true,
        message:"password updated successfully"
    })
})

//get profile for everyone
export const getPortfolioForEveryone=catchAsyncErrors(async(req,res,next)=>{
    const id="683afde73cd879802207d932"
    const user=await User.findById(id);
    res.status(200).json({
        success:true,
        message:"Successfully get the profile",
        user
    })
})

//forget password api
export const forgotPassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return next(new ErrorHandler("User email not found",404))
    }
    const resetToken=user.getResetPasswordToken();
    await user.save({validateBeforeSave:false})
    const resetPasswordUrl=`${process.env.DASHBOARD_URL}/password/reset/${resetToken}`
    const message=`Your reset password token is : \n\n ${resetPasswordUrl} \n\n If you've not requested for this please ignore`
    try{
        await SendEmail({
          email:user.email,
          subject:"Personal Portfolio Dashboard Recovery Password",
          message
        })
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })
    }catch(error){
        user.resetPasswordExpired=undefined
        user.resetPasswordToken=undefined
        await user.save()
        return next(new ErrorHandler(error.message,500))
    }
})
//Rest password and save this to user
export const resetPassword=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.params;
    const resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex');
    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpired:{$gt:Date.now()}
    
    })
    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or expired",400))
    }
    if(req.body.password!==req.body.confirmNewPassword){
        return next(new ErrorHandler("Password and confirm password is not matched",400))
    }
    user.password=req.body.password;
    user.resetPasswordExpired=undefined;
    user.resetPasswordToken=undefined
    await user.save();
    generateToken(user,"password reset succesfully",200,res);
})