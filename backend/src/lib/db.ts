import mongoose from "mongoose";

export const connectDb = async () =>{
    console.log(process.env.MONGODB_URI)
    try{
        await mongoose.connect(process.env.MONGODB_URI || "");
        console.log("Database connected")

    }catch(err){
        console.error(err)
        
    }

}