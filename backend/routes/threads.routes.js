import express from "express";
import {getThreads,getThread,deleteThread} from "../controllers/threads.controller.js"

const router = express.Router();


router.get("/allThreads",getThreads)
router.get("/getThread/:id",getThread)
router.delete("/thread/:id",deleteThread)



export default(router);