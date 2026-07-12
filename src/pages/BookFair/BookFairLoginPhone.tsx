import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

import BookFair from '@/assets/images/book-fair-image-2.png'
import kanoonLogo from '@/assets/images/kanoon-logo-image.png'
import Button from '@/components/common/Button/Button'
import Input from '@/components/common/Input/Input'
import { useSignup } from '@/queries/auth/useSignup'
import { PATHS } from '@/routes/paths'
import BookFairImageAnimation from './components/BookFairImageAnimation'

const BookFairLoginPhone = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const navigate = useNavigate()
  const signupMutation = useSignup()

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

  const handleSignup = () => {
    signupMutation.mutate(
      { mobile: phoneNumber },
      {
        onError: (error) => {
          const axiosError = error as AxiosError<any>

          const errors = axiosError.response?.data?.errors

          if (errors) {
            Object.values(errors).forEach((field: any) => {
              field.forEach((msg: string) => {
                toast.error(msg, {
                  containerId: 'bookfair',
                })
              })
            })
          } else {
            toast.error('خطا در ارتباط با سرور', {
              containerId: 'bookfair',
            })
          }
        },
        onSuccess: (data) => {
          if (data?.message) {
            toast.success(data.message, { containerId: 'bookfair' })
          }
          if (data?.success && data?.state == 0) {
            navigate(PATHS.SIGNUP_BOOK_FAIR_CODE, { state: { mobile: phoneNumber } })
          }
          if (data?.state == 1) {
            Cookies.set('bookFairToken', data?.tokenJwt, { expires: 360, secure: true })
            navigate(PATHS.SIGNUP_BOOK_FAIR_INFO)
          }
          if (data?.state == 2 || data?.state == 3) {
            Cookies.set('bookFairToken', data?.tokenJwt, { expires: 360, secure: true })
            navigate(PATHS.SIGNUP_BOOK_FAIR_SLIDER)
          }
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
        <div className="w-[343px] space-y-2.5 flex flex-col lg:justify-normal justify-between mt-[153px] lg:mb-0 mb-8">
          <Input
            errorMessage={''}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full h-12 px-2 border rounded-md border-gray-500 outline-0 font-medium text-base"
            placeholder="شماره همراه خود را وارد کنید"
          />
          <Button
            onClick={handleSignup}
            isLoading={signupMutation.isPending}
            hoverEffect={false}
            className="w-full h-12 bg-[#FFDE1E] border-0 rounded-lg"
          >
            <p className="text-black font-demibold text-base ">تایید و ادامه</p>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BookFairLoginPhone
