import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

dotenv.config();


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, ()=>{
    console.log(`Server is listening on port : ${PORT}` );
})



