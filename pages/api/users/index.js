import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import mongoose from 'mongoose';
import User from '@/models/users';

async function UsersHandler(req, res) {
  const { method } = req

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
        const users = await User.find({}, 'followersCount', { sort: { _id: -1 } });
        const sortedUsers = users.sort((a, b) => b.followersCount - a.followersCount);
        res.status(200).json({ success: true, data: sortedUsers });
        break;
      }
      default: {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ success: false });
        break;
      }
    }
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false });
  }
}

export default withApiAuthRequired(UsersHandler)