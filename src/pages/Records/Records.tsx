import { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import downloadIcon from '@/assets/icons/download-icon.png'
import recordOneIcon from '@/assets/icons/record-one-icon.png'
import recordThreeIcon from '@/assets/icons/record-three-icon.png'
import recordTwoIcon from '@/assets/icons/record-two-icon.png'
import Button from '@/components/common/Button/Button'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import { useDownloadWorkBook } from '@/queries/records/useDownloadWorkBook'
import { useWorkBookKinds } from '@/queries/records/useWorkBookKinds'
import { PATHS } from '@/routes/paths'

type DownloadResult = { download?: string; status?: string }

const Record = () => {
  const navigate = useNavigate()
  const { data: recordsType = [], isLoading, isError, refetch } = useWorkBookKinds()
  const downloadMutation = useDownloadWorkBook()
  const [downloadResults, setDownloadResults] = useState<Record<string, DownloadResult>>(
    {},
  )

  const downloadRecord = useCallback(
    (kind: string, dateValue: string) => {
      downloadMutation.mutate(
        { kind, dateValue: dateValue ?? '' },
        {
          onSuccess: (data) => {
            setDownloadResults((prev) => ({
              ...prev,
              [kind]: {
                download: data?.wordBookPdfLink ?? '',
                status: data?.workBorkPdfStatus,
              },
            }))
            if (kind === 'WorkbookFirst' && data?.workBook) {
              console.log(data.workBook)
              navigate(PATHS.EARLY_REPORT_CARD, { state: { htmlContent: data.workBook } })
            }
          },
        },
      )
    },
    [downloadMutation, navigate],
  )

  const isLoadingDownload = (kind: string) =>
    downloadMutation.isPending && downloadMutation.variables?.kind === kind

  return (
    <PageLayout
      title="کارنامه"
      backLink={PATHS.Dashboard}
      minHeight={recordsType.length ? 0 : 500}
      hasData={recordsType.length}
      hasDataTitle="کارنامه ای برای نمایش وجود ندارد."
    >
      <LoaderTryAgainButton
        onClick={() => refetch()}
        error={isError}
        isLoading={isLoading}
      />

      {!isLoading && (
        <div className="flex lg:flex-row flex-col items-center justify-center lg:grid lg:grid-cols-3">
          {Array.isArray(recordsType) &&
            recordsType.map((prop, index) => {
              const downloadStatus = downloadResults[prop?.kind]?.status
              const downloadLink = downloadResults[prop?.kind]?.download
              const kindLoading = isLoadingDownload(prop?.kind)
              if (prop?.isActive)
                return (
                  <div
                    key={prop?.kind ?? index}
                    className={`${index > 2 ? 'lg:mt-4' : 'mt-0'} ${index % 2 === 0 ? 'lg:border-l-0 lg:border-r-0' : 'lg:border-l lg:border-r'} flex  border-x-gray-300 lg:flex-col lg:justify-normal justify-between items-center lg:space-y-6 lg:w-auto w-full lg:pt-0 lg:pb-0 pt-3 pb-7 last-of-type:pb-0 lg:border-b-0 last-of-type:border-b-0 border-b border-b-textGray300 mb-4`}
                  >
                    <div className="flex lg:flex-col flex-row items-center gap-2">
                      <img
                        src={
                          index % 3 === 0
                            ? recordOneIcon
                            : index % 3 === 1
                              ? recordTwoIcon
                              : recordThreeIcon
                        }
                        className="lg:w-[55px] lg:h-[62.63px] w-[46px] h-[52.38px] lg:mb-6"
                        alt=""
                      />
                      <p className="font-bold lg:text-base text-sm text-textGray900">
                        {prop?.title}
                      </p>
                    </div>

                    {!kindLoading && downloadStatus === 'Complete' && downloadLink ? (
                      downloadLink.startsWith('http') ? (
                        <a href={downloadLink} target="_blank" rel="noopener noreferrer">
                          <Button
                            isLoading={false}
                            onClick={() => {}}
                            imageSrc={downloadIcon}
                            className="min-w-[125px] min-h-[40px] text-xs font-demibold hover:bg-seeAllBlue hover:text-white transition-all"
                          >
                            دانلود
                          </Button>
                        </a>
                      ) : (
                        <Link to={downloadLink}>
                          <Button
                            isLoading={false}
                            onClick={() => {}}
                            imageSrc={downloadIcon}
                            className="min-w-[125px] min-h-[40px] text-xs font-demibold hover:bg-seeAllBlue hover:text-white transition-all"
                          >
                            دانلود
                          </Button>
                        </Link>
                      )
                    ) : prop?.kind === 'WorkBookMain' ? (
                      <Link to={PATHS.MAIN_RECORDS}>
                        <Button
                          isLoading={false}
                          onClick={() => {}}
                          imageSrc={downloadIcon}
                          className="min-w-[125px] min-h-[40px] text-xs font-demibold hover:bg-seeAllBlue hover:text-white transition-all"
                        >
                          کارنامه ها
                        </Button>
                      </Link>
                    ) : prop?.kind === 'WorkbookFirst' ? (
                      <Button
                        isLoading={false}
                        onClick={() =>
                          !kindLoading &&
                          downloadRecord(prop?.kind, prop?.dateValue ?? '')
                        }
                        className="min-w-[125px] min-h-[40px] text-xs font-demibold hover:bg-seeAllBlue hover:text-white transition-all"
                      >
                        مشاهده
                      </Button>
                    ) : downloadStatus === 'Error' ? (
                      <Button
                        isLoading={kindLoading}
                        onClick={() =>
                          !kindLoading &&
                          downloadRecord(prop?.kind, prop?.dateValue ?? '')
                        }
                        imageSrc={''}
                        className={`min-w-[125px] min-h-[40px] text-xs font-demibold ${kindLoading ? 'hover:bg-transparent' : 'hover:bg-seeAllBlue hover:text-white '} transition-all`}
                      >
                        تلاش مجدد
                      </Button>
                    ) : (
                      <Button
                        isLoading={kindLoading}
                        onClick={() =>
                          !kindLoading &&
                          downloadRecord(prop?.kind, prop?.dateValue ?? '')
                        }
                        imageSrc={downloadIcon}
                        className={`min-w-[125px] min-h-[40px] text-xs font-demibold ${kindLoading ? 'hover:bg-transparent' : 'hover:bg-seeAllBlue hover:text-white '} transition-all`}
                      >
                        دریافت فایل
                      </Button>
                    )}
                  </div>
                )
              return null
            })}
        </div>
      )}
    </PageLayout>
  )
}

export default Record
