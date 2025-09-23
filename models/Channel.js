import mongoose from "mongoose";

const channelSch = new mongoose.Schema({
    channelName: {type: String, required: true},
    owner:{type: mongoose.Schema.Types.ObjectId},
    description: {type: String, required: true},
    channelBanner: String,
    bannerId: String,
    subs: {type: Number, default: 0},
    videos: [{type: mongoose.Schema.Types.ObjectId}],
}, {timestamps: true})

const channel = mongoose.model("channel", channelSch);

export default channel;

