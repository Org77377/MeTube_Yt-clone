import express from "express";
import { signUp,logIn, getUser } from "../controllers/User.js";

const userRoute = express.Router();

userRoute.post("/login", logIn)
userRoute.post("/signup", signUp)
userRoute.get("/", getUser)
 
export default userRoute;