import moment from 'jalali-moment'

import textBookImage from '@/assets/images/text-book-image.png'
import Button from '@/components/common/Button/Button'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import { useContentAppItem } from '@/queries/strategicPlanOrTextBook/useContentAppItem'
import { DownloadContentType } from '@/types/api/strategicPlanOrTextBook.types'

const DashboardTextBook = () => {
  const {
    data: textbooks,
    isLoading,
    isError,
    refetch,
  } = useContentAppItem({ type: DownloadContentType.TextBook })

  const m = moment(textbooks?.examDate, 'jYYYYjMMjDD')

  return (
    <div
      className={`flex bg-textBlue50 rounded-xl py-5 pr-[30px] pl-6 items-center ${isError || isLoading ? 'min-h-[200px]' : ''} gap-6`}
    >
      <LoaderTryAgainButton
        onClick={() => refetch()}
        error={isError}
        isLoading={isLoading}
      />
      {!isLoading && textbooks && !isError && (
        <>
          <img src={textBookImage} alt="textbook" className="w-[138px] h-[91px]" />
          <div className="w-full">
            <p className={`text-xs leading-5 ${textbooks?.desc ? 'mb-4' : 'mb-0'}`}>
              {textbooks?.desc}
            </p>
            {textbooks?.examDate && (
              <p className="text-xs my-4">تاریخ آزمون: {m.format('jYYYY/jMM/jDD')}</p>
            )}
            {textbooks?.link && (
              <Button
                hoverEffect={false}
                onClick={() => window.open(textbooks?.link, '_blank')}
                className="w-full bg-[#5881DD] text-white font-bold border-0 h-[40px]"
              >
                دانلود درسنامه
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardTextBook
