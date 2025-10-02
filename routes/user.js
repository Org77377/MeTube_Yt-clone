import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { signUp,logIn, getUser } from "../controllers/User.js";

const userRoute = express.Router();

// use of middleware to protect routes that require authentication
// userRoute.get("/", checkAuth, getUser) all user related routes are protected
// user route definitions and middleware redirects user/method and path
// and requests to the appropriate controller functions
userRoute.post("/login", logIn)
userRoute.post("/signup", signUp)
userRoute.get("/", checkAuth, getUser)
 
export default userRoute;