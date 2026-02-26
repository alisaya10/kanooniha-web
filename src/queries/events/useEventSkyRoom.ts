import { useMutation } from '@tanstack/react-query'

import { fetchEventSkyRoom } from '@/services/api/events'

export function useEventSkyRoom() {
  return useMutation({
    mutationFn: ({ roomId, apiType }: { roomId: string; apiType: string }) =>
      fetchEventSkyRoom(roomId, apiType),
    onSuccess: (url) => {
      if (url) {
        window.open(url, '_blank')
      }
    },
  })
}
