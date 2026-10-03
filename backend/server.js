import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import threadRoutes from "./routes/threads.routes.js";
import chatRoutes from "./routes/chat.routes.js"


dotenv.config();


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/api",threadRoutes);
app.use("/api",chatRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is listening on port : ${PORT}` );
    connectDB()
})

const connectDB = async() =>{
    try{
         await mongoose.connect(process.env.MONGODB_URL)
         console.log("MONGODB connected.")
        
    }catch(err){
        console.log("Failed to connect with DB",err);

    }
    
   

}




