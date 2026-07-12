import { useMutation } from '@tanstack/react-query'

import { bookFairSubmitProfile } from '@/services/api/auth'

export type {
  BookFairSubmitProfileParams,
  BookFairSubmitProfileResponse,
} from '@/types/api/auth.types'

export function useBookFairSubmitProfile() {
  return useMutation({
    mutationFn: bookFairSubmitProfile,
  })
}
