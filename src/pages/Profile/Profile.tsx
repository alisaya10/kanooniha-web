import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import exitIcon from '@/assets/icons/exit-icon.png'
import borderImage from '@/assets/images/border-image.png'
import logoutImage from '@/assets/images/logout-image.png'
import studentImage from '@/assets/images/student-image.png'
import Button from '@/components/common/Button/Button'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import Modal from '@/components/common/Modal/Modal'
import { useUserInfo } from '@/queries/auth/useUserInfo'
import { PATHS } from '@/routes/paths'

const Profile = () => {
  const exitModal = useRef<any>(null)
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch } = useUserInfo()

  const exitUser = () => {
    localStorage.clear()
    Cookies.remove('token')
    Cookies.set('logout', 'true')
    navigate(PATHS.LOGIN_NATIONAL_CODE)
  }

  return (
    <div className="bg-white lg:rounded-2xl lg:min-h-full min-h-dvh">
      <div className="py-4 lg:block hidden">
        <h1 className="font-bold text-lg text-center">پروفایل</h1>
      </div>
      <img src={borderImage} className="w-full lg:block hidden" alt="border-image" />

      <div className="bg-diagonal-gradient h-[142px] rounded-b-2xl relative lg:hidden flex items-end justify-center">
        {!isLoading && !isError && (
          <div className="mb-[-60px]">
            <img
              src={data?.avatar || studentImage}
              className="w-[120px] h-[120px] border-2 border-textBlue800 rounded-full object-cover"
              alt="profile-image"
            />
          </div>
        )}
      </div>

      <div className="lg:space-y-[62px] lg:mx-6 mx-3 lg:my-6">
        <div className="flex flex-col lg:min-h-[200px] items-center relative">
          <LoaderTryAgainButton
            onClick={() => refetch()}
            error={isError}
            isLoading={isLoading}
          />
          {!isLoading && !isError && (
            <div className="w-full flex flex-col items-center lg:mt-0 mt-[84px]">
              <img
                src={data?.avatar || 'images/student-image.jpg'}
                className="w-[175px] h-[175px] border-2 border-textBlue800 rounded-full lg:flex hidden object-cover"
                alt="profile-image"
              />
              <div className="flex flex-col items-center space-y-6 lg:mt-6">
                <p className="text-lg font-bold">{data?.fullName}</p>
                <div className="flex items-center">
                  <p className="text-sm">{data?.groupName}</p>
                  <div className="border border-textGray300 h-6 mx-4" />
                  <p className="text-sm">{data?.currentYear}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          onClick={() => exitModal.current.open()}
          className="flex items-center bg-boxGray rounded-xl px-3 py-4 mt-[62px] cursor-pointer"
        >
          <img src={exitIcon} className="w-6 h-6" alt="exit-icon" />
          <p className="text-sm font-bold text-redText mr-2">خروج از اپلیکیشن</p>
        </div>

        <div className="w-full grid place-items-center lg:mt-0 mt-[20px]">
          <p className="font-normal">نسخه : 8.0.1</p>
        </div>
      </div>

      <Modal ref={exitModal}>
        <div className="bg-white flex flex-col items-center px-4 py-6 rounded-xl">
          <img
            src={logoutImage}
            className="w-[82px] h-[82px] mb-[42px]"
            alt="logout-image"
          />
          <p className="mb-8 text-base font-bold">
            آیا مطمئن هستید که می خواهیدخارج شوید؟
          </p>
          <div className="grid grid-cols-2 gap-[9px]">
            <Button
              onClick={() => exitUser()}
              className="bg-seeAllBlue text-white min-h-10 text-sm font-demibold"
            >
              بله خارج می شوم
            </Button>
            <Button
              onClick={() => exitModal.current.close()}
              className="min-h-10 text-sm font-demibold"
            >
              خیر می مانم
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Profile
