import { useMutation } from '@tanstack/react-query'

import { submitAnswer } from '@/services/api/bookFair'

export type { SubmitAnswerParams, SubmitAnswerResponse } from '@/types/api'

export function useSubmitAnswer() {
  return useMutation({
    mutationFn: submitAnswer,
  })
}
