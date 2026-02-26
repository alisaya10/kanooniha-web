import { Link } from 'react-router-dom'

import newsIcon from '@/assets/icons/news-icon.png'
import notFoundNewsImage from '@/assets/images/not-found-news-image.png'
import Button from '@/components/common/Button/Button'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import { useNewsList } from '@/queries/news/useNews'
import { PATHS } from '@/routes/paths'

const DashboardNews = () => {
  const { data = [], isLoading, isError, refetch } = useNewsList()
  const news = (Array.isArray(data) ? data : []).slice(0, 4)
  return (
    <div className="bg-boxGray py-6 px-4 rounded-xl relative min-h-[500px]">
      <div className="flex items-center justify-between w-full border-b border-b-gray-300 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <img src={newsIcon} className="filter grayscale brightness-75 w-6 h-5" alt="" />
          <p className="text-textGray font-bold text-base">اخبار</p>
        </div>
        <Link to={PATHS.NEWS}>
          <p className="text-seeAllBlue font-bold text-xs">مشاهده همه</p>
        </Link>
      </div>

      <LoaderTryAgainButton
        onClick={() => refetch()}
        error={isError}
        isLoading={isLoading}
      />

      {!isLoading && !isError && (
        <div className="space-y-4">
          {Array.isArray(news) &&
            news.map((prop, index) => (
              <div
                key={index}
                className="flex flex-col border-b last:border-b-0 border-b-gray-300 space-y-2 pb-4"
              >
                <div className="flex items-center">
                  <img
                    src={prop?.pictureUrl}
                    className="w-12 h-12 rounded-full ml-3 object-cover"
                    alt="news-image"
                  />
                  <p className="text-textGray700 text-sm font-bold">{prop?.title}</p>
                </div>
                <div className="flex justify-end">
                  <Link to={prop?.url}>
                    <Button className="px-3 py-1 text-xs font-demibold hover:bg-seeAllBlue hover:text-white transition-all">
                      مشاهده خبر
                    </Button>
                  </Link>
                </div>
              </div>
            ))}

          {news.length === 0 && (
            <div className="flex flex-col items-center space-y-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img src={notFoundNewsImage} className="h-[155px] m-auto" alt="" />
              <p className="font-bold lg:text-base text-sm">
                خبری برای نمایش وجود ندارد.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DashboardNews
