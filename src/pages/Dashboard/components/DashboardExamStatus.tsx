import clipboardIcon from '@/assets/icons/clipboard-icon.png'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import MyChart from '@/components/common/Chart/Chart'
import { useLastExam } from '@/queries/records/useLastExam'

const DashboardExamStatus = () => {
  const { data, isLoading, isError, refetch } = useLastExam()

  return (
    <div
      className={`bg-yellow-50 pt-6 pb-6  px-4 rounded-xl space-y-4 min-h-[200px] relative`}
    >
      <LoaderTryAgainButton
        onClick={() => refetch()}
        error={isError}
        isLoading={isLoading}
      />
      {!isLoading && data && !isError && (
        <>
          <div className="flex items-center border-b border-b-yellow-500 pb-4">
            <img src={clipboardIcon} className="w-7 h-7 mr-[6px]" alt="" />
            <p className="text-textGray900 lg:text-base text-sm font-bold mr-2">
              نمودار پاسخ های صحیح نسبت به آزمون قبل
            </p>
          </div>
          <MyChart />
        </>
      )}
    </div>
  )
}

export default DashboardExamStatus
