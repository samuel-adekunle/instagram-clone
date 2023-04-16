import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Stack, Textarea } from "@chakra-ui/react";
import { useCurrentUser } from "@/lib/fetcher";
import Loading from "./Loading";
import Error from "next/error";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { uploadFile } from "@/lib/upload";

export default function PostForm({ user: auth0User }) {
  const { user, error, isLoading } = useCurrentUser();
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [mediaType, setMediaType] = useState('')
  const [mediaFile, setMediaFile] = useState(null)
  const [submitIsLoading, setSubmitIsLoading] = useState(false)
  const router = useRouter()

  const mediaTypeOptions = ["Image", "Video"]

  const titleIsInvalid = title === ''
  const bodyIsInvalid = body === ''
  const isMediaEnabled = mediaType !== ''


  const onChangeTitle = (e) => {
    e.preventDefault()
    setTitle(e.target.value)
  }

  const onChangeBody = (e) => {
    e.preventDefault()
    setBody(e.target.value)
  }

  const onChangeMediaType = (e) => {
    e.preventDefault()
    setMediaType(e.target.value)
  }

  const onChangeMediaFile = (e) => {
    e.preventDefault()
    setMediaFile(e.target.files[0])
  }

  const onClickSubmit = async (e) => {
    e.preventDefault()
    setSubmitIsLoading(true)
    let data = { title, body, user: user._id }
    if (isMediaEnabled) {
      const postMediaFilePrefix = `post-${mediaType.toLowerCase()}-`
      const publicURL = await uploadFile(mediaFile, postMediaFilePrefix)
      data = { ...data, mediaType, mediaURL: publicURL }
    }
    const { data: newPost } = (await axios.post('/api/posts', data)).data
    await router.push(`/posts/${newPost._id}`)
    setSubmitIsLoading(false)
    setTitle('')
    setBody('')
    setMediaType('')
    setMediaFile(null)
  }

  if (isLoading) return <Loading />
  if (error) return <Error statusCode={error.statusCode} />

  return <Stack spacing='4'>
    <Heading textAlign='center'>Create New Post</Heading>
    <Stack spacing='3'>
      <FormControl isInvalid={titleIsInvalid} isRequired>
        <FormLabel>Title</FormLabel>
        <Input placeholder='Enter post title' value={title} onChange={onChangeTitle} />
        {
          titleIsInvalid && <FormErrorMessage>Title is required</FormErrorMessage>
        }
      </FormControl>
      <FormControl isInvalid={bodyIsInvalid} isRequired>
        <FormLabel>Body</FormLabel>
        <Textarea placeholder='Enter post body' value={body} onChange={onChangeBody} />
        {
          titleIsInvalid && <FormErrorMessage>Body is required</FormErrorMessage>
        }
      </FormControl>
      <FormControl>
        <FormLabel>Media Type</FormLabel>
        <Select placeholder='Select media type' onChange={onChangeMediaType}>
          {
            mediaTypeOptions.map((option) => <option key={option} value={option.toLowerCase()}>{option}</option>)
          }
        </Select>
      </FormControl>
      <FormControl isDisabled={!isMediaEnabled}>
        <FormLabel>Upload media</FormLabel>
        <Input type="file" accept={`${mediaType.toLowerCase()}/*`} onChange={onChangeMediaFile} />
      </FormControl>
      <Button variant='solid' colorScheme='orange' isDisabled={titleIsInvalid || bodyIsInvalid} onClick={onClickSubmit} isLoading={submitIsLoading}>
        Submit
      </Button>
    </Stack>
  </Stack>
}