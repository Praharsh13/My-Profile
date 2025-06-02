import express from "express";
import { sendMessage,getAllMessage,deleteMessage } from "../controllers/messageController.js";
import { get } from "mongoose";
import { isAuthenticated } from "../Middleware/auth.js";

const router=express.Router();

router.post("/send",sendMessage)
router.get("/allmessage",getAllMessage)
router.post("/deleteMessage/:id",isAuthenticated,deleteMessage)

export default router;