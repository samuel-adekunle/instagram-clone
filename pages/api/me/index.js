import User, { getMongodbUser } from '@/models/users';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import mongoose from 'mongoose';

async function CurrentUserHandler(req, res) {
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
        const { user: auth0User } = await getSession(req, res)
        const mongodbUser = await getMongodbUser(User, auth0User);
        res.status(200).json({ success: true, data: mongodbUser })
        break;
      }
      default: {
        res.setHeader("Allow", ["GET"])
        res.status(405).json({ success: false })
        break;
      }
    }
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false })
  }
}

export default withApiAuthRequired(CurrentUserHandler)
