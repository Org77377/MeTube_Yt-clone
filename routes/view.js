import Video from "../models/Video.js";
import express from "express"
const viewRoute = express.Router()

viewRoute.put("/:videoId", async (req, res)=>{
        try{
            const video = await Video.findById(req.params.videoId);
            if(!video){
                return res.status(404).json("video not found");
            }
            video.views += 1,
            await video.save();
            return res.status(201).json({msg :"View added!", data: video});
        }
        catch(error){
            console.log(req.params.videoId)
            return res.status(400).json("Error loading video");
        }
    }
);

export default viewRoute;