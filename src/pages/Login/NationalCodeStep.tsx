import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import kanoonLogo from '@/assets/images/kanoon-logo-image.png'
import Button from '@/components/common/Button/Button'
import Input from '@/components/common/Input/Input'
import { useLogin } from '@/queries/auth/useLogin'
import { PATHS } from '@/routes/paths'

const LoginNationalCodeStep = () => {
  const [nationalCode, setNationalCode] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const loginMutation = useLogin()

  const Login = () => {
    loginMutation.mutate(
      { userName: nationalCode },
      {
        onError: (error) => {
          setMessage(error?.message ?? 'خطا در ارتباط با سرور')
        },
        onSuccess: (data) => {
          setMessage(data?.message ?? '')
          if (data?.success) {
            navigate(PATHS.LOGIN_PASSWORD, {
              state: {
                nationalCode,
                loginBy: data.loginBy,
                mobileToken: data.mobileToken,
              },
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
      <div className="w-full h-[70%] bg-white flex justify-center">
        <div className="w-[343px] space-y-[62px] flex flex-col lg:justify-normal justify-between mt-[153px] lg:mb-0 mb-8">
          <Input
            errorMessage={message}
            value={nationalCode}
            onChange={(e) => setNationalCode(e.target.value)}
            className="w-full h-12 px-2 border rounded-md border-gray-500 outline-0 font-medium text-base"
            placeholder="کد ملی"
          />
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
  )
}

export default LoginNationalCodeStep
