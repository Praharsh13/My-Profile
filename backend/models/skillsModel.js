import mongoose from "mongoose";

const skillschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    profiency:{
        type:String,
        required:true
    },
    type:{
       type:String,
       enum: ["frontend", "backend", "cloud", "database", "devops"], 
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

export const Skills= mongoose.model("Skill",skillschema)