import QuestionComponent from "@/components/Question";
import QuestionForm from "@/components/QuestionForm";
import { Box, Button, Heading, Stack, useBoolean } from "@chakra-ui/react";
import axios from "axios";
import { useSWRConfig } from "swr";

export default function QuestionsFeed({ questions, user, currentUser }) {
  const { mutate } = useSWRConfig()
  const [formFlag, setFormFlag] = useBoolean(false)

  const onSubmitForm = async (questionBody) => {
    await axios.post('/api/questions', {
      question: questionBody,
      user: user._id,
    })
    await mutate(`/api/users/questions/${user.username}`)
    setFormFlag.off()
  }
  const onCancelForm = () => {
    setFormFlag.off()
  }
  const onUpvote = async (question) => {
    const upvotes = [...question.upvotes, currentUser._id]
    const upvotesCount = upvotes.length
    await axios.patch(`/api/questions/${question._id}`, { upvotes, upvotesCount })
    await mutate(`/api/questions/${question._id}`)
    await mutate(`/api/users/questions/${user.username}`)
  }

  const onDownvote = async (question) => {
    const upvotes = question.upvotes.filter((id) => id !== currentUser._id)
    const upvotesCount = upvotes.length
    await axios.patch(`/api/questions/${question._id}`, { upvotes, upvotesCount })
    await mutate(`/api/questions/${question._id}`)
    await mutate(`/api/users/questions/${user.username}`)
  }

  return <Stack spacing='12'>
    <Heading color='white' textAlign='center'>Q & A</Heading>
    <Box textAlign='center'>
      {formFlag ? <QuestionForm onCancel={onCancelForm} onSubmit={onSubmitForm} /> : <Button color='white' variant='outline' onClick={setFormFlag.toggle}>+ Add Question</Button>}
    </Box>
    <Stack spacing='12'>
      {Object.values(questions).map((question) => <QuestionComponent key={question._id} question={question} currentUser={currentUser} onUpvote={onUpvote} onDownvote={onDownvote} />)}
    </Stack>
  </Stack>
}