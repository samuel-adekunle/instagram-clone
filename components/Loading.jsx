import { Container, Spinner } from '@chakra-ui/react'

export default function Loading() {
  return <Container centerContent paddingY='40vh' paddingX='40vw'>
    <Spinner size='xl'/>
  </Container>
}