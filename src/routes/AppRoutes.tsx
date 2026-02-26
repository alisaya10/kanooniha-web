import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import MainLayout from '@/components/layout/MainLayout/MainLayout'
import { PATHS } from './paths'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'

const LoginNationalCodeStep = lazy(() => import('@/pages/Login/NationalCodeStep'))
const LoginPasswordStep = lazy(() => import('@/pages/Login/PasswordStep'))
const LoginResetPasswordStep = lazy(() => import('@/pages/Login/ResetPasswordStep'))
const Dashboard = lazy(() => import('@/pages/Dashboard/Dashboard'))
const Messages = lazy(() => import('@/pages/Messages/Messages'))
const SingleMessage = lazy(() => import('@/pages/Messages/SingleMessage'))
const SingleRequestSupportMessage = lazy(
  () => import('@/pages/Messages/SingleRequestSupportMessage'),
)
const MessageFile = lazy(() => import('@/pages/Messages/MessageFile'))
const News = lazy(() => import('@/pages/News/News'))
const Podcasts = lazy(() => import('@/pages/Podcasts/Podcasts'))
const SinglePodcast = lazy(() => import('@/pages/Podcasts/singlePodcast'))
// const Polls = lazy(() => import('@/pages/Poll'));
const Profile = lazy(() => import('@/pages/Profile/Profile'))
const Records = lazy(() => import('@/pages/Records/Records'))
const MainRecords = lazy(() => import('@/pages/Records/MainRecords'))
const EarlyReportCard = lazy(() => import('@/pages/Records/EarlyReportCard'))
const Events = lazy(() => import('@/pages/Events/Events'))
const Support = lazy(() => import('@/pages/Support/Support'))

// Loading component
const PageLoader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    در حال بارگذاری...
  </div>
)

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route
          path={PATHS.LOGIN_NATIONAL_CODE}
          element={
            <PublicRoute>
              <LoginNationalCodeStep />
            </PublicRoute>
          }
        />
        <Route
          path={PATHS.LOGIN_PASSWORD}
          element={
            <PublicRoute>
              <LoginPasswordStep />
            </PublicRoute>
          }
        />
        <Route
          path={PATHS.LOGIN_RESET_PASSWORD}
          element={
            <PublicRoute>
              <LoginResetPasswordStep />
            </PublicRoute>
          }
        />
        {/* Protected Routes with Layout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path={PATHS.MESSAGE_FILE} element={<MessageFile />} />
          <Route path={PATHS.MESSAGES} element={<Messages />} />
          <Route path={PATHS.NEWS} element={<News />} />
          <Route path={PATHS.PODCASTS} element={<Podcasts />} />
          <Route path={PATHS.SINGLE_PODCAST} element={<SinglePodcast />} />
          <Route path={PATHS.PROFILE} element={<Profile />} />
          <Route path={PATHS.MESSAGE_DETAIL} element={<SingleMessage />} />
          <Route path={PATHS.SUPPORT_DETAIL} element={<SingleRequestSupportMessage />} />
          <Route path={PATHS.Dashboard} element={<Dashboard />} />
          <Route path={PATHS.RECORDS} element={<Records />} />
          <Route path={PATHS.MAIN_RECORDS} element={<MainRecords />} />
          <Route path={PATHS.EVENTS} element={<Events />} />
          {/* <Route path={PATHS.POLLS} element={<Polls />} />
           */}
          <Route path={PATHS.SUPPORT} element={<Support />} />
          <Route path={PATHS.EARLY_REPORT_CARD} element={<EarlyReportCard />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
