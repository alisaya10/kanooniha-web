import { useState } from 'react'
import { Link } from 'react-router-dom'

import chartIcon from '@/assets/icons/chart-icon.png'
import eventsIcon from '@/assets/icons/events-icon.png'
import fileIcon from '@/assets/icons/file-icon.png'
import messageIcon from '@/assets/icons/message-icon.png'
import micIcon from '@/assets/icons/mic-icon.png'
import newsIcon from '@/assets/icons/news-icon.png'
import profileIcon from '@/assets/icons/profile-icon.png'
import { useActiveEventCount } from '@/queries/events/useActiveEventCount'
import { PATHS } from '@/routes/paths'

const DashboardNavigation = () => {
  const { data: activeEventCount = 0 } = useActiveEventCount()

  const [sideberRowOne] = useState([
    { name: 'کارنامه', icon: chartIcon, link: PATHS.RECORDS },
    { name: 'اخبار', icon: newsIcon, link: PATHS.NEWS },
    { name: 'فایل ها', icon: fileIcon, link: PATHS.MESSAGE_FILE },
  ])

  const [sideberRowTwo] = useState([
    { name: 'پادکست', icon: micIcon, link: PATHS.PODCASTS },
    { name: 'پیام ها', icon: messageIcon, link: PATHS.MESSAGES },
    { name: 'پروفایل', icon: profileIcon, link: PATHS.PROFILE },
    { name: 'رویداد ها', icon: eventsIcon, link: PATHS.EVENTS },
  ])

  return (
    <div className="space-y-3 lg:px-6 px-3 pt-6 lg:hidden">
      <div className="grid grid-cols-3 gap-3">
        {sideberRowOne.map((prop, index) => (
          <Link
            key={index}
            to={prop.link}
            className="bg-textBlue50 py-[21px] rounded-xl flex flex-col items-center justify-center space-y-3"
          >
            <div className="w-12 h-12 border rounded-full border-blue-800 flex items-center justify-center">
              <img className="w-8 h-8" alt={`sidebar-item-${index}`} src={prop.icon} />
            </div>
            <p className="font-bold text-textBlue950 text-sm">{prop.name}</p>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {sideberRowTwo.map((prop, index) => (
          <Link
            key={index}
            to={prop.link}
            className="bg-textBlue50 py-[21px] rounded-xl flex flex-col items-center justify-center space-y-3"
          >
            <div className="w-12 h-12 border rounded-full border-blue-800 flex items-center justify-center">
              <img className="w-8 h-8" alt={`sidebar-item-${index}`} src={prop.icon} />
            </div>
            <div className="flex items-center justify-center">
              <p className="font-bold text-blue-950 text-sm  mx-2">{prop.name}</p>
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

export default DashboardNavigation
