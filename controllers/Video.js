import Video from "../models/Video.js";
import Comments from "../models/Comment.js"
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary";
import User from "../models/Users.js";
import channel from "../models/Channel.js";

 cloudinary.config({
        cloud_name: process.env.API_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
    });

export async function uploadVideo(req, res){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        const dbuser = await User.findById(user._id);
        const usrchannel = await channel.findOne({owner: dbuser._id})
        if(dbuser.channel.isCreated == false){
            return res.status(404).json({msg: "Please create a channel"});
        }
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
            thumbnaiId: uploadThumb.public_id,
            category: body.category,
        })
        await video.save();
        const userVids = await Video.find({uploader: user._id});
        const getchanel = await channel.findOne({owner:user._id})
        const dataarr = userVids.map(e=>e._id)
        getchanel.videos.push(...dataarr);
        await getchanel.save();
        res.status(201).json({msg: "video uploaded"});

    }catch(error){
        res.status(500).json({msg: "Something went wrong", err: error});
    }
}

export async function updateVideo(req, res){
    try{
        const validUser = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET)
        const vidID = await Video.findById(req.params.videoId);
        if(validUser.channel.isCreated == false){
            return res.status(404).json({msg: "Please create a channel"});
        }
        if(validUser._id == vidID.uploader._id){
            if(req.body){
                const newData = {
                    title: req.body.title,
                    description: req.body.description,
                    category: req.body.category,
                };  
                const updatedVideo = await Video.findByIdAndUpdate(vidID, newData,{new:true});
                return res.status(201).json({
                    newData: updatedVideo,
                })
            }else{
                await cloudinary.uploader.destroy(`${vidID.thumbnaiId}`);
                const updateThumb = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath);
                // const newData = {
                    vidID.thumbnailUrl = updateThumb.secure_url;
                    vidID.thumbnaiId = updateThumb.public_id;
                // };
                await vidID.save();
                    // const updatedVideoData = await Video.findByIdAndUpdate(vidID, newData,{new:true});
                     return res.status(201).json({
                        newData: vidID, msg: "Details updated"
                    });
            }
        }
        res.json({err: "you dont have permission"})
    }catch(error){
        return res.status(500).json({err: error})
    }
}

export async function deleteVideo(req, res){
    try{
        const verify = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const video = await Video.findById(req.params.videoID);
        if(!video){
            return res.status(404).json({msg: "No video found"});
        }
        if(video.uploader == verify._id){
            // no channel exist
            if(verify.channel.isCreated == false){
                return res.status(404).json({msg: "Please create a channel"});
            }
            // if(verify.channel.isCreated)
            await cloudinary.uploader.destroy(video.videoId, {resource_type: 'video'})
            await cloudinary.uploader.destroy(video.thumbnaiId)
            const deletedData = await Video.findByIdAndDelete(req.params.videoID);

            // delete video id from the owners video list
            await channel.findOneAndUpdate({owner: verify._id}, {$pull:{videos: req.params.videoID}})
            
            return res.json({"msg": "Video Deleted" ,data: deletedData});
        }
        return res.status(500).json({"msg": "You dont have permission to perform this operation"})
    }catch(error){
        return res.status(502).json({"msg": "Internal Server Error"})
    }
}

export async function likeVideo(req, res){
    try{
        const userDetails = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        if(userDetails == null){
            return res.json({msg : "Please Login"})
        }
        const video = await Video.findById(req.params.videoId);
        if(video == null){
            return res.status(404).json("No video found");
        }else{
        if(video.likedBy.includes(userDetails._id)){
            video.views -= 1;
            return res.json({msg: "already liked"})
        }
            video.likedBy.push(userDetails._id)
            video.dislikes > 0 ? video.dislikes -= 1 : '' ;
            // video.views -= 1;
            video.likes += 1;
            (video.viewedBy.includes(userDetails._id)) ? '' : video.viewedBy.push(userDetails._id) ;
        await video.save()
        return res.status(201).json({msg: "Video Liked"});
    }
    }catch(err){
        return res.status(500).json({mssg: "Something bad happened"})
    }
}

export async function dislikeVideo(req, res){
    try{
        const userDetails = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        if(userDetails == null){
            return res.send("Please Login")
        }
        const video = await Video.findById(req.params.videoId);
        if(video == null){
            return res.json("No video found");
        }else{
        if(video.likedBy.includes(userDetails._id)){
            video.likedBy.pop(userDetails._id)
            // video.views -= 1;
            video.dislikes += 1
            video.likes -= 1;
            await video.save()  
            return res.json({msg: "Video Disliked"});
        }
        return res.json({msg: "Video already disliked"});
    }
    }catch(err){
        return res.status(500).json({mssg: "Something bad happened"})
    }
}

export async function addComment(req, res){
    try{
        const userDetails = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const video = await Video.findById(req.params.videoId);
        if(!video){
            return res.status(404).json({msg: "Video not found"});
        }
        if(!req.body.comment){
            return res.status(400).json({msg: "Comment cannot be empty!"});
        }
        const newComment = await Comments.create({
            by: userDetails._id,
            videoId: video._id,
            username: userDetails.username,
            commentText: req.body.comment,
        })

        await newComment.save();
        return res.status(200).json({"msg": "comment added"});
    }catch(error){
        res.status(502).json({msg : "Error while posting your comment"})
    }
}

export async function updateComment(req, res){
    try{
        const userDetails = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const currentComment = await Comments.findById(req.params.commentId);
        if(!currentComment){
            return res.status(404).json({msg: "you have not commented on any video"});
        }
        if(!req.body){
            return res.status(404).json({msg: "please add a comment"});
        }
        if(currentComment.by.equals(userDetails._id)){
            currentComment.commentText = req.body.comment;
            const updatedComm = await currentComment.save()
            return res.status(201).json({msg: "Comment updated", data: updatedComm});
        }
        return res.status(500).json({msg: "Invalid user"});
    }catch(error){
        res.status(502).json({msg : "Error while posting your comment"})
    }
}

export async function getVideos(req, res){
    try{
        const allVids = await Video.find({});
        const uploader = await User.find({});
        const chanInfo = await channel.find({})
        res.status(200).json(
            { videos: allVids, uploader : uploader, chInfo: chanInfo, msg:"You are now connected"}
        )
    }
    catch(err){
        res.status(500).json({msg:"Seems like you are offline"})
    }
}