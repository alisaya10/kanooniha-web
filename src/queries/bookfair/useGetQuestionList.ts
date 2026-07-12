import { useQuery } from '@tanstack/react-query'

import { fetchQuestionList } from '@/services/api/bookFair'

export type { GetQuestionListResponse } from '@/types/api'

export function useGetQuestionList() {
  return useQuery({
    queryKey: ['questionList'],
    queryFn: fetchQuestionList,
    staleTime: 0,
  })
}
