import App from "./src/App.js"
import connectDb from "./src/config/database.js"

connectDb();

App.listen(3000,()=>{
    console.log("serevr is running on port 3000")
})