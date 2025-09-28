import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { signUp,logIn, getUser } from "../controllers/User.js";

const userRoute = express.Router();

userRoute.post("/login", logIn)
userRoute.post("/signup", signUp)
userRoute.get("/", checkAuth, getUser)
 
export default userRoute;