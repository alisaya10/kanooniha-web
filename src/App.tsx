import { HashRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

import { SplashScreen } from './components/SplashScreen'
import { queryCachePersister, queryClient } from './queries/queryClient'
import { AppRoutes } from './routes'

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: queryCachePersister }}
    >
      <SplashScreen />
      <HashRouter>
        <AppRoutes />
      </HashRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  )
}

export default App
