import { NavLink, useLocation } from 'react-router-dom'

import chartFillIcon from '@/assets/icons/chart-fill-icon.png'
import chartOutlineIcon from '@/assets/icons/chart-outline-icon.png'
import userFillIcon from '@/assets/icons/user-fill-icon.png'
import userOutlineIcon from '@/assets/icons/user-outline-icon.png'
import widgetFillIcon from '@/assets/icons/widget-fill-icon.png'
import widgetOutlineIcon from '@/assets/icons/widget-outline-icon.png'
import { PATHS } from '@/routes/paths'

const bottomTabNavigator = [
  {
    name: 'داشبورد',
    outlineIcon: widgetOutlineIcon,
    fillIcon: widgetFillIcon,
    link: PATHS.Dashboard,
    isActive: (pathname: string) => pathname === PATHS.Dashboard,
  },
  {
    name: 'کارنامه',
    outlineIcon: chartOutlineIcon,
    fillIcon: chartFillIcon,
    link: PATHS.RECORDS,
    isActive: (pathname: string) =>
      pathname.startsWith(PATHS.RECORDS) || pathname === PATHS.MAIN_RECORDS,
  },
  {
    name: 'پروفایل',
    outlineIcon: userOutlineIcon,
    fillIcon: userFillIcon,
    link: PATHS.PROFILE,
    isActive: (pathname: string) => pathname.startsWith(PATHS.PROFILE),
  },
]

const BottomTabNavigator = () => {
  const location = useLocation()
  const hideLayout = [
    PATHS.LOGIN_NATIONAL_CODE,
    PATHS.LOGIN_PASSWORD,
    PATHS.LOGIN_RESET_PASSWORD,
    PATHS.POLL.toString(),
    PATHS.SUPPORT_DETAIL,
  ].includes(location.pathname)

  return (
    <>
      {!hideLayout && (
        <nav className="fixed w-full rounded-t-md bg-white z-40 bottom-0 lg:hidden flex justify-between px-12 py-3 shadow-2xl">
          {bottomTabNavigator.map((prop, index) => {
            const isActive = prop.isActive(location.pathname)

            return (
              <NavLink
                key={index}
                to={prop.link}
                className="flex flex-col items-center justify-center space-y-1"
              >
                <img
                  className="w-6 h-6"
                  alt={`sidebar-item-${index}`}
                  src={isActive ? prop.fillIcon : prop.outlineIcon}
                />
                <p className="font-iransans font-bold text-[#6B7280] text-xs">
                  {prop.name}
                </p>
              </NavLink>
            )
          })}
        </nav>
      )}
    </>
  )
}

export default BottomTabNavigator
