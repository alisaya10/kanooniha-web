import { useQuery } from '@tanstack/react-query'

import { fetchPastRecords } from '@/services/api/records'

export type { PastRecordItem, PastRecordsResponse } from '@/types/api'

export function usePastRecordsList() {
  return useQuery({
    queryKey: ['pastRecordsList'],
    queryFn: fetchPastRecords,
    staleTime: 2 * 60 * 1000,
  })
}
