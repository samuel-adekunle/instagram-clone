import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import NavBar from '@/components/NavBar'
import PostComponent from '@/components/Post'
import { usePost } from '@/lib/fetcher'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Box, Container } from '@chakra-ui/react'
import Error from 'next/error'
import { useRouter } from 'next/router'

function PostPage({ user: auth0User }) {
  const router = useRouter()
  const { id } = router.query
  const { post, error, isLoading } = usePost(id)
  if (isLoading) return <Loading />
  if (error) return <Error statusCode={error.status} />
  if (!post) return <Error statusCode={404} />

  return <>
    <Header title={`${post.title} | Instagram Clone`} />
    <main>
      <NavBar />
      <Box paddingBottom='4'>
        <Container>
          <PostComponent post={post} />
        </Container>
      </Box>
    </main>
    <Footer />
  </>
}

export default withPageAuthRequired(PostPage)