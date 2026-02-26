import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import fileIcon from '@/assets/icons/file-icon.png'
import notFoundImage from '@/assets/images/not-found-image.png'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import { useMessagesList } from '@/queries/messages/useMessages'
import { PATHS } from '@/routes/paths'

const MessageFile = () => {
  const navigate = useNavigate()
  const {
    data: rawMessages = [],
    isLoading,
    isError: error,
    refetch: getMessages,
  } = useMessagesList()

  const messages = useMemo(() => {
    const withFile = (rawMessages ?? []).filter((msg) => msg?.filePath)
    return withFile
  }, [rawMessages])

  return (
    <PageLayout
      title="فایل ها"
      backLink={PATHS.Dashboard}
      grayParent={true}
      hasData={messages.length}
      hasDataTitle="فایلی برای نمایش وجود ندارد."
    >
      <LoaderTryAgainButton
        onClick={() => getMessages()}
        error={error}
        isLoading={isLoading}
      />

      <div className="border-b border-b-gray-300 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <img src={fileIcon} className="filter grayscale brightness-75 w-5 h-5" alt="" />
          <p className="text-textGray font-bold text-base">فایل ها</p>
        </div>
      </div>

      {!isLoading && !error && (
        <div className="space-y-4">
          <>
            {Array.isArray(messages) &&
              messages.map((prop, index) => {
                if ((prop as any)?.filePath)
                  return (
                    <div
                      onClick={() =>
                        navigate(PATHS.MESSAGE_DETAIL, { state: { message: prop } })
                      }
                      key={index}
                      className="flex flex-col border-b last:border-b-0 border-b-gray-300 pb-4 space-y-4 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm ${
                            (prop as any)?.hasSeen === true
                              ? 'text-green-500'
                              : 'text-red-500'
                          } font-bold`}
                        >
                          {(prop as any)?.title}
                        </p>
                        <p className="text-sm text-textGray700">
                          {(prop as any)?.insertDate}
                        </p>
                      </div>
                      <p className="text-sm text-textGray700 leading-6">
                        {(prop as any)?.message}
                      </p>
                    </div>
                  )
              })}
          </>
        </div>
      )}
    </PageLayout>
  )
}

export default MessageFile
