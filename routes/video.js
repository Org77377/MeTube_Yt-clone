import { uploadVideo } from "../controllers/Video.js";
import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
const videoRoute = express.Router();


videoRoute.post("/upload", checkAuth, uploadVideo)

export default videoRoute;