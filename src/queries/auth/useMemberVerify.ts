import { useMutation } from '@tanstack/react-query'

import { memberVerify } from '@/services/api/auth'

export type { MemberVerifyParams, MemberVerifyResponse } from '@/types/api/auth.types'

export function useMemberVerify() {
  return useMutation({
    mutationFn: memberVerify,
  })
}
