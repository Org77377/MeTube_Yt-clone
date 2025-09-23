import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoute from "./routes/user.js";
import videoRoute from "./routes/video.js"
import channelRoute from "./routes/channel.js"
import fileUpload from "express-fileupload";

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

app.use("/user", userRoute);
app.use('/video', videoRoute);
app.use("/channel", channelRoute);