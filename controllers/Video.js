import Video from "../models/Video.js";
import Comments from "../models/Comment.js"
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/Users.js";
import channel from "../models/Channel.js";

cloudinary.config({
    cloud_name: process.env.API_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export async function uploadVideo(req, res) {
    try {
        // check user is valid or not using jwt token
        // if user is valid then check if user has channel or not
        // if no channel exist send user a message to create channel first
        const token = req.headers.authorization.split(" ")[1];
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        const dbuser = await User.findById(user._id);
        const usrchannel = await channel.findOne({ owner: dbuser._id })
        if (dbuser.channel.isCreated == false) {
            return res.status(404).json({ msg: "Please create a channel" });
        }
        const uploadVid = await cloudinary.uploader.upload(req.files.video.tempFilePath, {
            resource_type: 'video',
        });
        // if user passes all the conditions then upload video to cloudinary and save video details to database
        // also upload thumbnail to cloudinary and save thumbnail details to database
        // finally save video id to channel video list
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
        const userVids = await Video.find({ uploader: user._id });
        const getchanel = await channel.findOne({ owner: user._id })
        const dataarr = userVids.map(e => e._id)
        getchanel.videos.push(...dataarr);
        await getchanel.save();
        res.status(201).json({ msg: "video uploaded" });
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" });
    }
}

export async function updateVideo(req, res) {
    try {
        // perform user verification using jwt token and get user details
        const validUser = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET)
        const userCheck = await User.findById(validUser._id);
        const vidID = await Video.findById(req.params.videoId);
        // check if user is valid or not
        if (!validUser._id == vidID.uploader._id) {
            return res.status(404).json({ msg: "You are not a valid user" });
        }
        // check if no channel exist
        if (userCheck.channel.isCreated == false) {
            return res.status(404).json({ msg: "Please create a channel", user: userCheck });
        } else {
            // if channel exist check if user is owner of video and then update video details
            if (validUser._id == vidID.uploader._id) {
                if (req.body) {
                    const newData = {
                        title: req.body.title,
                        description: req.body.description,
                        category: req.body.category,
                    };
                    const updatedVideo = await Video.findByIdAndUpdate(vidID, newData, { new: true });
                    await cloudinary.uploader.destroy(`${vidID.thumbnaiId}`);
                    const updateThumb = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath);
                    vidID.thumbnailUrl = updateThumb.secure_url;
                    vidID.thumbnaiId = updateThumb.public_id;
                    await vidID.save();
                    // const updatedVideoData = await Video.findByIdAndUpdate(vidID, newData,{new:true});
                    return res.status(201).json({
                        newData: updatedVideo, msg: "Video details updated"
                    })
                } else {
                    // else send error
                    return res.status(500).json({
                        msg: "Error while updating details"
                    });
                }
            }
            res.json({ err: "you dont have permission" })
        }
    } catch (error) {
        return res.status(500).json({ err: error })
    }
}

export async function deleteVideo(req, res) {
    try {
        const verify = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const video = await Video.findById(req.params.videoID);
        // check if video exist or not if not exist send a pop message
        if (!video) {
            return res.status(404).json({ msg: "No video found" });
        }
        // verify user is owner of video or not 
        if (video.uploader == verify._id) {
            // no channel exist
            if (verify.channel.isCreated == false) {
                return res.status(404).json({ msg: "Please create a channel" });
            }
            // if user is owner of video then delete video from cloudinary and database
            await cloudinary.uploader.destroy(video.videoId, { resource_type: 'video' })
            await cloudinary.uploader.destroy(video.thumbnaiId)
            const deletedData = await Video.findByIdAndDelete(req.params.videoID);
            // delete video id from the owners video list
            await channel.findOneAndUpdate({ owner: verify._id }, { $pull: { videos: req.params.videoID } })
            // return success message and video data
            return res.json({ "msg": "Video Deleted", data: deletedData });
        }
        // or send restrtiction message
        return res.status(500).json({ "msg": "You dont have permission to perform this operation" })
    } catch (error) {
        // send error if something bad happened
        return res.status(502).json({ "msg": "Internal Server Error" })
    }
}

