import { Box, Button, ButtonGroup, FormControl, Stack, Text, Textarea, FormLabel } from "@chakra-ui/react";
import { useState } from "react";

export default function QuestionForm({ onSubmit, onCancel }) {
  const [questionBody, setQuestionBody] = useState('')

  const onClickSubmit = (e) => {
    e.preventDefault()
    onSubmit(questionBody)
    setQuestionBody('')
  }
  const onClickCancel = (e) => {
    e.preventDefault()
    onCancel()
    setQuestionBody('')
  }
  const onChangeQuestionBody = (e) => {
    e.preventDefault()
    setQuestionBody(e.target.value)
  }

  const questionIsInvalid = questionBody === ''

  return <Stack>
    <FormControl isRequired>
      <FormLabel color='white'>Add Question</FormLabel>
      <Textarea color='white' value={questionBody} onChange={onChangeQuestionBody} />
    </FormControl>
    <ButtonGroup>
      <Button color='white' variant='outline' onClick={onClickCancel}>Cancel</Button>
      <Button color='black' onClick={onClickSubmit} isDisabled={questionIsInvalid}>Submit</Button>
    </ButtonGroup>
  </Stack>
}