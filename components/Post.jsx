import { usePost, useUserById } from '@/lib/fetcher'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { Avatar, Box, Heading, Image, Skeleton, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'

function Video({ src, alt }) {
  return <Box
    as='video'
    controls
    src={src}
    alt={alt}
    width='100%'
    objectFit='contain'
  />
}

export default function Post({ post: _post }) {
  const { user, error: userError, isLoading: userIsLoading } = useUserById(_post.user)
  const { post, error: postError, isLoading: postIsLoading } = usePost(_post._id)
  if (userError || postError) return <Box>
    <Text>Error while loading posts</Text>
  </Box>

  return <Box border='2px'>
    {
      userIsLoading || !user
        ? <Skeleton height='50px' />
        : <Link href={`/${user.username}`}>
          <Stack direction='row' display='flex' alignItems='center' spacing='3' p='3' borderBottom='2px'>
            <Avatar src={user.profileImage} />
            <Text>{user.name}&nbsp;{user.isVerified && <CheckCircleIcon color='blue' />}</Text>
          </Stack>
        </Link>
    }
    {
      postIsLoading || !post
        ? <Skeleton height='300px' />
        : <>
          <Box padding='3'>
            <Stack>
              <Heading>{post.title}</Heading>
              <Text>{post.body}</Text>
            </Stack>
          </Box>
          {post.mediaURL && <Box>
            {
              post.mediaType === 'video'
                ? <Video src={post.mediaURL} alt='' />
                : <Image src={post.mediaURL} alt='' />
            }
          </Box>}
        </>
    }
  </Box>
}