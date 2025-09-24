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


dotenv.config();
const app = express();
const port = 3000;

async function MongoConnect() {
    try{
        const db_conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected")
    }
    catch(err){
        console.log("Something bad happend")
    }
}

MongoConnect();

app.use(bodyParser.json());
app.use(fileUpload({
    useTempFiles: true,
    // tempFileDir: '/tmp/',
}))

app.listen(port, ()=>{
    console.log("server is listening on port", port);
})

app.use("/view", viewRoute);
app.use("/user", userRoute); //signup and login
app.use('/video', videoRoute); //video upload, update, delete, like, dislike
app.use("/channel", channelRoute); //create and delete channel, subscribe, unsubscribe
app.use("/comment", commentRouter); // add, remove, update comments