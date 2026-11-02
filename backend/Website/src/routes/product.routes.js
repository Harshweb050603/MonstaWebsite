import { Router } from "express";
import * as productController from "../controllers/product.controller.js"
import upload from "../config/image.upload.js";
const productrouter = Router();



//  create Product  api 
productrouter.post(
  "/",
  upload.single("image"),
  (req, res, next) => {
    console.log("Create Product API called");
    console.log("Uploaded file:", req.file?.filename);
    next();
  },
  productController.createProduct
);

//  Get all Products 
productrouter.get("/getProducts", productController.getAllProducts);

//  Get single Product 
productrouter.get("/getProduct/:id", productController.getSingleProduct);

//  Update Product
productrouter.put("/updateProduct/:id", upload.single("image"), productController.updateProduct);

//  Delete Product
productrouter.delete("/deleteProduct/:id", productController.deleteProduct);


export default productrouter;