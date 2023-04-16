import { uploadFile } from '@/lib/upload'
import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, Textarea } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { mutate } from 'swr'

function validateLink(link) {
  if (link === '') return false
  try {
    new URL(link)
    return link.startsWith('http://') || link.startsWith('https://')
  } catch (e) {
    return false
  }
}

export default function UserForm({ user }) {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [link, setLink] = useState('')
  const [profileImageFile, setProfileImageFile] = useState(null)
  const [coverImageFile, setCoverImageFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setName(user.name)
    setBio(user.bio)
    setLink(user.link)
  }, [user])

  const onChangeName = (e) => {
    setName(e.target.value)
  }

  const onChangeBio = (e) => {
    setBio(e.target.value)
  }

  const onChangeLink = (e) => {
    setLink(e.target.value)
  }

  const onChangeProfileImage = (e) => {
    setProfileImageFile(e.target.files[0])
  }

  const onChangeCoverImage = (e) => {
    setCoverImageFile(e.target.files[0])
  }

  const onClickSave = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    let updatedUser = { name, bio, link }
    if (profileImageFile) {
      const profileImageFilePrefix = `profile-${user._id}-`
      const profileImage = await uploadFile(profileImageFile, profileImageFilePrefix)
      updatedUser = { ...updatedUser, profileImage }
    }
    if (coverImageFile) {
      const coverImageFilePrefix = `cover-${user._id}-`
      const coverImage = await uploadFile(coverImageFile, coverImageFilePrefix)
      updatedUser = { ...updatedUser, coverImage }
    }
    await axios.patch(`/api/users/id/${user._id}`, updatedUser)
    await mutate('/api/me')
    await router.push(`/${user.username}`)
    setIsLoading(false)
  }

  const nameIsInvalid = name === ''
  const bioIsInvalid = bio === ''
  const linkIsInvalid = !validateLink(link)

  return <Stack spacing='3'>
    <Heading textAlign='center'>Edit Profile</Heading>
    <Stack>
      <FormControl isReadOnly>
        <FormLabel>Username</FormLabel>
        <Input value={user.username} />
      </FormControl>
      <FormControl isReadOnly>
        <FormLabel>Email</FormLabel>
        <Input value={user.email} />
      </FormControl>
      <FormControl isRequired isInvalid={nameIsInvalid}>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={onChangeName} />
        {
          nameIsInvalid && <FormErrorMessage>Name is required</FormErrorMessage>
        }
      </FormControl>
      <FormControl isRequired isInvalid={bioIsInvalid}>
        <FormLabel>Bio</FormLabel>
        <Textarea value={bio} onChange={onChangeBio} />
        {
          bioIsInvalid && <FormErrorMessage>Bio is required</FormErrorMessage>
        }
      </FormControl>
      <FormControl isRequired isInvalid={linkIsInvalid}>
        <FormLabel>Link</FormLabel>
        <Input value={link} onChange={onChangeLink} type='url' />
        {
          linkIsInvalid && <FormErrorMessage>Link is invalid</FormErrorMessage>
        }
      </FormControl>
      <FormControl>
        <FormLabel>Profile Image</FormLabel>
        <Input type='file' accept='image/*' onChange={onChangeProfileImage} />
      </FormControl>
      <FormControl>
        <FormLabel>Cover Image</FormLabel>
        <Input type='file' accept='image/*' onChange={onChangeCoverImage} />
      </FormControl>
      <Button colorScheme='orange' isDisabled={
        nameIsInvalid || bioIsInvalid || linkIsInvalid
      } isLoading={isLoading} onClick={onClickSave}>
        Save Changes
      </Button>
    </Stack>
  </Stack>
}