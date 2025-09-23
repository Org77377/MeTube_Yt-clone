import Video from "../models/Video.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary";

 cloudinary.config({
        cloud_name: process.env.API_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
    });

export async function uploadVideo(req, res){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        const uploadVid = await cloudinary.uploader.upload(req.files.video.tempFilePath, {
            resource_type: 'video',
        });
        const uploadThumb = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath);
        const body = req.body;
        const video = await Video.create({
            title: body.title,
            description: body.description,
            uploader: user._id,
            videoUrl: uploadVid.secure_url,
            videoId: uploadVid.public_id,
            thumbnailUrl: uploadThumb.secure_url,
            category: body.category,
        })
        await video.save();
        res.status(201).json({msg: "video uploaded"});
    }catch(error){
        res.status(500).json({msg: "Please login", err: error});
    }
}
