import clipboardIcon from '@/assets/icons/clipboard-icon.png'
import clipboardImage from '@/assets/images/clipboard-image.png'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import { useLastExam } from '@/queries/records/useLastExam'

const DashboardLastExam = () => {
  const { data, isLoading, isError, refetch } = useLastExam()

  return (
    <div
      className={`bg-textGreen50 pt-6 ${isLoading ? 'pb-6' : 'pb-9'}  px-4 rounded-xl space-y-4 min-h-[200px] relative`}
    >
      <LoaderTryAgainButton
        onClick={() => refetch()}
        error={isError}
        isLoading={isLoading}
      />
      {!isLoading && data && (
        <>
          <div className="flex items-center border-b border-b-textGreen300 pb-4">
            <img src={clipboardIcon} className="w-7 h-7 mr-[6px]" alt="" />
            <p className="text-textGray900 lg:text-base text-sm font-bold mr-2">
              {data?.title}
            </p>
            <div className="border border-textGreen300 h-6 mx-3" />
            <p className="text-textGreen700 lg:text-sm text-xs">زمان برگزاری :&nbsp;</p>
            <span className="text-textGreen700 font-bold lg:text-sm text-xs">
              {' '}
              {data?.dateValuePersian}{' '}
            </span>
          </div>
          <div className="flex items-center gap-[6px]">
            <img
              src={clipboardImage}
              className="w-[55.71px] h-[84.35px] mr-[17.5px] ml-[21px]"
              alt=""
            />
            <div className="space-y-4">
              <div className="flex items-center">
                <p className="text-sm text-textGray900">رتبه ‌شما :&nbsp;</p>
                <p className="text-base font-bold text-textGray900">{data?.totalRank}</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-textGray900">تراز ‌شما :&nbsp;</p>
                <p className="text-base font-bold text-textGray900">{data?.totalLevel}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardLastExam
