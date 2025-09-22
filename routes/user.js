import express from "express";

const userRoute = express.Router();

userRoute.get("/",(req, res)=>{
    res.status(201).send("Logged In");
})

userRoute.post("/",(req, res)=>{
    res.status(201).send("Sign Up");
})

export default userRoute;