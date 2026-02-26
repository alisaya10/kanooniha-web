import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import Button from '@/components/common/Button/Button'
import { useLogin } from '@/queries/auth/useLogin'
import { PATHS } from '@/routes/paths'

const ResetPasswordStep = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()
  const [activeCode, setActiveCode] = useState('')
  const [message, setMessage] = useState('')
  const nationalCode = location?.state?.nationalCode
  const loginMutation = useLogin()

  const Login = () => {
    loginMutation.mutate(
      { userName: nationalCode, activeCode },
      {
        onError: (error) => {
          setMessage(error?.message ?? 'خطا در ارتباط با سرور')
        },
        onSuccess: (data) => {
          if (data?.tokenJwt && data?.success) {
            Cookies.set('token', data.tokenJwt, { expires: 360, secure: true })
            Cookies.set('logout', 'false')
            queryClient.invalidateQueries({ queryKey: ['userInfo'] })
            navigate(PATHS.Dashboard)
          } else {
            setMessage(data?.message ?? '')
          }
        },
      },
    )
  }

  return (
    <div className="w-full h-screen">
      <div className="w-full h-[30%] bg-diagonal-gradient relative flex items-end justify-center lg:rounded-b-0 rounded-b-2xl">
        <img
          className="w-[182px] h-[182px] border-[3px] border-blue-800 rounded-full mb-[-91px]"
          src="images/kanoon-logo-image.png"
        />
      </div>
      <div className="w-full h-[70%] grow bg-white flex justify-center">
        <div className="w-[343px] mt-[153px] flex flex-col lg:justify-normal justify-between lg:mb-0 mb-8">
          <div>
            <div className="border-b border-gray-200 pb-4 mb-4">
              <span className="text-gray-500 text-sm">کد ملی : </span>
              <span className="text-gray-500 text-sm">{nationalCode}</span>
            </div>
            <div className="space-y-2 mb-[62px]">
              <div className="relative">
                <input
                  maxLength={6}
                  value={activeCode}
                  onChange={(e) => {
                    setMessage('')
                    setActiveCode(e.target.value)
                  }}
                  className="w-full h-12 px-2 border rounded-md border-gray-500 outline-0 font-medium text-base"
                  placeholder="کد"
                />
              </div>

              <p className="text-gray-500 text-sm">کد پیامک شده را وارد کنید.</p>
              {message && <p className="text-red-500 text-sm">{message}</p>}
            </div>
          </div>
          <div>
            <Button
              onClick={() => Login()}
              isLoading={loginMutation.isPending}
              className="w-full h-12 bg-[#1E94F6] hover:bg-blue-400 rounded-lg"
            >
              <p className="text-white font-demibold text-base ">تایید و ادامه</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordStep
