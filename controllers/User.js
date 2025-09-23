import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";

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
        res.status(500).send("Something wrong happend!");
    }
}

// login function
export async function logIn(req, res){
    try{
        // check user exist or not
        const email = req.body.email;
        const userFind = await User.find({email: email});
        if(userFind.length == 0){
            res.status(400).json({"msg": "User not found"});
        }
        // if exist create jwt token
        const mainUsr = await User.findById(userFind[0]._id);
        const isValid = await bcrypt.compare(req.body.password, mainUsr.password);
        if(!isValid){
            res.status(400).json({"msg": "Password is not valid"})
        }
        const token = jwt.sign({
            _id: mainUsr._id,
            email: mainUsr.email,
            channel: mainUsr.channel,
            logoId: mainUsr.logoId,
        }, process.env.JWT_SECRET, {expiresIn: '20d'});

        res.status(200).json({token: token});
    }catch(error){
        res.status(500).send("something went wrong");
    }
}