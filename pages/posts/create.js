import Footer from '@/components/Footer'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import PostForm from '@/components/PostForm'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Container } from '@chakra-ui/react'

function CreatePostPage({ user: auth0User }) {
  return (
    <>
      <Header title='Create Post | Instagram Clone' />
      <main>
        <NavBar />
        <Container paddingBottom='4'>
          <PostForm />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default withPageAuthRequired(CreatePostPage)
