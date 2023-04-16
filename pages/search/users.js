import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import NavBar from '@/components/NavBar'
import UserFeed from '@/components/UserFeed'
import { useCurrentUser, useVerifiedUsers } from '@/lib/fetcher'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Container } from '@chakra-ui/react'
import Error from 'next/error'

function SearchUsersPage({ user: auth0User }) {
  const { users, error, isLoading } = useVerifiedUsers()
  const { user: me, error: meError, isLoading: meIsLoading } = useCurrentUser()

  if (isLoading || meIsLoading) return <Loading />
  if (error) return <Error statusCode={error.statusCode} />
  if (meError) return <Error statusCode={meError.statusCode} />

  const filteredUsers = users.filter((user) => user._id !== me._id)

  return (
    <>
      <Header title='Search Users | Instagram Clone' />
      <main>
        <NavBar />
        <Container paddingBottom='4'>
          <UserFeed users={filteredUsers} />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default withPageAuthRequired(SearchUsersPage)