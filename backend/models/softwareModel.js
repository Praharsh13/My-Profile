import mongoose from "mongoose";

const softwareSchema=new mongoose.Schema({
    softwarename:{
        type:String,
        required:["software name is required"]
    },
    image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
})

export const Software=mongoose.model("Software",softwareSchema)