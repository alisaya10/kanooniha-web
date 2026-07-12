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
  () => import('@/pages/Support/SingleRequestSupportMessage'),
)
const MessageFile = lazy(() => import('@/pages/Messages/MessageFile'))
const News = lazy(() => import('@/pages/News/News'))
const Podcasts = lazy(() => import('@/pages/Podcasts/Podcasts'))
const SinglePodcast = lazy(() => import('@/pages/Podcasts/singlePodcast'))
const Profile = lazy(() => import('@/pages/Profile/Profile'))
const Records = lazy(() => import('@/pages/Records/Records'))
const MainRecords = lazy(() => import('@/pages/Records/MainRecords'))
const EarlyReportCard = lazy(() => import('@/pages/Records/EarlyReportCard'))
const Events = lazy(() => import('@/pages/Events/Events'))
const Support = lazy(() => import('@/pages/Support/Support'))
const Poll = lazy(() => import('@/pages/Poll/Poll'))

const Videos = lazy(() => import('@/pages/Videos/Videos'))
const SingleVideo = lazy(() => import('@/pages/Videos/singleVideo'))

const BookFairLoginPhone = lazy(() => import('@/pages/BookFair/BookFairLoginPhone'))
const BookFairLoginCode = lazy(() => import('@/pages/BookFair/BookFairLoginCode'))
const BookFairLoginInfo = lazy(() => import('@/pages/BookFair/‌BookFairSignupInfo'))
const BookFairSlider = lazy(() => import('@/pages/BookFair/BookFairSlider'))

const Gift = lazy(() => import('@/pages/Gift/Gift'))

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
          path={PATHS.SIGNUP_BOOK_FAIR}
          element={
            <PublicRoute>
              <BookFairLoginPhone />
            </PublicRoute>
          }
        />
        <Route
          path={PATHS.SIGNUP_BOOK_FAIR_CODE}
          element={
            <PublicRoute>
              <BookFairLoginCode />
            </PublicRoute>
          }
        />
        <Route
          path={PATHS.SIGNUP_BOOK_FAIR_INFO}
          element={
            <ProtectedRoute isBookFair={true}>
              <BookFairLoginInfo />
            </ProtectedRoute>
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
        <Route
          path={PATHS.SIGNUP_BOOK_FAIR}
          element={
            <PublicRoute>
              <BookFairLoginPhone />
            </PublicRoute>
          }
        />
        <Route
          path={PATHS.SIGNUP_BOOK_FAIR_SLIDER}
          element={
            <ProtectedRoute isBookFair={true}>
              <BookFairSlider />
            </ProtectedRoute>
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
          <Route path={PATHS.POLL} element={<Poll />} />
          <Route path={PATHS.Dashboard} element={<Dashboard />} />
          <Route path={PATHS.RECORDS} element={<Records />} />
          <Route path={PATHS.MAIN_RECORDS} element={<MainRecords />} />
          <Route path={PATHS.EVENTS} element={<Events />} />
          <Route path={PATHS.SUPPORT} element={<Support />} />
          <Route path={PATHS.VIDEOS} element={<Videos />} />
          <Route path={PATHS.GIFT} element={<Gift />} />
          <Route path={PATHS.SINGLE_VIDEO} element={<SingleVideo />} />
          <Route path={PATHS.EARLY_REPORT_CARD} element={<EarlyReportCard />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
