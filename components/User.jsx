import { useUserById } from '@/lib/fetcher'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import { Avatar, Box, Skeleton, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'

function prettyLink(link) {
  return link.replace(/(^\w+:|^)\/\//, '')
}

export function UserProfile({ user, postsCount }) {
  return <Stack spacing='3' justifyContent='center' alignItems='center'>
    <Avatar src={user.profileImage} size='2xl' />
    <Text>{user.name}&nbsp;{user.isVerified && <CheckCircleIcon color='blue' />}</Text>
    {user.isVerified && <Stack direction='row'>
      <Text>{user.followersCount} Subscribers</Text>
      <Text>{postsCount} Posts</Text>
    </Stack>}
    <Text>{user.bio}</Text>
    <Link href={user.link}>
      <LinkIcon />&nbsp;{prettyLink(user.link)}
    </Link>
  </Stack >
}

export function UserComponent({ user: _user }) {
  const { user, error, isLoading } = useUserById(_user._id)
  if (error) return <Box>
    <Text>Error while loading user</Text>
  </Box>
  return isLoading || !user
    ? <Skeleton height='50px' />
    : <Link href={`/${user.username}`}>
      <Stack spacing='3' direction='row'>
        <Avatar src={user.profileImage} />
        <Stack spacing='0'>
          <Text>{user.name}&nbsp;{user.isVerified && <CheckCircleIcon color='blue' />}</Text>
          {user.isVerified && <Text>{user.followersCount} Subscribers</Text>}
        </Stack>
      </Stack>
    </Link>
}