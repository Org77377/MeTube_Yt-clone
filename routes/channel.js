import express from "express";
// import channel from "../models/Channel.js";
import { channelCreate, deleteChannel, viewChannel } from "../controllers/Channel.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { HandleSubscribe, HandleUnSubscribe } from "../controllers/User.js";
const channelRoute = express.Router();

// channel route definitions and middleware redirects channel/method and path
// and requests to the appropriate controller functions
channelRoute.post("/create", checkAuth, channelCreate);
channelRoute.delete("/delete/:channelId", checkAuth, deleteChannel)
channelRoute.put("/subscribe/:channelId", checkAuth, HandleSubscribe)
channelRoute.put("/unsubscribe/:channelId", checkAuth, HandleUnSubscribe)
channelRoute.get("/:id", viewChannel);
export default channelRoute;