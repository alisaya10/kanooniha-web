import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 دقیقه - داده تا این مدت fresh محسوب میشه
      gcTime: 10 * 60 * 1000, // 10 دقیقه (قبلا cacheTime بود)
      refetchOnWindowFocus: false, // وقتی به تب برمیگردی refetch نکنه
      refetchOnReconnect: true, // وقتی اینترنت قطع و وصل شد refetch کنه
      retry: 1, // در صورت خطا 1 بار retry کنه
    },
    mutations: {
      retry: 0,
    },
  },
})

const asyncStorage =
  typeof window !== 'undefined'
    ? {
        getItem: (key: string) => Promise.resolve(window.localStorage.getItem(key)),
        setItem: (key: string, value: string) =>
          Promise.resolve(window.localStorage.setItem(key, value)),
        removeItem: (key: string) => Promise.resolve(window.localStorage.removeItem(key)),
      }
    : undefined

export const queryCachePersister = createAsyncStoragePersister({
  storage: asyncStorage,
  key: 'KANOONIHA_QUERY_CACHE',
})
