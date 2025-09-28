import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";
import channel from "../models/Channel.js";
import Video from "../models/Video.js";

dotenv.config();

 cloudinary.config({ 
        cloud_name: process.env.API_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
    });
// Signup function 
export async function signUp(req, res){
    try{
        const userchk = await User.find({email: req.body.email});
        if(userchk.length > 0){
            res.status(502).json({"error": "Email exist, please login!"});
        }
        const {name, email, username} = req.body;
        const hashpass = await bcrypt.hash(req.body.password, 10);

        const imgUpload = await cloudinary.uploader.upload(req.files.logo.tempFilePath);
        
        const newUsr = await User.create({
            name:name,
            username: username,
            email: email,
            password: hashpass,
            logoUrl: imgUpload.secure_url,
            logoId: imgUpload.public_id,
        })
        const user = await newUsr.save();
        res.status(200).json({status: "Signed Up", data: user});

    }catch(error){
        console.log(error);
        res.status(403).json({"error": "Server is having bad time please try after some time!"});
    }
}

// login function
export async function logIn(req, res){
    try{
        // check user exist or not
        const email = req.body.email;
        const userFind = await User.find({email: email});
        if(userFind.length == 0){
            return res.status(400).json({"msg": "Email doesn't exist"});
        }
        // if exist create jwt token
        const mainUsr = await User.findById(userFind[0]._id);
        const isValid = await bcrypt.compare(req.body.password, mainUsr.password);
        const isLogged = await (req.headers.authorization);
        if(!isLogged == false){
            return res.status(500).json({"msg": "Already Logged In"})
        }
        if(!isValid){
            return res.status(400).json({"msg": "Password is not valid"})
        }
        const token = jwt.sign({
            _id: mainUsr._id,
            username: mainUsr.username,
            email: mainUsr.email,
            channel: mainUsr.channel,
            logoId: mainUsr.logoId,
        }, process.env.JWT_SECRET, {expiresIn: '10d'});

        return res.status(200).json({"msg": "Logged In", token: token});
    }catch(error){
        console.log(error)
        res.status(502).json({err: error});
    }
}

export async function HandleSubscribe(req, res){
    try{
        console.log(req.headers)
    const user = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
    const userData = await User.findById(user._id)
    const userChannel = await channel.findById(req.params.channelId)
        if(!userChannel){
            return res.status(404).json({msg : "Channel doesnt exist"})
        }
        if(userChannel.owner.equals(userData._id)){
            return res.status(503).json({msg : "feature not available for you"})
        }
        if(userChannel.subscribers.includes(userData._id)){
            userChannel.subscribers.pop(userData._id);
            userChannel.subs > 0 ? userChannel.subs -= 1 : '' ;
            userData.subscribed.pop(req.params.channelId);
            await userChannel.save();
            await userData.save();
            return res.status(400).json({msg: "Unsubscribed"});
        }
        userChannel.subscribers.push(userData._id);
        userChannel.subs += 1;
        userData.subscribed.push(req.params.channelId);
        userChannel.save();
        userData.save();
        return res.status(201).json({msg: "Subscribed"});
    }
    catch(err){
       return res.status(500).json({msg : "Server Error"});
    }
}

export async function HandleUnSubscribe(req, res){
    try{
    const user = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
    const userData = await User.findById(user._id)
    const userChannel = await channel.findById(req.params.channelId)
        if(!userChannel){
            return res.status(500).json("Channel doesnt exist")
        }
        if(userChannel.owner.equals(userData._id)){
            return res.status(400).send("feature not available for you")
        }
        if(userChannel.subscribers.includes(userData._id)){
            userChannel.subscribers.pop(userData._id);
            userChannel.subs > 0 ? userChannel.subs -= 1 : '' ;
            userData.subscribed.pop(req.params.channelId);
            await userChannel.save();
            await userData.save();
            return res.status(400).json({msg: "Unsubscribed"});
        }
        return res.status(201).send("You are not a subscriber of this channel");
    }
    catch(err){
       return res.status(500).json({error : "Server Error"});
    }
}

export async function getUser(req, res){
    try{
        const authCheck = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const userData = await User.findById(authCheck._id);
        const chInfo = await channel.find({owner: authCheck._id});
        const userVids = await Video.find({uploader: authCheck._id})
        const viewdVids = await Video.find({viewedBy: authCheck._id})
        const likedVids = await Video.find({likedBy: authCheck._id})
        const subChannels = await channel.find({_id: userData.subscribed})
        if(!authCheck){
            return res.status(504).json({msg: "Please login"});
        }
        return res.status(201).json({msg: "working fine", data: userData, channel: chInfo, videos: userVids, subd: subChannels, viewd: viewdVids, liked: likedVids});
    }catch(err){
        return res.status(501).json({msg: "Please login"})
    }
}