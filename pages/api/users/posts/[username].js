import Post from '@/models/posts';
import User from '@/models/users';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import mongoose from 'mongoose';

async function PostsHandler(req, res) {
  const { method } = req;
  const { username } = req.query

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
      case 'GET':
        const user = await User.findOne({ username: username });
        if (!user) {
          return res.status(404).json({ success: false });
        }
        const posts = await Post.find({ user: user._id }, 'user likesCount commentsCount', { sort: { _id: -1 } });
        const sortedPosts = posts.sort((a, b) => b.likesCount + b.commentsCount - a.likesCount - a.commentsCount);
        res.status(200).json({ success: true, data: sortedPosts });
        break;
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ success: false });
        break;
    }
  }
  catch (error) {
    console.error(error)
    res.status(400).json({ success: false });
  }
}

export default withApiAuthRequired(PostsHandler)