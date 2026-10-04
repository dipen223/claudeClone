import express from "express";
import {getThreads,getThread,deleteThread} from "../controllers/threads.controller.js"
import auth from "../middleware/auth.js";

const router = express.Router();


router.get("/allThreads",auth,getThreads)
router.get("/thread/:id",auth,getThread)
router.delete("/thread/:id",auth,deleteThread)



export default(router);