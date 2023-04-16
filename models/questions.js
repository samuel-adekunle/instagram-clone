import mongoose from "mongoose";

export const QuestionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  upvotes: {
    type: [mongoose.Types.ObjectId],
    required: true,
    default: [],
  },
  upvotesCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.models.Question || mongoose.model("Question", QuestionSchema);