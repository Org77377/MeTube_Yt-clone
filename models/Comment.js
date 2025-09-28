import mongoose from "mongoose";

const commentSch = mongoose.Schema({
    by: {type: mongoose.Schema.Types.ObjectId, required: true},
    videoId: {type: mongoose.Schema.Types.ObjectId, required: true},
    commentText: {type: String, required: true},
    username: {type: String},
    info: {type: Date, default: Date.now()},
    },{timestamps: true})

const Comment = mongoose.model("Comment", commentSch);

export default Comment;