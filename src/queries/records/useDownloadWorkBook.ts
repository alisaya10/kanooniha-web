import { useMutation } from '@tanstack/react-query'

import { fetchDownloadWorkBook } from '@/services/api/records'

export type { WorkBookDownloadResponse } from '@/types/api'

export type DownloadWorkBookParams = {
  kind: string
  dateValue: string
}

export function useDownloadWorkBook() {
  return useMutation({
    mutationFn: ({ kind, dateValue }: DownloadWorkBookParams) =>
      fetchDownloadWorkBook(kind, dateValue ?? ''),
  })
}
