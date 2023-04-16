import { useCurrentUser } from '@/lib/fetcher'
import { AddIcon, ExternalLinkIcon, HamburgerIcon, SearchIcon, SettingsIcon } from '@chakra-ui/icons'
import { Box, Container, Flex, Image, Menu, MenuButton, MenuItem, MenuList, IconButton, Text, Skeleton } from '@chakra-ui/react'
import Link from 'next/link'

export default function NavBar() {
  const { user, error, isLoading } = useCurrentUser()
  if (error) return <Box>
    <Text>Error while loading navbar</Text>
  </Box>
  return <nav>
    <Container>
      <Flex paddingY='4' justifyContent='space-between' alignItems='center'>
        <Link href='/'>
          <Image src='' boxSize='48px' alt='Instagram Clone' borderRadius='full' objectFit='contain' />
        </Link>
        {
          isLoading
            ? <Skeleton width='40px' height='40px' />
            : <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
              />
              <MenuList>
                <Link href={`/${user.username}`}>
                  <MenuItem icon={<SettingsIcon />}>
                    Profile
                  </MenuItem>
                </Link>
                <Link href='/search/users'>
                  <MenuItem icon={<SearchIcon />}>
                    Find Users
                  </MenuItem>
                </Link>
                <Link href='/api/auth/logout'>
                  <MenuItem icon={<ExternalLinkIcon />}>
                    Log out
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>
        }
      </Flex>
    </Container>
  </nav>
}