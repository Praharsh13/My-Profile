import express from 'express';
import { 
    forgotPassword, 
    getPortfolioForEveryone, 
    getUser,
    login, 
    logout,
    register, 
    resetPassword, 
    updatePassword, 
    updateProfile
    } from '../controllers/userController.js';

import { isAuthenticated } from '../Middleware/auth.js';

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",isAuthenticated,logout)
router.get("/getuser",isAuthenticated,getUser)
router.put("/updateProfile",isAuthenticated,updateProfile)
router.put("/updatePassword",isAuthenticated,updatePassword)
router.get("/getprofileforeveryone",getPortfolioForEveryone)
router.post("/password/forgotpassword",forgotPassword)
router.put("/password/reset/:token",resetPassword)

export default router;