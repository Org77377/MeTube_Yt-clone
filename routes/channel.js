import express from "express";
// import channel from "../models/Channel.js";
import { channelCreate, deleteChannel } from "../controllers/Channel.js";
import { checkAuth } from "../middleware/checkAuth.js";
const channelRoute = express.Router();

channelRoute.post("/create", checkAuth, channelCreate);
channelRoute.delete("/delete/:channelId", checkAuth, deleteChannel)

export default channelRoute;