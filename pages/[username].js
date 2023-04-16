import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import NavBar from '@/components/NavBar'
import PostFeed from '@/components/PostFeed'
import QuestionFeed from '@/components/QuestionFeed'
import { UserProfile } from '@/components/User'
import { useCurrentUser, useUserByUsername, useUserPosts, useUserQuestions } from '@/lib/fetcher'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { AddIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Container, Image, Stack } from '@chakra-ui/react'
import axios from 'axios'
import Error from 'next/error'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSWRConfig } from 'swr'

function UserPage({ user: auth0User }) {
  const router = useRouter()
  const { username } = router.query
  const { user: currentUser, error: currentUserError, isLoading: currentUserIsLoading } = useCurrentUser()
  const { user, error: userError, isLoading: userIsLoading } = useUserByUsername(username)
  const { posts, error: postsError, isLoading: postsIsLoading } = useUserPosts(username)
  const { questions, error: questionsError, isLoading: questionsIsLoading } = useUserQuestions(username)
  const { mutate } = useSWRConfig()
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    if (currentUser && user) {
      setIsSubscribed(currentUser.following.includes(user._id))
    }
  }, [currentUser, user])

  const onClickViewPosts = (e) => {
    e.preventDefault()
    document.getElementById('posts').scrollIntoView({ behavior: 'smooth' })
  }

  const onClickSubscribe = async (e) => {
    e.preventDefault()
    let followers = user.followers
    let following = currentUser.following
    if (isSubscribed) {
      followers = user.followers.filter((id) => id !== currentUser._id)
      following = currentUser.following.filter((id) => id !== user._id)
    } else {
      followers = [...user.followers, currentUser._id]
      following = [...currentUser.following, user._id]
    }
    const followersCount = followers.length
    const followingCount = following.length
    await axios.patch(`/api/users/username/${username}`, {
      followers, followersCount
    })
    await mutate(`/api/users/username/${username}`)
    await axios.patch(`/api/users/username/${currentUser.username}`, {
      following, followingCount
    })
    await mutate(`api/me`)
    setIsSubscribed(!isSubscribed)
  }

  if (currentUserIsLoading || userIsLoading || postsIsLoading || questionsIsLoading) return <Loading />
  if (currentUserError) return <Error statusCode={currentUserError.status} />
  if (userError) return <Error statusCode={userError.status} />
  if (postsError) return <Error statusCode={postsError.status} />
  if (questionsError) return <Error statusCode={questionsError.status} />
  if (!user) return <Error statusCode={404} />

  const isCurrentUser = user._id === currentUser._id

  return (
    <>
      <Header title={`${user.name} | Instagram Clone`} />
      <main>
        <NavBar />
        <Box>
          <Image src={user.coverImage} alt='cover image' width='100%' maxHeight='50vh' objectFit='cover' />
          <Container position='relative' top={`-${128 / 2}px`}>
            <Stack spacing='4'>
              <UserProfile user={user} postsCount={posts.length} />
              <Box textAlign='center'>
                {
                  isCurrentUser
                    ? <ButtonGroup>
                      {user.isVerified && <Link href='/posts/create'>
                        <Button colorScheme='orange'><AddIcon />&nbsp;Create post</Button>
                      </Link>}
                      <Link href='/settings/user'>
                        <Button><EditIcon />&nbsp;Edit profile</Button>
                      </Link>
                    </ButtonGroup>
                    : <ButtonGroup>
                      <Button onClick={onClickViewPosts} colorScheme='orange'>View posts</Button>
                      <Button onClick={onClickSubscribe}>
                        {isSubscribed
                          ? 'Unsubscribe'
                          : 'Subscribe'}
                      </Button>
                    </ButtonGroup>
                }
              </Box>
            </Stack>
          </Container>
        </Box>
        {user.isVerified && <Box bg='#1B69E4' paddingY='12'>
          <Container>
            <QuestionFeed questions={questions} user={user} currentUser={currentUser} />
          </Container>
        </Box>}
        {user.isVerified && (isCurrentUser || isSubscribed) && <Box id='posts' paddingY='4'>
          <Container>
            <PostFeed posts={posts} />
          </Container>
        </Box>}
      </main>
      <Footer />
    </>
  )
}

export default withPageAuthRequired(UserPage)
