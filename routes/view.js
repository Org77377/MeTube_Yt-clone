import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import User from "../models/Users.js";
import channel from "../models/Channel.js";
import express from "express"
import jwt from "jsonwebtoken"
const viewRoute = express.Router()

viewRoute.put("/:videoId", async (req, res) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    const video = await Video.findById(req.params.videoId)
    if(req.headers.authorization.split(" ")[1] == ''){
      video.views +=1;
      await video.save();
      return res.status(200).json({msg: "view added"})
    }else{
    if(token){
      console.log(token)
      const userData = jwt.verify(token, process.env.JWT_SECRET)
      if(video.viewedBy.includes(userData._id)){
        return res.status(200).json({msg: "Your view is already registered"})
      }
      await video.viewedBy.push(userData._id)
      await video.save();
      return res.status(200).json({msg: "View added"})
    }
    return res.status(503).json({msg : "error occured"})
  }
  }catch(err){
    console.log(err)
  }
});

viewRoute.get("/:videoId", async (req, res) => {
    let lguser = null;
    if(!req.headers.authorization == ''){
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