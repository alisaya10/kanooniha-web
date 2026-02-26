import { Link } from 'react-router-dom'

import newsIcon from '@/assets/icons/news-icon.png'
import Button from '@/components/common/Button/Button'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import { useNewsList } from '@/queries/news/useNews'
import { PATHS } from '@/routes/paths'

const News = () => {
  const { data: news = [], isLoading, isError: error, refetch: getNews } = useNewsList()

  return (
    <PageLayout
      title="اخبار"
      backLink={PATHS.Dashboard}
      hasData={news.length}
      hasDataTitle="خبری برای نمایش وجود ندارد."
    >
      <div className="flex items-center justify-between w-full border-b border-b-gray-300 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <img src={newsIcon} className="filter grayscale brightness-75 w-6 h-5" alt="" />
          <p className="text-sm font-bold">اخبار</p>
        </div>
      </div>

      <LoaderTryAgainButton
        onClick={() => getNews()}
        error={error}
        isLoading={isLoading}
      />

      {!isLoading && !error && (
        <>
          {Array.isArray(news) &&
            news.map((prop, index) => (
              <div
                key={index}
                className="flex lg:flex-row flex-col lg:space-y-0 space-y-3 lg:items-center justify-between border-b border-b-gray-300 pb-4 mb-4 last-of-type:pb-0 last-of-type:mb-0 last-of-type:border-b-0"
              >
                <div className="flex items-center">
                  <img
                    src={prop?.pictureUrl}
                    className="max-w-12 max-h-12 min-w-12 min-h-12 ml-3 rounded-full object-cover"
                    alt=""
                  />
                  <p className="font-bold text-sm text-textGray700">{prop?.title}</p>
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
        </>
      )}
    </PageLayout>
  )
}

export default News
