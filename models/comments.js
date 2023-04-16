import mongoose from "mongoose";

export const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  comment: {
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
});

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);