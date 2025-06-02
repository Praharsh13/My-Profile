import mongoose from "mongoose";

const projectSchema=new mongoose.Schema({
    title:String,
    description:String,
    gitRepoLink:String,
    projectLink:String,
    technologies:String,
    deployed:Boolean,
    projectImage:{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    }
})

export const Project=mongoose.model("Project",projectSchema);