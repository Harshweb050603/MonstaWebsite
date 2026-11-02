import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required:[true,"Email is Required"],
    },
    otpHash:{
        type: String,
        required:[true,"OTP Hash is Required"],
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"User is Required"],
    }
},{
    timestamps:true
})
const otpModel = mongoose.model("otps",otpSchema);
export default otpModel;