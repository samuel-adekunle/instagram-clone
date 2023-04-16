import { Storage } from '@google-cloud/storage';

const credentialsBuffer = Buffer.from(process.env.APPLICATION_CREDENTIALS, 'base64')
const credentials = JSON.parse(credentialsBuffer.toString('utf-8'))

// fill in your project id
const projectId = '';

const storage = new Storage({
  projectId, credentials
});

export function getPublicURL(filename) {
  return `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${filename}`;
}

export async function getSignedURL(filename, contentType) {
  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: contentType,
  };
  const [url] = await storage
    .bucket(process.env.BUCKET_NAME)
    .file(filename)
    .getSignedUrl(options);
  return url;
}