export async function likeVideo(req, res) {
    try {
        // get current user logged in information and if there is no token available send user a message 
        // to login to perform this action
        const userDetails = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        if (userDetails == null) {
            return res.json({ msg: "Please Login" })
        }
        // get the video details from database using parameter video id
        const video = await Video.findById(req.params.videoId);
        // if no video found send message
        if (video == null) {
            return res.status(404).json("No video found");
        } else {
            // check if the video is already liked by current user if yes then send message
            if (video.likedBy.includes(userDetails._id)) {
                // overrride views for state change in frontend
                video.views -= 1;
                // and send a message of already liked
                return res.json({ msg: "already liked" })
            }
            // if video is not liked by user then like the video and update the video details in database
            video.likedBy.push(userDetails._id)
            video.dislikes > 0 ? video.dislikes -= 1 : '';
            // video.views -= 1;
            video.likes += 1;
            (video.viewedBy.includes(userDetails._id)) ? '' : video.viewedBy.push(userDetails._id);
            await video.save()
            // send success message
            return res.status(201).json({ msg: "Video Liked" });
        }
    } catch (err) {
        return res.status(500).json({ mssg: "Something bad happened" })
    }
}

export async function dislikeVideo(req, res) {
    try {
        // process is same as like video function verify user and video is exist or not 
        const userDetails = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        if (userDetails == null) {
            return res.send("Please Login")
        }
        const video = await Video.findById(req.params.videoId);
        if (video == null) {
            return res.json("No video found");
        } else {
            // and if user is liked the video then remove it from liked array and increase video dislike count
            if (video.likedBy.includes(userDetails._id)) {
                video.likedBy.pop(userDetails._id)
                // video.views -= 1;
                video.dislikes += 1
                video.likes -= 1;
                await video.save()
                // send success message
                return res.json({ msg: "Video Disliked" });
            }
            // if user already disliked the video then send message
            return res.json({ msg: "Video already disliked" });
        }
    } catch (err) {
        return res.status(500).json({ mssg: "Something bad happened" })
    }
}

export async function addComment(req, res) {
    try {
        // check user is valid or not same as all other above functions 
        const userDetails = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const video = await Video.findById(req.params.videoId);
        if (!video) {
            return res.status(404).json({ msg: "Video not found" });
        }
        // check comment field is empty or not
        if (!req.body.comment) {
            return res.status(400).json({ msg: "Comment cannot be empty!" });
        }
        // if user is valid and comment field is not empty add the comment 
        const newComment = await Comments.create({
            by: userDetails._id,
            videoId: video._id,
            username: userDetails.username,
            commentText: req.body.comment,
        })
        // save comment and send success message
        await newComment.save();
        return res.status(200).json({ "msg": "comment added" });
    } catch (error) {
        res.status(502).json({ msg: "Error while posting your comment" })
    }
}

export async function updateComment(req, res) {
    try {
        // check user is valid and comment is exist 
        const userDetails = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const currentComment = await Comments.findById(req.params.commentId);
        if (!currentComment) {
            // this is to perform backend test using postman not actually for UI
            return res.status(404).json({ msg: "you have not commented on any video" });
        }
        if (!req.body) {
            // check comment field 
            return res.status(404).json({ msg: "please add a comment" });
        }
        // if current user is owner of a comment then allow him to edit the comment 
        if (currentComment.by.equals(userDetails._id)) {
            currentComment.commentText = req.body.comment;
            const updatedComm = await currentComment.save()
            return res.status(201).json({ msg: "Comment updated", data: updatedComm });
        }
        // else send user details is invalid 
        return res.status(500).json({ msg: "Invalid user" });
    } catch (error) {
        res.status(502).json({ msg: "Error while posting your comment" })
    }
}

export async function deleteComment(req, res) {
    try {
        // check user informataion matches with comment owner as above functions and perform other operations
        // only when user is valid
        const userDetails = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const currentComment = await Comments.findById(req.params.commentId);
        if (!currentComment) {
            return res.status(404).json({ msg: "cannot delete comment" });
        } else {
            if (currentComment.by.equals(userDetails._id)) {
                await Comments.findByIdAndDelete(currentComment._id)
                return res.status(201).json({ msg: "Comment deleted" });
            }
            // else send invalid user message
            return res.status(500).json({ msg: "Invalid user" });
        }
    } catch (error) {
        res.status(502).json({ msg: "Error while posting your comment", error: error })
    }
}

export async function getVideos(req, res) {
    try {
        // get all videos from database and send to user
        const allVids = await Video.find({});
        const uploader = await User.find({});
        const chanInfo = await channel.find({})
        res.status(200).json(
            { videos: allVids, uploader: uploader, chInfo: chanInfo, msg: "You are now connected" }
        )
    }
    // in all above functions if try block fails on any line it jumps to catch displaying server error message
    catch (err) {
        res.status(500).json({ msg: "Seems like you are offline" })
    }
}

