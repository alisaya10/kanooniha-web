import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

import certIcon from '@/assets/icons/cert-icon.png'
import downloadIcon from '@/assets/icons/download-icon.png'
import notFoundImage from '@/assets/images/not-found-image.png'
import Button from '@/components/common/Button/Button'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import { useDownloadWorkBook } from '@/queries/records/useDownloadWorkBook'
import { usePastRecordsList } from '@/queries/records/usePastRecordsList'
import { PATHS } from '@/routes/paths'

type DownloadResult = { download?: string; status?: string }

const MainRecords = () => {
  const { data: pastResponse, isLoading, isError, refetch } = usePastRecordsList()
  const downloadMutation = useDownloadWorkBook()
  const [downloadResults, setDownloadResults] = useState<Record<string, DownloadResult>>(
    {},
  )

  const allRecords = pastResponse?.data ?? []
  const message = pastResponse?.message ?? ''

  const downloadRecord = useCallback(
    (kind: string, dateValue: string) => {
      const key = String(dateValue ?? '')
      downloadMutation.mutate(
        { kind, dateValue: key },
        {
          onSuccess: (data) => {
            setDownloadResults((prev) => ({
              ...prev,
              [key]: {
                download: data?.wordBookPdfLink ?? '',
                status: data?.workBorkPdfStatus,
              },
            }))
          },
        },
      )
    },
    [downloadMutation],
  )

  const isLoadingDownload = (dateValue: string) =>
    downloadMutation.isPending &&
    downloadMutation.variables?.dateValue === String(dateValue ?? '')

  return (
    <PageLayout
      title="آزمون های گذشته"
      backLink={PATHS.Dashboard}
      hasData={allRecords.length}
      hasDataTitle="آزمونی برای نمایش وجود ندارد."
    >
      <div className="grid lg:grid-cols-2">
        <LoaderTryAgainButton
          onClick={() => refetch()}
          error={isError}
          isLoading={isLoading}
        />

        {!isLoading && !isError && (
          <>
            {Array.isArray(allRecords) &&
              allRecords.map((prop, index) => {
                const totalRows = Math.ceil(allRecords.length / 2)
                const currentRow = Math.floor(index / 2) + 1
                const isLastRow = currentRow === totalRows
                const dateKey = String(prop?.dateValue ?? '')
                // const formattedDate = moment(prop?.dateValue, "jYYYYjMMjDD").format("jYYYY/jMM/jDD");
                const downloadLink = downloadResults[dateKey]?.download
                const downloadComplete =
                  !isLoadingDownload(dateKey) &&
                  downloadResults[dateKey]?.status === 'Complete' &&
                  downloadLink
                return (
                  <div
                    key={dateKey || index}
                    className={`flex items-center lg:py-0 py-6 justify-between border-b-gray-300 ${isLastRow ? '' : 'border-b'}`}
                  >
                    <div className="flex items-center w-full justify-between">
                      <div className="flex">
                        <div className="w-12 h-12 border rounded-full border-blue-800 flex items-center justify-center ml-2">
                          <img className="w-6 h-6" alt="" src={certIcon} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex">
                            <p className="text-sm text-textGray800">تاریخ :&nbsp;</p>
                            <p className="text-sm font-bold text-textGray800">
                              {prop?.dateValue}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex">
                              <p className="text-sm text-textGray800">تراز شما :&nbsp;</p>
                              <p className="text-sm font-bold text-textGray800">
                                {prop?.totalLevel}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {downloadComplete ? (
                        downloadLink.startsWith('http') ? (
                          <a
                            href={downloadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
                      ) : (
                        <Button
                          isLoading={isLoadingDownload(dateKey)}
                          onClick={() =>
                            !isLoadingDownload(dateKey) &&
                            downloadRecord('WorkBookMain', dateKey)
                          }
                          imageSrc={downloadIcon}
                          className={`min-w-[125px] min-h-[40px] text-xs font-demibold ${isLoadingDownload(dateKey) ? 'hover:bg-transparent' : 'hover:bg-seeAllBlue hover:text-white '} transition-all`}
                        >
                          دریافت فایل
                        </Button>
                      )}
                    </div>
                    <div
                      className={`lg:border-l lg:h-24 border-l-gray-300 ${(index + 1) % 2 === 0 ? 'lg:border-l-0' : 'lg:border-l lg:mx-4'}`}
                    />
                  </div>
                )
              })}
          </>
        )}
      </div>
    </PageLayout>
  )
}

export default MainRecords
