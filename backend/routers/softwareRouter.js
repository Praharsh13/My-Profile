import express from 'express';
import { add, deleteSoftware, getAllSoftware } from '../controllers/softwareController.js';
import { isAuthenticated } from '../Middleware/auth.js';


const router= express.Router();

router.post("/add",isAuthenticated,add);
router.get("/getallsoftware",getAllSoftware)
router.delete("/deletesoftware/:id",deleteSoftware)


export default router;