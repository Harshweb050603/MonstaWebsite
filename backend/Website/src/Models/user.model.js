import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true,"username is Required"],
        unique:[true, "username must be unique "]
    },
    email:{
        type: String,
        required : [true,"Email is Required"],
        unique : [true,"Email must be unique"]
    },
    password:{
        type: String,
        required:[true,"password is required "]
    },
    verified:{
        type:Boolean,
        default:false
    }
})

const userModel = mongoose.model("users",userSchema);

export default userModel;