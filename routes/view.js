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
    const getVid = await Video.findById(req.params.videoId);
    if(!token){
      getVid.views += 1;
      await getVid.save()
      return res.status(200).json({msg: "view added"})
    }else{
      const viewUser = jwt.verify(token, process.env.JWT_SECRET);
      if(getVid.viewedBy.includes(viewUser._id)){
        return res.status(204).json({msg: "view already addedd"})
      }
      else{
        getVid.viewedBy.push(viewUser._id);
        getVid.views += 1;
        await getVid.save();
        return res.status(200).json({msg: "view addedd"})
      }
    }
  }catch(err){
    return res.status(500).json({msg: "view addedd"})
  }
})

viewRoute.get("/:videoId", async (req, res) => {
    let lguser = null;
    const token = req.headers.authorization.split(' ');
    if( token != ''){
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