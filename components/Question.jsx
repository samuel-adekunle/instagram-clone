import { useQuestion } from "@/lib/fetcher";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, IconButton, Skeleton, Stack, Text } from "@chakra-ui/react";

export default function Question({ question: _question, onDownvote, onUpvote, currentUser }) {
  const { question, error, isLoading } = useQuestion(_question._id)
  if (error) return <Box>
    <Text>Error while loading question</Text>
  </Box>

  const onClickUpvote = (e) => {
    e.preventDefault()
    onUpvote(question)
  }
  const onClickDownvote = (e) => {
    e.preventDefault()
    onDownvote(question)
  }

  return isLoading || !question
    ? <Skeleton height='200px' />
    : <Stack>
      <Text color='white'>{question.question}</Text>
      <IconButton aria-label="Upvote" color='white' variant='outline' icon={<ChevronUpIcon />} onClick={onClickUpvote} isDisabled={question.upvotes.includes(currentUser._id)} />
      <Text color='white' textAlign='center'>{question.upvotesCount}</Text>
      <IconButton aria-label="Downvote" color='white' variant='outline' icon={<ChevronDownIcon />} onClick={onClickDownvote} isDisabled={!question.upvotes.includes(currentUser._id)} />
    </Stack>
}