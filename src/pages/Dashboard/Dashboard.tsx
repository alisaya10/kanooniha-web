import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import Masonry from 'masonry-layout'

import borderImage from '@/assets/images/border-image.png'
import kanoonLogo from '@/assets/images/kanoon-logo-image.png'
import studentImage from '@/assets/images/student-image.png'
import Button from '@/components/common/Button/Button'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import Modal from '@/components/common/Modal/Modal'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useVersionCheck } from '@/queries/app/useVersionCheck'
import { useAppPromotionList } from '@/queries/appPromotion/useAppPromotionList'
import { useUserInfo } from '@/queries/auth/useUserInfo'
import { useGetInvitationCode } from '@/queries/bookfair/useGetInvitationCode'
import { usePollList } from '@/queries/polls/usePollList'
import { useLastExam } from '@/queries/records/useLastExam'
import { useNextExam } from '@/queries/records/useNextExam'
import { useContentAppItem } from '@/queries/strategicPlanOrTextBook/useContentAppItem'
import { PATHS } from '@/routes/paths'
import { DownloadContentType } from '@/types/api/strategicPlanOrTextBook.types'
import DashboardBookFair from './components/DashboardBookFair'
// import DashboardBook from './components/DashboardBook'
// import DashboardExamStatus from './components/DashboardExamStatus'
import DashboardLastExam from './components/DashboardLastExam'
import DashboardLeagueCard from './components/DashboardLeagueCard'
import DashboardMessages from './components/DashboardMessages'
import DashboardNavigation from './components/DashboardNavigation'
import DashboardNeurohal from './components/DashboardNeurohal'
import DashboardNews from './components/DashboardNews'
import DashboardStrategicPlan from './components/DashboardStrategicPlan'
import DashboardTextBook from './components/DashboardTextBook'
import DashboardUpcomingExam from './components/DashboardUpcomingExam'

// import { useContentAppItem } from '@/queries/strategicPlanOrTextBook/useContentAppItem'
// import { DownloadContentType } from '@/types/api/strategicPlanOrTextBook.types'

