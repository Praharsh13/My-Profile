import express from "express";
import { isAuthenticated } from "../Middleware/auth.js";
import { allTimeline, deleteTimeline,
         postTimeline } from "../controllers/timelineController.js";


const router=express.Router();

router.post("/add",isAuthenticated,postTimeline)
router.delete("/delete/:id",isAuthenticated,deleteTimeline)
router.get("/allTimeline",allTimeline)

export default router;