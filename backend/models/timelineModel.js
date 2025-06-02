import mongoose from "mongoose";

const timelineSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title required"]
    },
    description:{
        type:String,
        required:[true,"Description required"]
    },
    contenttype:{
        type:String,
        enum:["education","experience"]

    },

    timeline:{
        from:String,
        to:String

    },
    location:String
})

export const Timeline=mongoose.model("Timeline",timelineSchema)