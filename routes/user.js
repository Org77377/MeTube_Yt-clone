import express from "express";
import { signUp } from "../controllers/User.js";

const userRoute = express.Router();

userRoute.get("/",(req, res)=>{
    res.status(201).send("Logged In");
})

userRoute.post("/",signUp)

export default userRoute;