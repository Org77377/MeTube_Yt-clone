import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  videoUrl: { type: String, required: true },
  videoId: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  thumbnaiId: String,
  category: String,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now },
  likedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  viewedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
},{
  timestamps: true,
}
);

const Video = mongoose.model('Video', videoSchema);

export default Video;
