import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        unique:[true,"name must be unique"]
    },
    price:{
        type:Number,
        required:[true,"price is required"]

    },
    code:{
        type:String,
        required:[true,"code is required"],
        unique:[true,"code must be unique"]
    },
    discount:{
        type:Number,
        required:[true,"discount is required"]
    },
    
    description:{
        type:String,
        required:[true,"description is required"]
    },
    image:{
        type:String,
       default:""
    },
    category:{
        type:String,
        required:[true,"category is required"]
    }
    ,
    color:{
        type:String,
        required:[true,"color is required"]
    },
    dimension:{
        type:String
       
    }
    ,
        materials:{
            type:String,
           
        }
    
});

const productModel = mongoose.model("products",productSchema);
export default productModel;