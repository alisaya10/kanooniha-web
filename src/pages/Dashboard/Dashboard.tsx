import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import borderImage from '@/assets/images/border-image.png'
import kanoonLogo from '@/assets/images/kanoon-logo-image.png'
import Button from '@/components/common/Button/Button'
import Modal from '@/components/common/Modal/Modal'
import { useVersionCheck } from '@/queries/app/useVersionCheck'
import { useUserInfo } from '@/queries/auth/useUserInfo'
import { usePollList } from '@/queries/polls/usePollList'
import { PATHS } from '@/routes/paths'
import DashboardLastExam from './components/DashboardLastExam'
import DashboardMessages from './components/DashboardMessages'
import DashboardNavigation from './components/DashboardNavigation'
import DashboardNews from './components/DashboardNews'
import DashboardUpcomingExam from './components/DashboardUpcomingExam'

// import DashboardExamStatus from './components/DashboardExamStatus'

const Dashboard = () => {
  const pollModal = useRef<{ open: () => void; close: () => void } | null>(null)

  const { data: userData } = useUserInfo()
  useVersionCheck()
  const { data: pollData = [] } = usePollList()

  useEffect(() => {
    if (Array.isArray(pollData) && pollData.length > 0) {
      pollModal.current?.open()
    }
  }, [pollData])

  return (
    <div className="bg-white lg:rounded-2xl lg:min-h-full min-h-dvh pb-20">
      <div className="py-4 lg:block hidden">
        <h1 className="font-bold text-lg text-center">داشبورد کاربری</h1>
      </div>
      <img src={borderImage} className="w-full lg:block hidden" alt="" />

      <div className="bg-diagonal-gradient py-6 px-3  rounded-b-2xl flex items-center justify-between lg:hidden">
        <Link to={PATHS.PROFILE} className="flex items-end gap-3">
          <img
            className="w-12 h-12 rounded-full object-cover"
            alt={`student-image`}
            src={userData?.avatar}
          />
          <div className="space-y-2">
            <p className="text-white font-demibold text-sm">{userData?.fullName}</p>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-blue-300 rounded-full" />
              <p className="text-white text-xs">{userData?.groupName}</p>
            </div>
          </div>
        </Link>
        <img className="w-12 h-12" alt={`kanoon-icon-sidebar`} src={kanoonLogo} />
      </div>

      <div className="bg-white lg:rounded-2xl pb-20 lg:h-full">
        <DashboardNavigation />
        <div className="space-y-6 py-6 lg:px-6 px-3">
          <div className="grid lg:grid-cols-2 gap-6">
            <DashboardLastExam />
            <DashboardUpcomingExam />
          </div>
          {/* <div className="grid lg:grid-cols-2 gap-6">
            <DashboardExamStatus />
          </div> */}
          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
            <DashboardNews />
            <DashboardMessages showSeeAll={true} />
          </div>
        </div>
      </div>

      <Modal required={pollData[0]?.isRequired} ref={pollModal}>
        <div className="bg-white flex flex-col items-center px-4 py-6 rounded-xl">
          <p className="mb-8 text-base font-bold">کانونی عزیز</p>
          <p className="mb-8 text-base font-thin">نظرسنجی فعالی برای شما وجود دارد</p>
          <div style={{ display: 'flex', gap: 8 }}>
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
