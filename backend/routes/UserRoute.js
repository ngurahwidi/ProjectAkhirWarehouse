import express from "express";
import {  getUser, loginStatus, loginUser, logout, registerUser } from "../controllers/UserController.js";
import { protect } from "../middleWare/authMiddleware.js";

const router = express.Router();


router.post("/register" , registerUser),
router.post("/login", loginUser)
router.get("/logout", logout)
router.get("/getUser", protect , getUser)
router.get("/loginStatus", loginStatus)


export default router;
