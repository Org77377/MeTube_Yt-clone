import express from "express";
import { signUp,logIn } from "../controllers/User.js";

const userRoute = express.Router();

userRoute.post("/login", logIn)

userRoute.post("/signup", signUp)

export default userRoute;