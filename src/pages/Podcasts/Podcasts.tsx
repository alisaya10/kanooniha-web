import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SpinLoading } from 'respinner'

import newsIcon from '@/assets/icons/news-icon.png'
import notFoundNewsImage from '@/assets/images/not-found-news-image.png'
import Button from '@/components/common/Button/Button'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import SelectInput from '@/components/common/Input/SelectInput'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import { usePodcastCategories } from '@/queries/podcasts/usePodcastCategories'
import { usePodcastItemList } from '@/queries/podcasts/usePodcastItemList'
import { PATHS } from '@/routes/paths'

const Podcasts = () => {
  const navigate = useNavigate()
  const [kindId, setKindId] = useState<number | ''>('')

  const {
    data: podcastCategory = [],
    isLoading: isLoadingCategory,
    isError: errorCategory,
    refetch: refetchCategories,
  } = usePodcastCategories()

  const {
    data: itemListData,
    isLoading: isLoadingItemList,
    isError: errorItemList,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch: refetchItems,
  } = usePodcastItemList(kindId !== '' ? kindId : undefined)

  const podcastItems = itemListData?.pages.flat() ?? []
  const error = errorCategory || errorItemList

  const handleTryAgain = () => {
    if (errorCategory) refetchCategories()
    else refetchItems()
  }

  return (
    <PageLayout
      title="پادکست"
      backLink={PATHS.Dashboard}
      minHeight={0}
      grayParent={false}
      hasData={isLoadingItemList == false || podcastItems?.length == 0}
      hasDataTitle="پادکستی برای نمایش وجود ندارد."
    >
      <div className="w-full mt-6 lg:px-6  px-3 ">
        {!isLoadingCategory ? (
          <SelectInput
            title={'موضوع پادکست خود را انتخاب کنید'}
            errorMessage={''}
            options={podcastCategory ?? []}
            onChange={(value) => {
              setKindId(value != null && value !== '' ? Number(value) : '')
            }}
            className="w-full h-[48px] outline-none border z-40 rounded-[5px] text-base font-medium text-gray-500"
          />
        ) : (
          <div className="flex items-center justify-center">
            <SpinLoading
              duration={0.8}
              fill="#185390"
              borderRadius={2}
              count={9}
              barHeight={5}
              barWidth={2}
              size={20}
            />
          </div>
        )}
      </div>

      <div className="bg-boxGray rounded-xl py-6 px-4 relative min-h-[500px] lg:mx-6 mx-3 my-6">
        <div className="flex items-center justify-between w-full border-b border-b-gray-300 pb-4">
          <div className="flex items-center gap-2">
            <img
              src={newsIcon}
              className="filter grayscale brightness-75 w-6 h-5"
              alt=""
            />
            <p className="text-sm font-bold">پادکست</p>
          </div>
        </div>

        <LoaderTryAgainButton
          onClick={handleTryAgain}
          error={error}
          isLoading={isLoadingItemList}
        />

        <div className="divide-y divide-gray-300">
          {Array.isArray(podcastItems) &&
            podcastItems.map((prop, index) => (
              <div
                key={index}
                className="flex lg:flex-row flex-col lg:space-y-0 space-y-3 lg:items-center justify-between py-4"
              >
                <div className="flex flex-col items-start w-[80%]">
                  <p className="font-bold text-sm text-textGray700">{prop?.fileName}</p>
                  <p className="font-light text-xs text-textGray700 mt-3">
                    {prop?.description!.length > 130
                      ? prop?.description?.substring(0, 130) + '...'
                      : prop.description}
                  </p>
                </div>
                <div className="flex justify-end">
                  <div
                    onClick={() =>
                      navigate(PATHS.SINGLE_PODCAST, { state: { message: prop } })
                    }
                  >
                    <Button className="px-3 py-1 text-xs font-demibold hover:bg-seeAllBlue hover:text-white transition-all">
                      مشاهده پادکست
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* {podcastItems?.length == 0 && (
          <div className="flex flex-col items-center space-y-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src={notFoundNewsImage} className="h-[155px] m-auto" alt="" />
            <p className="font-bold text-base">پادکستی برای نمایش وجود ندارد.</p>
          </div>
        )} */}
      </div>

      {hasNextPage && podcastItems.length > 0 && (
        <div className="flex flex-col items-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-3 py-1 text-xs font-demibold hover:bg-seeAllBlue hover:text-white transition-all"
          >
            {isFetchingNextPage ? 'در حال بارگذاری...' : 'بارگذاری بیشتر'}
          </Button>
        </div>
      )}
    </PageLayout>
  )
}

export default Podcasts
