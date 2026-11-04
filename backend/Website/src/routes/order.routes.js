
import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import * as orderController from "../controllers/order.controller.js";

const orderRouter = Router();

// Create Order
orderRouter.post("/", authMiddleware, orderController.createOrder);
orderRouter.get("/my-orders", authMiddleware, orderController.getMyOrders);
export default orderRouter;
