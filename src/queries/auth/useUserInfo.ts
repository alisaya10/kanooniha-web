import { useQuery } from '@tanstack/react-query'

import { fetchUserInfo } from '@/services/api/auth'

export type { UserInfo } from '@/types/api'

export function useUserInfo() {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    staleTime: 5 * 60 * 1000,
  })
}
