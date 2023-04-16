import Post from '@/models/posts';
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
        const post = await Post.findById(id);
        if (!post) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: post });
        break;
      }
      default: {
        res.setHeader("Allow", ["GET"]);
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