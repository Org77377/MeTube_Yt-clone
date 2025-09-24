import { view } from "../controllers/Video.js"
import express from "express"
const viewRoute = express.Router()

viewRoute.put("/:videoId", view);

export default viewRoute;