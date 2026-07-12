import { useState } from 'react'
import { toast } from 'react-toastify'

import giftBoxImage from '@/assets/images/gift-box-image.png'
import Button from '@/components/common/Button/Button'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import { useGetInvitationCode } from '@/queries/bookfair/useGetInvitationCode'

const CAFEBAZAAR_APP_LINK =
  'http://cafebazaar.ir/app/?id=ir.kanoon.kanooniha.android&ref=share'

function DashboardBookFair() {
  const [copied, setCopied] = useState(false)

  const { data: invitationCode, isError, isLoading, refetch } = useGetInvitationCode()

  const handleCopy = async () => {
    if (!invitationCode) return

    try {
      const copyText = `کد تخفیف: ${invitationCode}

«کانونی‌ها» را در بازار اندروید ببین:
${CAFEBAZAAR_APP_LINK}`

      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      toast.success('کد تخفیف و لینک کپی شد', { containerId: 'bookfair' })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('خطا در کپی کردن', { containerId: 'bookfair' })
    }
  }

  return (
    <div
      className={`bg-yellow-100 rounded-xl py-5 pr-[30px] pl-6 ${isError || isLoading ? 'min-h-[200px]' : ''}`}
    >
      <LoaderTryAgainButton
        onClick={() => refetch()}
        error={isError}
        isLoading={isLoading}
      />
      {!isLoading && invitationCode && !isError && (
        <div className="flex lg:flex-row flex-col gap-[34px] items-center justify-center">
          <img src={giftBoxImage} className="w-[97px] h-[97px]" alt="" />
          <div className="flex flex-col gap-4">
            <p className="text-xs leading-5">
              دوستت را به کانونی ها دعوت کن! لینک زیر را برای دوستت بفرست . پس از نصب
              اپلیکیشن و عضویت هم تو و هم دوستت جایزه دریافت می کنید
            </p>
            <div className="bg-white rounded-xl flex items-center py-3 gap-[27px] px-[15px]">
              <p className="font-bold text-[#F7AB19] text-[15px] flex-1 text-center">
                {invitationCode}
              </p>
              <Button
                hoverEffect={false}
                onClick={handleCopy}
                className="w-full bg-[#FCD147] border-0 h-[40px] text-white font-bold"
              >
                {copied ? 'کپی شد' : 'کپی'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardBookFair
