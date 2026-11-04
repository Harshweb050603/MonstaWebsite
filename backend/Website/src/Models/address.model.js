
import mongoose from "mongoose";

const addressDetailsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
}, { _id: false });

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  billingAddress: {
    type: addressDetailsSchema,
    required: true,
  },
  shippingAddress: {
    type: addressDetailsSchema,
    required: true,
  },
}, { timestamps: true });

const addressModel = mongoose.model("addresses", addressSchema);

export default addressModel;
