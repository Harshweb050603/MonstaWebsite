import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import * as cartController from "../controllers/cart.controller.js";

const cartRouter = Router();

// Add product to cart
cartRouter.post("/add", authMiddleware, cartController.addToCart);
cartRouter.get("/", authMiddleware, cartController.getCart);
cartRouter.put("/update", authMiddleware, cartController.updateCartQuantity);
// Remove product from cart
cartRouter.delete(
  "/remove/:productId",
  authMiddleware,
  cartController.removeFromCart
);

export default cartRouter;