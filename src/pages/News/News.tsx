import { Link } from 'react-router-dom'

import newsIcon from '@/assets/icons/news-icon.png'
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
      tryagain={() => getNews()}
      error={error}
      isLoading={isLoading}
    >
      <div className="flex items-center justify-between w-full border-b border-b-gray-300 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <img src={newsIcon} className="filter grayscale brightness-75 w-6 h-5" alt="" />
          <p className="text-sm font-bold">اخبار</p>
        </div>
      </div>

      {Array.isArray(news) &&
        !error &&
        news.map((prop, index) => (
          <Link
            to={prop?.url}
            target="_blank"
            key={index}
            className={`flex lg:flex-row flex-col lg:space-y-0 space-y-3 lg:items-center justify-between border-b border-b-gray-300 ${news.length - 1 == index ? 'border-b-0 pt-4' : index == 0 ? 'pt-0 pb-4' : 'pt-4 pb-4'}`}
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
              <span className="border border-seeAllBlue min-h-8 min-w-[85px] text-seeAllBlue rounded-lg flex items-center justify-center px-3 py-1 text-xs font-demibold hover:bg-seeAllBlue hover:text-white transition-all">
                مشاهده خبر
              </span>
            </div>
          </Link>
        ))}
    </PageLayout>
  )
}

export default News
