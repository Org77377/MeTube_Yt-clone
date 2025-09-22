import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import dotenv from "dotenv";

const app = express();
const port = 3000;
dotenv.config();
app.use(express.json());

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

app.listen(port, ()=>{
    console.log("server is listening");
})

app.use("/user", userRoute);