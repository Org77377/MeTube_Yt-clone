import express from "express";
// import channel from "../models/Channel.js";
import { channerCreate } from "../controllers/Channel.js";
import { checkAuth } from "../middleware/checkAuth.js";
const channelRoute = express.Router();

channelRoute.post("/create", checkAuth, channerCreate);

export default channelRoute;