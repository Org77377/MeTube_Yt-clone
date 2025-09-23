import jwt from "jsonwebtoken"
import { v2 as cloudinary } from "cloudinary";
import User from "../models/Users.js";
import channel from "../models/Channel.js";

cloudinary.config({
    cloud_name: process.env.API_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

export async function channerCreate(req, res){
    try{
        const user = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const getUser = await User.findById(user._id);
        if(getUser.channel.isCreated == false){
            const cloudData = await cloudinary.uploader.upload(req.files.banner.tempFilePath);
            const newData = await channel.create({
                channelName: req.body.chanelname,
                owner: user._id,
                description: req.body.description,
                channelBanner: cloudData.secure_url,
                bannerId: cloudData.public_id,
            })
            await User.findByIdAndUpdate(user._id ,{$set: {"channel.channelName": req.body.chanelname, "channel.isCreated": true}},{new: true})
            return res.json({newChannel: newData});
        }else{
            return res.status(501).send("Channel Already Exist");
        }
    }catch(err){
        console.log(err);
    }
}