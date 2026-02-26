import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Button from '@/components/common/Button/Button'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
// import { handleLinkClick } from "@/utils/externalLinkHandler";
import { useVisitMessage } from '@/queries/messages/useVisitMessage'
import { PATHS } from '@/routes/paths'

const SingleMessage = () => {
  const location = useLocation()
  const message = location?.state?.message
  const { mutate: visitMessage } = useVisitMessage()

  useEffect(() => {
    if (message?.id) {
      visitMessage(message.id)
    }
  }, [message?.id, visitMessage])

  return (
    <PageLayout title="جزییات پیام" backLink={PATHS.Dashboard} minHeight={0}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="lg:text-base text-sm font-bold">{message?.title}</p>
          <p className="lg:text-sm text-xs">{message?.insertDate}</p>
        </div>

        <p className="lg:text-base text-sm leading-6">{message?.message}</p>

        {message.filePath && (
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              // handleLinkClick(e as any, message?.filePath);
            }}
          >
            <span className="cursor-pointer">مشاهده فایل پیوست</span>
          </Button>
        )}

        {message?.link && (
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              // handleLinkClick(e as any, message?.link);
            }}
          >
            <span className="cursor-pointer">{message?.linkTitle}</span>
          </Button>
        )}
      </div>
    </PageLayout>
  )
}

export default SingleMessage
