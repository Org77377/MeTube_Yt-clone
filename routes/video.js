import { uploadVideo, updateVideo, deleteVideo, likeVideo, dislikeVideo } from "../controllers/Video.js";
import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
const videoRoute = express.Router();

// video route definitions and middleware redirects video/method and path
// and requests to the appropriate controller functions
videoRoute.post("/upload", checkAuth, uploadVideo)
videoRoute.put("/:videoId", checkAuth, updateVideo)
videoRoute.delete("/:videoID",checkAuth, deleteVideo)
videoRoute.put("/like/:videoId", checkAuth, likeVideo)
videoRoute.put("/dislike/:videoId", checkAuth, dislikeVideo)
export default videoRoute;