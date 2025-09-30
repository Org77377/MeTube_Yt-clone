import jwt from "jsonwebtoken"
import { v2 as cloudinary } from "cloudinary";
import User from "../models/Users.js";
import channel from "../models/Channel.js";
import Video from "../models/Video.js";

cloudinary.config({
    cloud_name: process.env.API_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export async function channelCreate(req, res) {
    try {
        // console.loog(req.headers)
        // verify user token and get user id
        const user = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const getUser = await User.findById(user._id);
        // if no channel is created then create a new channel
        if (getUser.channel.isCreated == false) {
            const cloudData = await cloudinary.uploader.upload(req.files.banner.tempFilePath);
            const newData = await channel.create({
                channelName: req.body.channelname,
                owner: user._id,
                description: req.body.description,
                channelBanner: cloudData.secure_url,
                bannerId: cloudData.public_id,
            })
            await User.findByIdAndUpdate(user._id, { $set: { "channel.channelName": req.body.chanelname, "channel.isCreated": true } }, { new: true })
            getUser.channel.isCreated = true
            getUser.channel.channelName = req.body.channelname
            await getUser.save()
            return res.status(200).json({ newChannel: newData, msg: "Channel Created" });
            // if channel is already created then send error
        } else {
            return res.status(501).json({ msg: "Channel Already Exist" });
        }
    } catch (error) {
        return res.status(504).json({ msg: error })
    }
}

export async function deleteChannel(req, res) {
    try {
        const user = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const userdetail = await User.findById(user._id)
        const userChannel = await channel.findById(req.params.channelId);
        const videos = await Video.find({ uploader: userdetail._id });
        // check if user is owner of channel if not send no channel found
        if (!userChannel) {
            return res.json({ msg: "No channel found" })
        } else {
            // if channel is found check if user is owner of channel
            if (userChannel.owner.equals(userdetail._id)) {
                // if owner then delete channel and all videos of that channel also delete from cloudinary
                await cloudinary.uploader.destroy(userChannel.bannerId)
                if (videos.length > 0) {
                    await cloudinary.uploader.destroy(videos.map(d => d.videoId), { resource_type: 'video' })
                    await cloudinary.uploader.destroy(videos.map(d => d.thumbnaiId))
                }
                await Video.deleteMany({ uploader: userdetail._id })
                const deletedCh = await channel.findByIdAndDelete(userChannel._id, { new: true })
                userdetail.channel.channelName = null;
                userdetail.channel.isCreated = false;
                userdetail.channel.subs = 0;
                await userdetail.save();
                return res.status(200).json({ "msg": "Channel Delelted", deleted_data: deletedCh })
            }
            // if user is not owner of channel send error
            return res.status(500).json("its not your channel")
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Error Happened" })
    }
}

export async function viewChannel(req, res) {
    try {
        // get channel id from params
        const chID = req.params.id;
        const channelInfo = await channel.findById(chID);
        const vids = await Video.find({ uploader: channelInfo.owner });
        // if no channel found send error
        if (!channelInfo) {
            return res.status(404).json({ msg: "channel not found" });
        }
        // if channel found send channel data and all videos of that channel
        return res.status(201).json({ data: channelInfo, vidData: vids });
    }
    catch (err) {
        return res.status(404).json({ msg: "Error occured at servers end" });
    }
} 