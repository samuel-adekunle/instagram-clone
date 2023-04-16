import Question from '@/models/questions';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import mongoose from 'mongoose';

async function QuestionsHandler(req, res) {
  const { method } = req;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.MONGODB_DB
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false });
  }

  try {
    switch (method) {
      case 'GET': {
        const questions = await Question.find({}, 'user upvotesCount', { sort: { _id: -1 } }).sort({ upvotesCount: -1 });
        const sortedQuestions = questions.sort((a, b) => b.upvotesCount - a.upvotesCount);
        const questionsObject = sortedQuestions.reduce((prev, question) => ({ ...prev, [question._id]: question }), {});
        res.status(200).json({ success: true, data: questionsObject });
        break;
      }
      case 'POST': {
        const question = await Question.create(req.body);
        res.status(201).json({ success: true, data: question });
        break;
      }
      default: {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).json({ success: false });
        break;
      }
    }
  }
  catch (error) {
    console.error(error)
    res.status(400).json({ success: false });
  }
}

export default withApiAuthRequired(QuestionsHandler)