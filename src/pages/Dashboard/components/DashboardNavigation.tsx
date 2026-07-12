import { useState } from 'react'
import { Link } from 'react-router-dom'

import chartIcon from '@/assets/icons/chart-icon.png'
import eventsIcon from '@/assets/icons/events-icon.png'
import fileIcon from '@/assets/icons/file-icon.png'
import giftIcon from '@/assets/icons/gift-icon.png'
import leagueIcon from '@/assets/icons/league-icon.png'
import messageIcon from '@/assets/icons/message-icon.png'
import micIcon from '@/assets/icons/mic-icon.png'
import newsIcon from '@/assets/icons/news-icon.png'
import supportIcon from '@/assets/icons/support-icon-2.png'
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
    // { name: 'پروفایل', icon: profileIcon, link: PATHS.PROFILE },
    { name: 'کلاس و رویداد ها', icon: eventsIcon, link: PATHS.EVENTS },
    { name: 'پشتیبانی', icon: supportIcon, link: PATHS.SUPPORT },
    { name: 'هدایا', icon: giftIcon, link: PATHS.GIFT },
    // { name: 'لیگ درسی', icon: leagueIcon, link: PATHS.LEAGUE },
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
            <div className="flex items-center justify-center flex-col">
              <p className="font-bold text-blue-950 text-xs sm:text-sm text-center leading-tight mx-2 w-full text-balance">
                {prop.name}
              </p>
              {index == 2 && (
                <div className="bg-red-500 w-5 h-5 flex items-center justify-center rounded-full mt-3">
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
