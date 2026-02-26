import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import chartIcon from '@/assets/icons/chart-icon.png'
import eventsIcon from '@/assets/icons/events-icon.png'
import fileIcon from '@/assets/icons/file-icon.png'
import messageIcon from '@/assets/icons/message-icon.png'
import micIcon from '@/assets/icons/mic-icon.png'
import newsIcon from '@/assets/icons/news-icon.png'
import supportIcon from '@/assets/icons/support-icon.png'
import widgetIcon from '@/assets/icons/widget-icon.png'
import kanoonLogo from '@/assets/images/kanoon-logo-image.png'
import studentImage from '@/assets/images/student-image.png'
import { useUserInfo } from '@/queries/auth/useUserInfo'
import { useActiveEventCount } from '@/queries/events/useActiveEventCount'
import { PATHS } from '@/routes/paths'

const Sidebar = () => {
  const { data: userData } = useUserInfo()
  const { data: activeEventCount = 0 } = useActiveEventCount()

  const [sideberItems] = useState([
    { name: 'داشبورد کاربری', icon: widgetIcon, link: PATHS.Dashboard },
    { name: 'کارنامه', icon: chartIcon, link: PATHS.RECORDS },
    { name: 'اخبار', icon: newsIcon, link: PATHS.NEWS },
    { name: 'رویداد', icon: eventsIcon, link: PATHS.EVENTS },
    { name: 'پادکست', icon: micIcon, link: PATHS.PODCASTS },
    { name: 'پیام ها', icon: messageIcon, link: PATHS.MESSAGES },
    { name: 'فایل ها', icon: fileIcon, link: PATHS.MESSAGE_FILE },
    { name: 'پشتیبانی', icon: supportIcon, link: PATHS.SUPPORT },
  ])

  const [selectedItem, setSelectedItem] = useState<number>(0)

  useEffect(() => {
    const page = localStorage.getItem('page')
    setSelectedItem(page ? parseInt(page) : 0)
  }, [])

  return (
    <div className="bg-diagonal-gradient w-full sticky top-2 rounded-2xl px-3 pb-4">
      <div className="flex items-center justify-between pt-6 pb-[62px]">
        <Link to={PATHS.PROFILE} className="flex items-center gap-3">
          <img
            className="w-[62px] h-[62px] rounded-full object-cover"
            alt="student-image"
            src={userData?.avatar || studentImage}
          />
          <div>
            <p className="text-white font-demibold text-base">{userData?.fullName}</p>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-blue-300 rounded-full" />
              <p className="text-white text-sm">{userData?.groupName}</p>
            </div>
          </div>
        </Link>
        <Link to={'https://www.kanoon.ir/'}>
          <img
            className="w-[62px] h-[62px]"
            alt={`kanoon-icon-sidebar`}
            src={kanoonLogo}
          />
        </Link>
      </div>
      <div className="w-full">
        {sideberItems.map((prop, index) => (
          <Link key={index} to={prop.link}>
            <div
              key={index}
              onClick={() => {
                setSelectedItem(index)
                localStorage.setItem('page', index.toString())
              }}
              className={`border-2 ${selectedItem == index ? 'bg-white border-blue-800' : ' bg-blue-50 border-transparent'}  p-3 w-full rounded-xl flex items-center gap-3 cursor-pointer mb-4`}
            >
              <div className="w-12 h-12 border rounded-full border-blue-800 flex items-center justify-center">
                <img className="w-8 h-8" alt={`sidebar-item-${index}`} src={prop.icon} />
              </div>
              <p className="font-demibold text-base text-blue-900">{prop.name}</p>
              {index == 3 && (
                <div className="bg-red-500 w-5 h-5 flex items-center justify-center rounded-full">
                  <p className="text-white">{activeEventCount}</p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
