import { Outlet } from 'react-router-dom'

import BottomTabNavigator from '../BottomTabNavigator/BottomTabNavigator'
import Sidebar from '../Sidebar/Sidebar'

const MainLayout = () => {
  return (
    <div>
      <div
        className={
          'container lg:min-h-[942px] mx-auto max-w-screen-2xl flex lg:px-[62px] lg:my-9 gap-9'
        }
      >
        <div className="flex-[1.4] lg:block hidden">
          <Sidebar />
        </div>
        <div className="flex-4">
          <Outlet />
        </div>
        <BottomTabNavigator />
      </div>
    </div>
  )
}

export default MainLayout
