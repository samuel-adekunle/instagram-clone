import PostComponent from '@/components/Post'
import { Heading, Stack, StackDivider } from '@chakra-ui/react'

export default function PostFeed({ posts }) {
  return <Stack spacing='4'>
    <Heading textAlign='center'>Posts</Heading>
    <Stack divider={<StackDivider />}>
      {posts.map((post) => <PostComponent key={post._id} post={post} />)}
    </Stack>
  </Stack>

}