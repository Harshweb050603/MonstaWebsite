import express from 'express';
import morgan from 'morgan';
import authrouter from "./routes/auth.routes.js"
import cookie from "cookie-parser"
import cors from "cors"
import productrouter from "./routes/product.routes.js"
import upload from "../src/config/image.upload.js"
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

export default App;