import { useMutation } from '@tanstack/react-query'

import { login } from '@/services/api/auth'

export type { LoginParams, LoginResponse } from '@/types/api'

export function useLogin() {
  return useMutation({
    mutationFn: login,
  })
}
