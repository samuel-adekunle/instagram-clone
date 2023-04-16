import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import NavBar from '@/components/NavBar'
import UserForm from '@/components/UserForm'
import { useCurrentUser } from '@/lib/fetcher'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Container } from '@chakra-ui/react'
import Error from 'next/error'

function EditUserPage({ user: auth0User }) {
  const { user, error, isLoading } = useCurrentUser()
  if (isLoading) return <Loading />
  if (error) return <Error statusCode={error.statusCode} />
  return (
    <>
      <Header title='Edit Profile | Instagram Clone' />
      <main>
        <NavBar />
        <Container paddingBottom='4'>
          <UserForm user={user} />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default withPageAuthRequired(EditUserPage)