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

export async function channelCreate(req, res){
    try{
        // console.loog(req.headers)
        const user = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const getUser = await User.findById(user._id);
        if(getUser.channel.isCreated == false){
            const cloudData = await cloudinary.uploader.upload(req.files.banner.tempFilePath);
            const newData = await channel.create({
                channelName: req.body.channelname,
                owner: user._id,
                description: req.body.description,
                channelBanner: cloudData.secure_url,
                bannerId: cloudData.public_id,
            })
            await User.findByIdAndUpdate(user._id ,{$set: {"channel.channelName": req.body.chanelname, "channel.isCreated": true}},{new: true})
            return res.json({newChannel: newData});
        }else{
            return res.status(501).json({msg : "Channel Already Exist"});
        }
    }catch(error){
        // console.log(req.headers)
        console.log(req.files)
        console.log(req.body)
        return res.status(504).json({msg : error})
    }
}

export async function deleteChannel(req, res){
    try{
        const user = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const userdetail = await User.findById(user._id)
        const userChannel = await channel.findById(req.params.channelId);
        if(!userChannel){
            return res.json({msg: "No channel found"})
        }else{
        if(userChannel.owner.equals(userdetail._id)){
            await cloudinary.uploader.destroy(userChannel.bannerId)
            const deletedCh = await channel.findByIdAndDelete(userChannel._id, {new: true})
                userdetail.channel.channelName = null;
                userdetail.channel.isCreated = false;
                userdetail.channel.subs = 0;
                await userdetail.save();
                // await channel.save();
                return res.status(200).json({"msg": "Channel Delelted", deleted_data : deletedCh})
            }
            return res.status(500).json("its not your channel")
        }
    }catch(err){
        return res.status(500).json({msg: "Error Happened"})
    }
}

export async function viewChannel(req, res){
    try{
        const chID = req.params.id;
        const channelInfo = await channel.findById(chID);
        const vids = await Video.find({uploader: channelInfo.owner});
        if(!channelInfo){
            return res.status(404).json({msg : "channel not found"});
        }
        return res.status(201).json({data : channelInfo, vidData: vids});
    }
    catch(err){
        return res.status(404).json({msg: "Error occured at servers end"});
    }
} 