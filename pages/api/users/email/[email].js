import User from '@/models/users';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import mongoose from 'mongoose';

async function UserEmailHandler(req, res) {
  const { method } = req
  const { email } = req.query

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
        const user = await User.findOne({ email })
        if (!user) {
          return res.status(404).json({ success: false })
        }
        res.status(200).json({ success: true, data: user })
        break;
      }
      case 'PATCH': {
        const updatedUser = await User.findOneAndUpdate({ email }, req.body)
        if (!updatedUser) {
          return res.status(404).json({ success: false })
        }
        res.status(200).json({ success: true, data: updatedUser })
        break;
      }
      default: {
        res.setHeader('Allow', ['GET', 'PATCH'])
        res.status(405).json({ success: false })
        break;
      }
    }
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false })
  }
}

export default withApiAuthRequired(UserEmailHandler)
