import express from 'express'
import { add, deleteSkill, getAll, updateSkill } from '../controllers/skillController.js'
import { isAuthenticated } from '../Middleware/auth.js';


const router = express.Router();

router.post("/addskill",isAuthenticated,add)
router.get("/getallskill",getAll)
router.delete("/deleteskill/:id",isAuthenticated,deleteSkill)
router.put("/updateskill/:id",isAuthenticated,updateSkill)


export default router