import express from "express";


import chatHandler from "../controllers/chat.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/chat",auth,chatHandler)


export default router;