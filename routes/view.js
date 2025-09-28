import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import User from "../models/Users.js";
import channel from "../models/Channel.js";
import express from "express"
import jwt from "jsonwebtoken"
const viewRoute = express.Router()

viewRoute.put("/:videoId", async (req, res) => {
  try {
    let lguser = null;
    if (req.headers.authorization) {
      try {
        lguser = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
      } catch {

        lguser = null;
      }
    }

    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return res.status(404).json("Video not found");
    }

    if (lguser) {

      if (video.viewedBy.includes(lguser._id)) {
        return res.json({ msg: "Already viewed" });
      }

      video.viewedBy.push(lguser._id);
    }

    video.views += 1;

    await video.save();

    return res.status(201).json({ msg: "View added!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

viewRoute.get("/:videoId", async (req, res) => {
    let lguser = null;
    if(!req.headers){
        lguser = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    }
    else{
        lguser = null;
    }
    try {
        const video = await Video.findById(req.params.videoId);
        const allVids = await Video.find({});
        const allUser = await User.find({});
        const allChn = await channel.find({});
        const cms = await Comment.find({ videoId: video._id });
        const user = await User.find({})
        if (!video) {
            return res.status(404).json("video not found");
        }
        return res.status(201).json({ videoComments: cms, data: video, user: user, suggest: allVids, user: allUser, channels: allChn, luser: lguser});
    }
    catch (error) {
        return res.status(400).json("Error loading video");
    }
}
);

export default viewRoute;