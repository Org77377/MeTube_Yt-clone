import mongoose from "mongoose";

const user_sch = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    channel:[{
        channelName: String,
        isCreated: false,
        subs: {
            type: Number,
            default: 0,
        },
    }],
    logoUrl:{
        type: String,
    },
    logoId:String,
    subscribed: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    ],
});

const User = mongoose.model("User", user_sch);

export default User;