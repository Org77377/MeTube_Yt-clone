import jwt from "jsonwebtoken"
// import { v2 as cloudinary } from "cloudinary";
// import channel from "../models/Channel";

// cloudinary.config({
//     cloud_name: process.env.API_NAME, 
//     api_key: process.env.API_KEY, 
//     api_secret: process.env.API_SECRET
// });

export async function channerCreate(req, res){
    try{
        const user = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        console.log(req.body);
        console.log(req.files);
        // if(user.channel.isCreated == false){
        //     const newData = await channel.create({
        //         channelName: req.body.chanelname,
        //         owner: user._id,
        //         description: req.body.description,
        //         channelBanner: dd,
        //         bannerId: 
        //     })
        // }else{
        //     console.log("Channel Already Exist");
        // }
    }catch(err){
        console.log(err);
    }
}