import { HashRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'

import { SplashScreen } from './components/SplashScreen'
import { queryCachePersister, queryClient } from './queries/queryClient'
import { AppRoutes } from './routes'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
)

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
      <ToastContainer
        containerId="bookfair"
        // position="top-center"
        autoClose={3000}
        rtl
        newestOnTop
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  )
}

export default App
