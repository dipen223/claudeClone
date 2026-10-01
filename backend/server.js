import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";



dotenv.config();


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, ()=>{
    console.log(`Server is listening on port : ${PORT}` );
    connectDB()
})

const connectDB = async() =>{
    try{
         await mongoose.connect(process.env.MONGODB_URL)
         console.log("MONGODB connected.")
        
    }catch(err){
        console.log(err);

    }
    
   

}




