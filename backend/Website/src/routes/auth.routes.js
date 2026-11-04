import { Router } from "express";
import * as authController from "../controllers/auth.controller.js" 
import authMiddleware from "../middleware/auth.middleware.js";

const authrouter = Router();

/**
 * post /api.auth/register
 */
authrouter.post("/register", authController.register)
/**
 * get /api/auth/get-me
 */
authrouter.get("/get-me",authController.getMe)
/**
 *  get /api/auth/refreshToken
 */
authrouter.post("/refresh_token",authController.refreshToken)
/**
 *  get /api/auth/logout
 */
authrouter.post("/logout",authController.logout)

/**
 * post/api/auth/logout_all
 */
authrouter.post("/logout_all",authController.logoutAll)
/**
 * post/api/auth/login
 */
authrouter.post("/login",authController.login)

authrouter.post("/verify-otp",authController.verifyOtp)

authrouter.post("/resendOtp",authController.resendOtp)
authrouter.patch(
  "/update-profile",
  authMiddleware,
  authController.updateProfile
);
export default authrouter;