import { uploadVideo, updateVideo } from "../controllers/Video.js";
import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
const videoRoute = express.Router();


videoRoute.post("/upload", checkAuth, uploadVideo)
videoRoute.put("/:videoId", checkAuth, updateVideo)
export default videoRoute;