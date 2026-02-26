import { useMemo } from 'react'
import moment from 'jalali-moment'

import documentIcon from '@/assets/icons/document-icon.png'
import backpackImage from '@/assets/images/backpack-image.png'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import CircularProgress from '@/components/common/Progress/CircularProgress'
import { useNextExam } from '@/queries/records/useNextExam'

const DashboardUpcomingExam = () => {
  const { data, isLoading, isError, refetch } = useNextExam()

  const dayForProgress = useMemo(() => {
    if (data?.dateValue == null) return undefined
    const dateStr = String(data.dateValue).padStart(8, '0')
    const m = moment(dateStr, 'jYYYYjMMjDD')
    if (!m.isValid()) return undefined
    return m.jDate()
  }, [data?.dateValue])

  return (
    <div
      className={` ${data && Object.keys(data).length !== 0 ? 'bg-textBlue50 lg:block' : 'bg-white hidden'}  pt-6 ${isLoading ? 'pb-6' : 'pb-9'} px-4 rounded-xl space-y-4 min-h-[200px] relative`}
    >
      <LoaderTryAgainButton
        onClick={() => refetch()}
        error={isError}
        isLoading={isLoading}
      />

      {!isLoading && data && Object.keys(data).length !== 0 && (
        <>
          <div className="flex items-center border-b border-textBlue200 pb-4 ">
            <img src={documentIcon} className="w-5 h-5 mr-[6px]" alt="" />
            <p className="text-textGray900 lg:text-base text-sm font-bold mr-2">
              {data?.title}
            </p>
            <div className="border border-textBlue200 h-6 mx-3" />
            <p className="text-textBlue800 lg:text-sm text-xs">زمان برگزاری :&nbsp;</p>
            <span className="text-textBlue800 font-bold lg:text-sm text-xs">
              {' '}
              {data?.dateValuePersian}{' '}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="pr-[4.94px] pl-[6.17px]">
                <CircularProgress
                  value={data?.remainingDays}
                  max={dayForProgress ?? data?.dateValue}
                />
              </div>
              <p className="text-textGray900 lg:text-sm text-xs">
                {data?.remainingDaysText}
              </p>
            </div>
            <img
              src={backpackImage}
              className="w-[89px] h-[84.54px] mx-[17.5px] "
              alt=""
            />
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardUpcomingExam
