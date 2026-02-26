import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import supportIcon from '@/assets/icons/support-icon.png'
import notFoundImage from '@/assets/images/not-found-image.png'
import Button from '@/components/common/Button/Button'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import { useTicketAppList } from '@/queries/support/useTicketAppList'
import { PATHS } from '@/routes/paths'
import { toJalaliFarsi } from '@/utils/date'

const RequestSupportMessages = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTicketAppList()

  const requestSupport = useMemo(() => data?.pages.flat() ?? [], [data?.pages])

  return (
    <div className="lg:mx-0 mx-3">
      <div className="bg-boxGray py-6 px-4 rounded-xl relative min-h-[500px]">
        {/* هدر */}
        <div className="w-full border-b border-b-gray-300 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <img
              src={supportIcon}
              className="filter grayscale brightness-75 w-5 h-5"
              alt=""
            />
            <p className="text-textGray font-bold text-base">درخواست های پشتیبانی</p>
          </div>
        </div>

        {/* لودر و ارور */}
        <LoaderTryAgainButton
          onClick={() => refetch()}
          error={isError}
          isLoading={isLoading}
        />

        {/* لیست پیام‌ها */}
        {!isLoading && !isError && (
          <div className="space-y-4">
            {requestSupport.map((prop, index) => (
              <Link
                to={PATHS.SUPPORT_DETAIL}
                state={{ message: prop }}
                key={index}
                className="flex flex-col border-b last:border-b-0 border-b-gray-300 pb-4 space-y-4 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <p className={`text-sm text-textGray700 font-bold`}>
                    {prop?.supportKindName}
                  </p>
                  <p className="text-sm text-textGray700">
                    {toJalaliFarsi(prop?.dateCreate) ?? ''}
                  </p>
                </div>
                <p className="text-sm text-textGray700 leading-6">
                  {prop?.receiverKindName}
                </p>
                <p className="text-sm text-textGray700 leading-6">{prop?.lastMessage}</p>
                <div className="flex justify-end w-full">
                  {prop?.ticketStatus == 0 ? (
                    <Button
                      onClick={() => {}}
                      className="bg-yellow-200 w-full lg:w-auto text-yellow-800 h-[34px] min-w-[100px] text-xs font-bold border-0"
                    >
                      هنوز هیچ پاسخی داده نشده است
                    </Button>
                  ) : prop?.ticketStatus == 1 ? (
                    <Button
                      onClick={() => {}}
                      className="bg-textGray300 w-full lg:w-auto text-textGray700 h-[34px] min-w-[100px] text-xs font-bold border-0"
                    >
                      بسته شده
                    </Button>
                  ) : prop?.ticketStatus == 2 ? (
                    <Button
                      onClick={() => {}}
                      className="bg-textBlue200 w-full lg:w-auto text-seeAllBlue h-[34px] min-w-[100px] text-xs font-bold border-0"
                    >
                      پیام خوانده شده است
                    </Button>
                  ) : prop?.ticketStatus == 3 ? (
                    <Button
                      onClick={() => {}}
                      className="bg-textGreen300 w-full lg:w-auto text-textGreen700 h-[34px] min-w-[100px] text-xs font-bold border-0"
                    >
                      پیام پاسخ داده شده است ({prop?.answeredMessageCount})
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              </Link>
            ))}

            {/* نمایش پیام خالی */}
            {requestSupport.length === 0 && (
              <div className="flex flex-col items-center space-y-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src={notFoundImage} className="h-[155px] m-auto" alt="" />
                <p className="font-bold lg:text-base text-sm">
                  درخواست پشتیبانی برای نمایش وجود ندارد.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {hasNextPage && requestSupport.length > 0 && (
        <div className="flex flex-col items-center ">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-3 py-1 mt-6 text-xs font-demibold hover:bg-seeAllBlue hover:text-white transition-all"
          >
            {isFetchingNextPage ? 'در حال بارگذاری...' : 'بارگذاری بیشتر'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default RequestSupportMessages
