import { useQuery } from '@tanstack/react-query'

import { fetchInspectorInfo } from '@/services/api/support'
import type { InspectorInfoParams } from '@/types/api'

export type { InspectorInfo } from '@/types/api'

export function useInspectorInfo(params: InspectorInfoParams | null) {
  return useQuery({
    queryKey: ['inspectorInfo', params?.officeCode, params?.areaCode],
    queryFn: () => fetchInspectorInfo(params!),
    enabled: params != null,
  })
}
