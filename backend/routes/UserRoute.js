import express from "express";
import {  changePassword, getUser, loginStatus, loginUser, logout, registerUser, updateUser } from "../controllers/UserController.js";
import { protect } from "../middleWare/authMiddleware.js";

const router = express.Router();


router.post("/register" , registerUser)
router.post("/login", loginUser)
router.get("/logout", logout)
router.get("/getUser", protect , getUser)
router.get("/loginStatus", loginStatus)
router.post("/updateUser", protect , updateUser)
router.post("/changePassword", protect , changePassword)


export default router;
