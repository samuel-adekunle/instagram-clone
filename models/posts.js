import mongoose from "mongoose";

export const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    required: true,
    default: [],
  },
  likesCount: {
    type: Number,
    required: true,
    default: 0,
  },
  comments: {
    type: [mongoose.Types.ObjectId],
    required: true,
    default: [],
  },
  commentsCount: {
    type: Number,
    required: true,
    default: 0,
  },
  mediaURL: {
    type: String,
    required: false,
  },
  mediaType: {
    type: String,
    required: false,
  },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);