const Dashboard = () => {
  const pollModal = useRef<{ open: () => void; close: () => void } | null>(null)
  const size = useWindowSize()

  const { data: userData, isError, isLoading, refetch } = useUserInfo()
  useVersionCheck()
  const { data: pollData = [] } = usePollList()

  const {
    data: nextExamData,
    isLoading: nextExamLoading,
    isError: nextExamError,
  } = useNextExam()
  const {
    data: lastExamData,
    isLoading: lastExamLoading,
    isError: lastExamError,
  } = useLastExam()
  const {
    data: textBookData,
    isLoading: textBookLoading,
    isError: textBookError,
  } = useContentAppItem({ type: DownloadContentType.TextBook })
  const {
    data: strategicPlanData,
    isLoading: strategicPlanLoading,
    isError: strategicPlanError,
  } = useContentAppItem({ type: DownloadContentType.StrategicPlan })
  const {
    data: invitationCode,
    isLoading: bookFairLoading,
    isError: bookFairError,
  } = useGetInvitationCode()
  const {
    data: appPromotionData,
    isLoading: appPromotionLoading,
    isError: appPromotionError,
  } = useAppPromotionList()

  const hasNextExam =
    !nextExamLoading &&
    !nextExamError &&
    !!nextExamData &&
    Object.keys(nextExamData).length !== 0
  const hasLastExam =
    !lastExamLoading &&
    !lastExamError &&
    !!lastExamData &&
    Object.keys(lastExamData).length !== 0
  const hasTextBook = !textBookLoading && !textBookError && !!textBookData
  const hasStrategicPlan =
    !strategicPlanLoading && !strategicPlanError && !!strategicPlanData
  const hasBookFair = !bookFairLoading && !bookFairError && !!invitationCode
  const hasAppPromotion =
    !appPromotionLoading &&
    !appPromotionError &&
    Array.isArray(appPromotionData) &&
    appPromotionData.some((item) => item.isActive)

  useEffect(() => {
    if (Array.isArray(pollData) && pollData.length > 0) {
      pollModal.current?.open()
    }
  }, [pollData])

  const gridRef = useRef<HTMLDivElement>(null)
  const masonryRef = useRef<Masonry | null>(null)
  const isDesktop = size.width >= 1024

  const itemIds = useMemo(() => {
    const ids: string[] = []

    if (hasNextExam) ids.push('upcoming-exam')
    if (hasLastExam) ids.push('last-exam')
    if (hasTextBook) ids.push('text-book')
    if (hasStrategicPlan) ids.push('strategic-plan')
    ids.push('league')
    if (hasAppPromotion) ids.push('neurohal')
    if (hasBookFair) ids.push('book-fair')
    ids.push('news', 'messages')

    return ids
  }, [
    hasNextExam,
    hasLastExam,
    hasTextBook,
    hasStrategicPlan,
    hasAppPromotion,
    hasBookFair,
  ])

  const itemsKey = itemIds.join(',')

  const renderDashboardItem = (id: string) => {
    switch (id) {
      case 'upcoming-exam':
        return <DashboardUpcomingExam />
      case 'last-exam':
        return <DashboardLastExam />
      case 'text-book':
        return <DashboardTextBook />
      case 'strategic-plan':
        return <DashboardStrategicPlan />
      case 'league':
        // return <DashboardLeagueCard />
      case 'neurohal':
        return <DashboardNeurohal />
      case 'book-fair':
        return <DashboardBookFair />
      case 'news':
        return <DashboardNews />
      case 'messages':
        return <DashboardMessages showSeeAll={true} />
      default:
        return null
    }
  }

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || !isDesktop) {
      masonryRef.current?.destroy?.()
      masonryRef.current = null
      return
    }

    const masonry = new Masonry(grid, {
      itemSelector: '.masonry-item',
      columnWidth: '.masonry-sizer',
      percentPosition: true,
      originLeft: false,
      gutter: 24,
    })
    masonryRef.current = masonry

    return () => {
      masonry.destroy?.()
      masonryRef.current = null
    }
  }, [isDesktop])

  useEffect(() => {
    if (!isDesktop) return

    const grid = gridRef.current
    const masonry = masonryRef.current
    if (!grid || !masonry) return

    let rafId = 0
    const timeoutIds: number[] = []

    const layout = () => {
      masonry.reloadItems?.()
      masonry.layout?.()
    }

    const scheduleLayout = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        layout()
        requestAnimationFrame(layout)
      })
    }

    scheduleLayout()
    timeoutIds.push(window.setTimeout(layout, 100))
    timeoutIds.push(window.setTimeout(layout, 400))

    const resizeObserver = new ResizeObserver(scheduleLayout)
    resizeObserver.observe(grid)
    grid.querySelectorAll('.masonry-item').forEach((item) => {
      resizeObserver.observe(item)
    })

    grid.querySelectorAll('img').forEach((img) => {
      if (img.complete) return
      img.addEventListener('load', scheduleLayout, { once: true })
    })

    return () => {
      cancelAnimationFrame(rafId)
      timeoutIds.forEach(clearTimeout)
      resizeObserver.disconnect()
    }
  }, [isDesktop, itemsKey])

  return (
    <div className="bg-white lg:rounded-2xl lg:min-h-full min-h-dvh pb-20">
      <div className="py-4 lg:block hidden">
        <h1 className="font-bold text-lg text-center">داشبورد کاربری</h1>
      </div>
      <img src={borderImage} className="w-full lg:block hidden" alt="border-image" />

      <div className="bg-diagonal-gradient py-6 px-3  rounded-b-2xl flex items-center justify-between lg:hidden">
        {userData && !isError ? (
          <Link
            to={pollData[0]?.isRequired ? PATHS.POLL : PATHS.PROFILE}
            className="flex items-end gap-3"
          >
            <img
              className="w-12 h-12 rounded-full object-cover"
              alt={`student-image`}
              src={userData?.avatar || studentImage}
            />
            <div className="space-y-2">
              <p className="text-white font-demibold text-sm">{userData?.fullName}</p>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-blue-300 rounded-full" />
                <p className="text-white text-xs">{userData?.groupName}</p>
              </div>
            </div>
          </Link>
        ) : (
          <LoaderTryAgainButton
            error={isError}
            borderColor="white"
            textColor="white"
            hasPosition={false}
            isLoading={isLoading}
            onClick={refetch}
            loaderColor="white"
          />
        )}
        <Link to={'https://www.kanoon.ir/'} target="_blank">
          <img className="w-12 h-12" alt={`kanoon-icon-sidebar`} src={kanoonLogo} />
        </Link>
      </div>
      <div>
        <DashboardNavigation />
        <div ref={gridRef} className="lg:mx-6 mx-3 py-6">
          <div
            className="masonry-sizer hidden lg:block lg:w-[calc(50%-12px)]"
            aria-hidden="true"
          />
          {itemIds.map((id) => (
            <div
              key={id}
              className="masonry-item w-full lg:w-[calc(50%-12px)] mb-6 last:mb-0"
            >
              {renderDashboardItem(id)}
            </div>
          ))}
        </div>
      </div>

      <Modal required={pollData[0]?.isRequired} ref={pollModal}>
        <div className="bg-white flex flex-col items-center px-4 py-6 rounded-xl">
          <p className="mb-8 text-base font-bold">کانونی عزیز</p>
          <p className="mb-8 text-base font-thin">نظرسنجی فعالی برای شما وجود دارد</p>
          <div className="flex gap-2">
            <Link to={PATHS.POLL}>
              <Button
                onClick={() => {}}
                className="bg-seeAllBlue text-white min-h-10 text-sm font-demibold"
              >
                شرکت در نظرسنجی
              </Button>
            </Link>
            {!pollData[0]?.isRequired && (
              <Button
                onClick={() => pollModal.current?.close()}
                className="min-h-10 text-sm font-demibold"
              >
                بعدا شرکت میکنم
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Dashboard
