import express from "express"
import { adminLogin, googleLogin, login, logOut, registration } from "../controller/authController.js"

const authRoutes = express.Router()

authRoutes.post("/registration",registration)
authRoutes.post("/login",login)
authRoutes.get("/logOut",logOut)
authRoutes.post("/googleLogin",googleLogin)
authRoutes.post("/adminlogin",adminLogin)
export default authRoutes