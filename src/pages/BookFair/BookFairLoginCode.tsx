import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

import BookFair from '@/assets/images/book-fair-image-3.png'
import kanoonLogo from '@/assets/images/kanoon-logo-image.png'
import Button from '@/components/common/Button/Button'
import Input from '@/components/common/Input/Input'
import { useMemberVerify } from '@/queries/auth/useMemberVerify'
import { PATHS } from '@/routes/paths'
import type { MemberVerifyResponse } from '@/types/api/auth.types'
import BookFairImageAnimation from './components/BookFairImageAnimation'

const BookFairLoginCode = () => {
  const [code, setCode] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const memberVerifyMutation = useMemberVerify()
  const mobile = location.state?.mobile as string | undefined

  const texts = [
    {
      line1: 'دانش آموزان',
      line2: 'غیر کانونی',
    },
    {
      line1: 'کانون فرهنگی آموزش',
      line2: 'قلم چی',
    },
  ]

  const handleVerify = () => {
    if (!mobile) {
      toast.error('شماره موبایل معتبر نیست', { containerId: 'bookfair' })
      return
    }

    memberVerifyMutation.mutate(
      { mobile, activeCode: code },
      {
        onError: (error) => {
          toast.error(error?.message ?? 'خطا در ارتباط با سرور', {
            containerId: 'bookfair',
          })
        },
        onSuccess: (payload) => {
          // apiClient interceptor unwraps `{ data, success, ... }` → مقدار `data` (JWT) به‌صورت string
          const token =
            typeof payload === 'string'
              ? payload
              : typeof (payload as MemberVerifyResponse)?.data === 'string'
                ? (payload as MemberVerifyResponse).data
                : null

          if (!token) {
            toast.error('توکن دریافت نشد', { containerId: 'bookfair' })
            return
          }

          const message =
            typeof payload === 'object' && payload !== null && 'message' in payload
              ? (payload as MemberVerifyResponse).message
              : null
          if (message) {
            toast.success(message, { containerId: 'bookfair' })
          }

          Cookies.set('bookFairToken', token, {
            expires: 360,
            secure:
              typeof window !== 'undefined' && window.location.protocol === 'https:',
            sameSite: 'lax',
          })
          navigate(PATHS.SIGNUP_BOOK_FAIR_INFO, {
            state: {
              mobile,
            },
          })
        },
      },
    )
  }

  return (
    <div className="w-full flex">
      <BookFairImageAnimation texts={texts} imageSrc={BookFair} />
      <div className="flex flex-col flex-1 h-dvh justify-center items-center">
        <img
          className="w-[182px] h-[182px] border-[3px] border-[#FFDE1E] rounded-full mb-[-91px]"
          src={kanoonLogo}
        />
        {/* <div className="w-full h-[70%] bg-white flex justify-center"> */}
        <div className="w-[343px] space-y-2.5 flex flex-col lg:justify-normal justify-between mt-[153px] lg:mb-0 mb-8">
          <Input
            errorMessage={''}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-12 px-2 border rounded-md border-gray-500 outline-0 font-medium text-base"
            placeholder="کد پیامک شده را وارد کنید"
          />
          <Button
            onClick={handleVerify}
            isLoading={memberVerifyMutation.isPending}
            hoverEffect={false}
            className="w-full h-12 bg-[#FFDE1E] border-0 rounded-lg"
          >
            <p className="text-black font-demibold text-base ">تایید و ادامه</p>
          </Button>
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default BookFairLoginCode
