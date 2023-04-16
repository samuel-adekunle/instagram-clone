import { getPublicURL, getSignedURL } from '@/lib/storage';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import mongoose from 'mongoose';

async function UploadHandler(req, res) {
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
      case 'POST': {
        const { fileName, contentType } = req.body;
        const publicURL = getPublicURL(fileName);
        const signedURL = await getSignedURL(fileName, contentType);
        res.status(200).json({ success: true, data: { signedURL, publicURL } });
        break;
      }
      default: {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ success: false });
        break;
      }
    }
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false });
  }
}

export default withApiAuthRequired(UploadHandler)