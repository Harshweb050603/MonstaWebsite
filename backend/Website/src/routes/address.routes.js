import { Router } from "express";
import authMiddleware from "../Middleware/auth.middleware.js";
import * as addressController from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post(
  "/save",
  authMiddleware,
  addressController.saveAddress
);

addressRouter.get(
  "/",
  authMiddleware,
  addressController.getAddress
);

export default addressRouter;