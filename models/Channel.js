import mongoose from "mongoose";

// complete schema for channel
// shows how the data is stored in database with different fields and type of data
const channelSch = new mongoose.Schema({
    channelName: {type: String, required: true},
    owner:{type: mongoose.Schema.Types.ObjectId},
    description: {type: String, required: true},
    channelBanner: String,
    bannerId: String,
    subs: {type: Number, default: 0},
    subscribers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    videos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Video'}],
}, {timestamps: true})

const channel = mongoose.model("channel", channelSch);

export default channel;

