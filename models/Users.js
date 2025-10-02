import mongoose from "mongoose";


// user schema where all user details are stored
// shows how the data is stored in database with different fields and type of data
const user_sch = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
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
    channel:{
        channelName: {type: String, default: null},
        isCreated: {type: Boolean, default: false},
        subs: {
            type: Number,
            default: 0,
        },
    },
    logoUrl:{
        type: String,
    },
    logoId: String,
    subscribed: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    ],
},{
    timestamps: true,
});

const User = mongoose.model("User", user_sch);

export default User;