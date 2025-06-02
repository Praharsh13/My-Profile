import mongoose from "mongoose";
//Creating model for message schema that person can send by seeing the profile
const messageSchema=new mongoose.Schema({
    senderName:{
        type:String,
        minLength:[2,"Nmae must contain at least 2 characters"],
    },

    subject:{
        type:String,
        minLength:[2, "Subject must contain at least 2 characters"]
    },

    message:{
        type:String,
        minLength:[2, "Subject must contain at least 2 characters"]

    },

    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export const Message=mongoose.model("Message",messageSchema);