import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import messageIcon from '@/assets/icons/message-icon.png'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import { useMessagesList } from '@/queries/messages/useMessages'
import { PATHS } from '@/routes/paths'

const Messages = () => {
  const {
    data: rawMessages = [],
    isLoading,
    isError: error,
    refetch: getMessages,
  } = useMessagesList()

  const filteredData = useMemo(
    () => (rawMessages ?? []).filter((msg) => !msg?.filePath),
    [rawMessages],
  )
  const messages = useMemo(() => filteredData, [filteredData])

  const navigate = useNavigate()

  return (
    <PageLayout
      title="پیام ها"
      backLink={PATHS.Dashboard}
      hasData={messages.length}
      hasDataTitle="پیامی برای نمایش وجود ندارد."
      error={error}
      isLoading={isLoading}
      tryagain={() => getMessages()}
    >
      <div className="lg:mx-0 mx-3">
        <div className="flex items-center justify-between w-full border-b border-b-gray-300 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <img
              src={messageIcon}
              className="filter grayscale brightness-75 w-5 h-5"
              alt=""
            />
            <p className="text-textGray font-bold text-base">پیام ها</p>
          </div>
        </div>

        <div className="space-y-4">
          {messages.map((prop, index) => (
            <div
              onClick={() => navigate(PATHS.MESSAGE_DETAIL, { state: { message: prop } })}
              key={index}
              className="flex flex-col border-b last:border-b-0 border-b-gray-300 pb-4 space-y-4 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <p
                  className={`text-sm ${
                    prop?.hasSeen ? 'text-green-500' : 'text-red-500'
                  } font-bold`}
                >
                  {prop?.title}
                </p>
                <p className="text-sm text-textGray700">{prop?.insertDate}</p>
              </div>
              <p className="text-sm text-textGray700 leading-6">{prop?.message}</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}

export default Messages
