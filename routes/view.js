import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import User from "../models/Users.js";
import express from "express"
const viewRoute = express.Router()

viewRoute.put("/:videoId", async (req, res)=>{
        try{
            const video = await Video.findById(req.params.videoId);
            const allVids = await Video.find({});
            const cms = await Comment.find({videoId: video._id});
            const user = await User.find({})
            if(!video){
                return res.status(404).json("video not found");
            }
            video.views += 1,
            await video.save();
            return res.status(201).json({msg :"View added!", videoComments: cms, data : video, user: user, suggest : allVids});
        }
        catch(error){
            return res.status(400).json("Error loading video");
        }
    }
);

export default viewRoute;