import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Button from '@/components/common/Button/Button'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
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
    <PageLayout
      title="جزییات پیام"
      backLink={PATHS.Dashboard}
      hasData={message?.id}
      hasDataTitle="پیامی برای نمایش وجود ندارد."
      minHeight={0}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="lg:text-base text-sm font-bold">{message?.title}</p>
          <p className="lg:text-sm text-xs">{message?.insertDate}</p>
        </div>

        <p className="lg:text-base text-sm leading-6">{message?.message}</p>

        {message.filePath && (
          <Button>
            <Link target="_blank" to={message?.filePath}>
              <span className="cursor-pointer">مشاهده فایل پیوست</span>
            </Link>
          </Button>
        )}

        {message?.link && (
          <Button>
            <Link target="_blank" to={message?.link}>
              <span className="cursor-pointer">{message?.linkTitle}</span>
            </Link>
          </Button>
        )}
      </div>
    </PageLayout>
  )
}

export default SingleMessage
