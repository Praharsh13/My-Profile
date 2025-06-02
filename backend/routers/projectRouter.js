import express from 'express'
import { addProject,getAllProject ,deleteProject,updateProject,getProject} from '../controllers/projectController.js';
import { isAuthenticated } from '../Middleware/auth.js';


const router = express.Router();

router.post("/addproject",isAuthenticated,addProject)
router.get("/getallproject",getAllProject)
router.delete("/deleteproject/:id",isAuthenticated,deleteProject)
router.put("/updateproject/:id",isAuthenticated,updateProject)
router.get("/getproject/:id",getProject)


export default router