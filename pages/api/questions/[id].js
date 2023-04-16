import Question from '@/models/questions';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import mongoose from 'mongoose';

async function PostHandler(req, res) {
  const { method } = req;
  const { id } = req.query;

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
        const question = await Question.findById(id);
        if (!question) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: question });
        break;
      }
      case 'PATCH': {
        const updatedQuestion = await Question.findByIdAndUpdate(id, req.body)
        if (!updatedQuestion) {
          return res.status(404).json({ success: false })
        }
        res.status(200).json({ success: true, data: updatedQuestion })
        break;
      }
      default: {
        res.setHeader("Allow", ["GET", "PATCH"]);
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

export default withApiAuthRequired(PostHandler)