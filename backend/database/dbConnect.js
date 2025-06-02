import mongoose from "mongoose";

const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"Portfolio"
    })
    .then(()=>{
        console.log("Database connected")
    })
    .catch((error)=>{
        console.log(`problem while connecting to DB ${error}`)
    })
}

export default dbConnection;