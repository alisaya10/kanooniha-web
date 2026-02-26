import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import eyeClosedIcon from '@/assets/icons/eye-closed-icon.png'
import eyeOpenIcon from '@/assets/icons/eye-open-icon.png'
import kanoonLogo from '@/assets/images/kanoon-logo-image.png'
import Button from '@/components/common/Button/Button'
import { useLogin } from '@/queries/auth/useLogin'
import { PATHS } from '@/routes/paths'

const LoginPasswordStep = () => {
  const [password, setPassword] = useState('')
  const [counter, setCounter] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [showEye, setShowEye] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const loginMutation = useLogin()

  const nationalCode = location?.state?.nationalCode
  const activeCode = location?.state?.mobileToken
  const loginBy = location?.state?.loginBy

  const sendPassword = () => {
    let body: {
      userName: string
      counter?: string
      password?: string
      activeCode?: string
    } = {
      userName: nationalCode,
    }

    if (loginBy === 'Counter') body = { userName: nationalCode, counter, password }
    if (loginBy === 'Password') body = { userName: nationalCode, counter, password }
    if (loginBy === 'Mobile') body = { userName: nationalCode, activeCode: code }

    loginMutation.mutate(body, {
      onError: (error) => {
        setMessage(error?.message ?? 'خطا در ارتباط با سرور')
      },
      onSuccess: (data) => {
        setMessage(data?.message ?? '')
        if (data?.tokenJwt && data?.success) {
          Cookies.set('token', data.tokenJwt, { expires: 360, secure: true })
          navigate(PATHS.Dashboard)
          Cookies.set('logout', 'false')
        }
      },
    })
  }

  const resetPasswordStep = () => {
    loginMutation.mutate(
      { userName: nationalCode, activeCode },
      {
        onError: (error) => {
          setMessage(error?.message ?? 'خطا در ارتباط با سرور')
        },
        onSuccess: (data) => {
          setMessage(data?.message ?? '')
          if (data?.mobileToken && data?.success) {
            navigate(PATHS.LOGIN_RESET_PASSWORD, {
              state: { nationalCode, loginBy: 'password', activeCode },
            })
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
          src={kanoonLogo}
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
              {loginBy == 'Counter' ? (
                <div className="relative">
                  <input
                    value={counter}
                    onChange={(e) => {
                      setMessage('')
                      setCounter(e.target.value)
                    }}
                    type={showEye ? 'text' : 'password'}
                    className="w-full h-12 px-2 border rounded-md border-gray-500 outline-0 font-medium text-base"
                    placeholder="شمارنده"
                  />
                  {showEye ? (
                    <img
                      src={eyeOpenIcon}
                      alt="open"
                      className="w-5 absolute z-10 top-3.5 left-2 cursor-pointer"
                      onClick={() => setShowEye(false)}
                    />
                  ) : (
                    <img
                      src={eyeClosedIcon}
                      alt="closed"
                      className="w-5 absolute z-10 top-3.5 left-2 cursor-pointer"
                      onClick={() => setShowEye(true)}
                    />
                  )}
                </div>
              ) : loginBy == 'Password' ? (
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => {
                      setMessage('')
                      setPassword(e.target.value)
                    }}
                    type={showEye ? 'text' : 'password'}
                    className="w-full h-12 px-2 border rounded-md border-gray-500 outline-0 font-medium text-base"
                    placeholder="رمز عبور"
                  />
                  {showEye ? (
                    <img
                      src={eyeOpenIcon}
                      alt="open"
                      className="w-5 absolute z-10 top-3.5 left-2 cursor-pointer"
                      onClick={() => setShowEye(false)}
                    />
                  ) : (
                    <img
                      src={eyeClosedIcon}
                      alt="closed"
                      className="w-5 absolute z-10 top-3.5 left-2 cursor-pointer"
                      onClick={() => setShowEye(true)}
                    />
                  )}
                </div>
              ) : loginBy == 'Mobile' ? (
                <div className="relative">
                  <input
                    value={code}
                    maxLength={6}
                    onChange={(e) => {
                      setMessage('')
                      setCode(e.target.value)
                    }}
                    type={showEye ? 'text' : 'password'}
                    className="w-full h-12 px-2 border rounded-md border-gray-500 outline-0 font-medium text-base"
                    placeholder="کد"
                  />
                  {showEye ? (
                    <img
                      src={eyeOpenIcon}
                      alt="open"
                      className="w-5 absolute z-10 top-3.5 left-2 cursor-pointer"
                      onClick={() => setShowEye(false)}
                    />
                  ) : (
                    <img
                      src={eyeClosedIcon}
                      alt="closed"
                      className="w-5 absolute z-10 top-3.5 left-2 cursor-pointer"
                      onClick={() => setShowEye(true)}
                    />
                  )}
                </div>
              ) : (
                <></>
              )}
              {message && <p className="text-red-500 text-sm">{message}</p>}
              <p className="text-gray-500 text-sm">
                رمز عبور همان رمز سایت کانون می باشد.
              </p>
            </div>
          </div>
          <div>
            <Button
              onClick={() => sendPassword()}
              isLoading={loginMutation.isPending}
              className="w-full h-12 bg-[#1E94F6] hover:bg-blue-400 rounded-lg"
            >
              <p className="text-white font-demibold text-base ">تایید و ادامه</p>
            </Button>
            <p
              onClick={() => resetPasswordStep()}
              className="text-center pt-9 text-blue-600 font-demibold text-base cursor-pointer"
            >
              رمز عبور خود را فراموش کرده اید؟
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPasswordStep
