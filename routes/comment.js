import { checkAuth } from "../middleware/checkAuth.js";
import { addComment, updateComment } from "../controllers/Video.js";
import express from "express"
const commentRouter = express.Router();

commentRouter.post("/:videoId", checkAuth, addComment);
commentRouter.put("/:commentId", checkAuth, updateComment);

export default commentRouter;