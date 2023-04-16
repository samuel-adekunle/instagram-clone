import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export function useCurrentUser() {
  const { data, error, isLoading } = useSWR(`/api/me`, fetcher)

  return {
    user: data && data.data,
    error,
    isLoading,
  }
}

export function useCurrentUserFeed() {
  const { data, error, isLoading } = useSWR(`/api/me/feed`, fetcher)

  return {
    posts: data && data.data,
    error,
    isLoading,
  }
}

export function useUsers() {
  const { data, error, isLoading } = useSWR(`/api/users`, fetcher)

  return {
    users: data && data.data,
    error,
    isLoading,
  }
}

export function useVerifiedUsers() {
  const { data, error, isLoading } = useSWR(`/api/users/verified`, fetcher)

  return {
    users: data && data.data,
    error,
    isLoading,
  }
}

export function useUserById(id) {
  const { data, error, isLoading } = useSWR(`/api/users/id/${id}`, fetcher)

  return {
    user: data && data.data,
    error,
    isLoading,
  }
}

export function useUserByUsername(username) {
  const { data, error, isLoading } = useSWR(`/api/users/username/${username}`, fetcher)

  return {
    user: data && data.data,
    error,
    isLoading,
  }
}

export function useUserByEmail(email) {
  const { data, error, isLoading } = useSWR(`/api/users/email/${email}`, fetcher)

  return {
    user: data && data.data,
    error,
    isLoading,
  }
}

export function useUserPosts(username) {
  const { data, error, isLoading } = useSWR(`/api/users/posts/${username}`, fetcher)

  return {
    posts: data && data.data,
    error,
    isLoading,
  }
}

export function useUserQuestions(username) {
  const { data, error, isLoading } = useSWR(`/api/users/questions/${username}`, fetcher)

  return {
    questions: data && data.data,
    error,
    isLoading,
  }
}

export function usePosts() {
  const { data, error, isLoading } = useSWR(`/api/posts`, fetcher)

  return {
    posts: data && data.data,
    error,
    isLoading,
  }
}

export function usePost(id) {
  const { data, error, isLoading } = useSWR(`/api/posts/${id}`, fetcher)

  return {
    post: data && data.data,
    error,
    isLoading,
  }
}

export function useQuestions() {
  const { data, error, isLoading } = useSWR(`/api/questions`, fetcher)

  return {
    questions: data && data.data,
    error,
    isLoading,
  }
}

export function useQuestion(id) {
  const { data, error, isLoading } = useSWR(`/api/questions/${id}`, fetcher)

  return {
    question: data && data.data,
    error,
    isLoading,
  }
}

export default fetcher;