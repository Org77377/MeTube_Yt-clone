import { checkAuth } from "../middleware/checkAuth.js";
import { addComment, deleteComment, updateComment } from "../controllers/Video.js";
import express from "express"
const commentRouter = express.Router();

// comment route definitions and middleware redirects comment/method and path
// and requests to the appropriate controller functions
commentRouter.post("/:videoId", checkAuth, addComment);
commentRouter.put("/:commentId", checkAuth, updateComment);
commentRouter.delete("/:commentId", checkAuth, deleteComment);

export default commentRouter;