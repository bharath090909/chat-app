import mongoose from "mongoose";

const authSchema =  new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    fullName:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:""
    },
    otp:{
        type: Number,
        default:null
    }
})

const User = mongoose.model("User", authSchema);

export default User;