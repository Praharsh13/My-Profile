import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import crypto from "crypto"

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[6,"minimum password of 6 character is required"],
        select:false
    },
    aboutMe:{
        type:String,


    },
    contact:{
        type:String
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    portfolioURL:{
        type:String,
        required:[true,"Portfolio is required"]
    },
    githubURL:String,
    linkInURL:String,
    facebookURL:String,
    instagramURL:String,
    xURL:String,
    resetPasswordToken:String,
    resetPasswordExpired:Date,

})
//this is middleware hook to check the password is change or not 
//if not , then simply next to avoid hassing
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})

//custom method that can be use with user schema to compare password
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


//Generating JWT 
userSchema.methods.generateJsonWebToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES
    })
}

//Generating reset password token
userSchema.methods.getResetPasswordToken=function(){
    const resetToken=crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpired=Date.now()+15*60*1000;
    return resetToken
}

export const User=mongoose.model("User", userSchema)