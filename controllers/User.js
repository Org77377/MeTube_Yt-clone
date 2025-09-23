import User from "../models/Users.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";

dotenv.config();

 cloudinary.config({ 
        cloud_name: process.env.API_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
    });

export async function signUp(req, res){
    try{
        const userchk = await User.find({email: req.body.email});
        if(userchk.length > 0){
            res.status(500).json({"error": "Email already exist"});
        }
        const {name, email, channel} = req.body;
        const hashpass = await bcrypt.hash(req.body.password, 10);
        const imgUpload = await cloudinary.uploader.upload(req.files.logo.tempFilePath);
        
        const newUsr = await User.create({
            name:name,
            email: email,
            password: hashpass,
            channel: channel,
            logoUrl: imgUpload.secure_url,
            logoId: imgUpload.public_id,
        })
        const user = await newUsr.save();
        res.status(200).send("Signed Up", email);

    }catch(error){
        console.log(error);
        res.send("failed");
    }
}