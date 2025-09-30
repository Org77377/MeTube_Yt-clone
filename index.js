import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoute from "./routes/user.js";
import videoRoute from "./routes/video.js"
import channelRoute from "./routes/channel.js"
import fileUpload from "express-fileupload";
import viewRoute from "./routes/view.js";
import commentRouter from "./routes/comment.js";
import { getVideos } from "./controllers/Video.js";
import cors from "cors";

// initialize environment variables
dotenv.config();
const app = express();
const port = 3000;

// connect to mongoDB database and try for connection if connection fails send offline message
async function MongoConnect(){
    try{
        const db_conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected")
    }
    catch(err){
        console.log("You are offline")
    }
}

// call  the function to connect to the database
MongoConnect();

// middlewares to handle CORS, parse JSON request bodies, and handle file uploads
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({
    useTempFiles: true,
    // tempFileDir: '/tmp/', -- enabled for storing files in temp directory if not using cloudinary
}))

// start the server and listen on the specified port
app.listen(port, ()=>{
    console.log("server is listening on port", port);
})

// route definitions and middleware redirects method and path
app.get("/", getVideos)
app.use("/view", viewRoute);
app.use("/user", userRoute); //signup and login
app.use('/video', videoRoute); //video upload, update, delete, like, dislike
app.use("/channel", channelRoute); //create and delete channel, subscribe, unsubscribe
app.use("/comment", commentRouter); // add, remove, update comments