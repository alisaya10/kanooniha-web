import { useQuery } from '@tanstack/react-query'

import { fetchInvitationCode } from '@/services/api/bookFair'

export type { GetInvitationGiftResponse } from '@/types/api'

export function useGetInvitationCode() {
  return useQuery({
    queryKey: ['InvitationCode'],
    queryFn: fetchInvitationCode,
    staleTime: 0,
  })
}
