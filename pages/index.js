import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import NavBar from '@/components/NavBar'
import PostFeed from '@/components/PostFeed'
import { useCurrentUserFeed } from '@/lib/fetcher'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Box, Container } from '@chakra-ui/react'
import Error from 'next/error'

function HomePage({ user: auth0User }) {
  const { posts, error, isLoading } = useCurrentUserFeed()
  if (isLoading) return <Loading />
  if (error) return <Error statusCode={error.status} />

  return (
    <>
      <Header title='Home | Instagram Clone' />
      <main>
        <NavBar />
        <Box paddingBottom='4'>
          <Container>
            <PostFeed posts={posts} />
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  )
}

export default withPageAuthRequired(HomePage)
