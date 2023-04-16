import { UserComponent } from "@/components/User";
import { Heading, Stack, StackDivider } from "@chakra-ui/react";

export default function UserFeed({ users }) {
  return <Stack spacing='4'>
    <Heading textAlign='center'>Users</Heading>
    <Stack spacing='4' divider={<StackDivider />}>
      {users.map(user => <UserComponent key={user._id} user={user} />)}
    </Stack>
  </Stack>
}
