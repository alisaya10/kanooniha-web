import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import messageIcon from '@/assets/icons/message-icon.png'
import notFoundImage from '@/assets/images/not-found-image.png'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import { useMessagesList } from '@/queries/messages/useMessages'
import { PATHS } from '@/routes/paths'

const AllMessages = ({ showSeeAll }: { showSeeAll: boolean }) => {
  const navigate = useNavigate()
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
  const messages = useMemo(
    () => (showSeeAll ? filteredData.slice(0, 4) : filteredData),
    [filteredData, showSeeAll],
  )

  return (
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
        {showSeeAll && (
          <Link to={PATHS.MESSAGES}>
            <p className="text-seeAllBlue font-bold text-xs">مشاهده همه</p>
          </Link>
        )}
      </div>

      <LoaderTryAgainButton
        onClick={() => getMessages()}
        error={error}
        isLoading={isLoading}
      />

      {!isLoading && !error && (
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

          {messages.length === 0 && (
            <div className="flex flex-col items-center space-y-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img src={notFoundImage} className="h-[155px] m-auto" alt="" />
              <p className="font-bold lg:text-base text-sm">
                پیامی برای نمایش وجود ندارد.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AllMessages
