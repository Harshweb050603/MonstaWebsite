import express from 'express';
import morgan from 'morgan';
import authrouter from "./routes/auth.routes.js"
import cookie from "cookie-parser"
import cors from "cors"
import productrouter from "./routes/product.routes.js"
import wishlistRouter from "./routes/wishlist.routes.js";
import upload from "../src/config/image.upload.js"
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import addressRouter from "./routes/address.routes.js";
const App = express();

App.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
App.use(cookie());
App.use(express.json());
App.use(morgan("dev"));



App.use("/uploads", express.static("uploads"));

App.use("/api/auth" ,authrouter)
App.use("/api/product" ,productrouter)
App.use("/api/wishlist", wishlistRouter);
App.use("/api/cart", cartRouter);
App.use("/api/orders", orderRouter);
App.use("/api/address", addressRouter);
export default App;