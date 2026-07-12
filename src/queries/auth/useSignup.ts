import { useMutation } from '@tanstack/react-query'

import { bookFairSignup } from '@/services/api/auth'

export type { BookFairSignupParams, BookFairSignupResponse } from '@/types/api/auth.types'

export function useSignup() {
  return useMutation({
    mutationFn: bookFairSignup,
  })
}
