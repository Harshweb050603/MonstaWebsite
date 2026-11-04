import { Router } from "express";
import authMiddleware from "../Middleware/auth.middleware.js";
import * as wishlistController from "../controllers/wishlist.controller.js";
const wishlistRouter = Router();

    
wishlistRouter.post("/add", authMiddleware, wishlistController.addToWishlist);
wishlistRouter.get("/", authMiddleware, wishlistController.getWishlist);
wishlistRouter.delete("/remove/:productId", authMiddleware, wishlistController.removeFromWishlist);

export default wishlistRouter;