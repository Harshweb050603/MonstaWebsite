import mongoose from "mongoose";


const sessionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"user must required"]
    },
    refreshToken:{
        type:String,
        required:[true,"refresh Token Required"]
    },
    ip:{
        type:String,
        required:[true,"ip required"]
    },
    userAgent:{
        type:String,
        required:[ true, "userAgent is required"]
    
    },
    revoked:{
        type: Boolean,
        default:false
        }

    
},{
    timestamps:true
})
const sessionModel = mongoose.model("session",sessionSchema);

export default sessionModel;