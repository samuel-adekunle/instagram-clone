import axios from 'axios'

function randomFileName(file) {
  const extension = file.type.split('/')[1]
  const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return `${randomString}.${extension}`
}

async function uploadFileToStorageBucket(file, signedURL) {
  const options = {
    headers: {
      'Content-Type': file.type,
    },
  }
  return await axios.put(signedURL, file, options)
}

export async function uploadFile(file, fileNamePrefix=null) {
  let fileName = `${fileNamePrefix || ''}${randomFileName(file)}`
  const { data: urlData } = (await axios.post('/api/upload', {
    fileName, contentType: file.type
  })).data
  const { signedURL, publicURL } = urlData
  await uploadFileToStorageBucket(file, signedURL)
  return publicURL
}