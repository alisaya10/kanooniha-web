import { toast } from 'react-toastify'

import Button from '@/components/common/Button/Button'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import { useGetStudentGift } from '@/queries/bookfair/useGetStudentGift'
import { PATHS } from '@/routes/paths'

const Gift = () => {
  const { data, refetch, isError: error, isLoading } = useGetStudentGift()

  const handleCopy = async () => {
    if (!data?.code) return

    try {
      await navigator.clipboard.writeText(data.code)
      toast.success('کد تخفیف کپی شد', { containerId: 'bookfair' })
    } catch {
      toast.error('خطا در کپی کردن', { containerId: 'bookfair' })
    }
  }

  return (
    <PageLayout
      title="هدایا"
      backLink={PATHS.Dashboard}
      grayParent={true}
      hasData={Number(!!data)}
      hasDataTitle="در حال حاضر هیچ هدیه یا کد تخفیفی برای شما فعال نیست"
      hasDataPosition="center"
      error={error}
      tryagain={() => refetch()}
      isLoading={isLoading}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-bold mb-3">{data?.title}</p>
          <p className="text-sm">{data?.description}</p>
          <div className="flex items-center justify-center gap-2 my-3 lg:hidden">
            <p className="font-bold tracking-wider">{data?.code}</p>
            {data?.code && (
              <button
                type="button"
                onClick={handleCopy}
                aria-label="کپی کد تخفیف"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="#185390" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            )}
          </div>
          {data?.link && (
            <Button className="block lg:hidden w-full mt-2">
              <a
                href={
                  typeof data?.link === 'string'
                    ? data.link.startsWith('http')
                      ? data.link
                      : `https://${data.link}`
                    : '#'
                }
                target="_blank"
                rel="noreferrer"
              >
                استفاده از هدیه
              </a>
            </Button>
          )}
        </div>
        <div className="hidden lg:block">
          <div className="flex items-center justify-center gap-2 mb-3">
            <p className="font-bold tracking-wider">{data?.code}</p>
            {data?.code && (
              <button
                type="button"
                onClick={handleCopy}
                aria-label="کپی کد تخفیف"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="#185390" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            )}
          </div>
          {data?.link && (
            <Button className="hidden lg:block">
              <a
                href={
                  typeof data?.link === 'string'
                    ? data.link.startsWith('http')
                      ? data.link
                      : `https://${data.link}`
                    : '#'
                }
                target="_blank"
                rel="noreferrer"
              >
                استفاده از هدیه
              </a>
            </Button>
          )}
        </div>
      </div>
    </PageLayout>
  )
}

export default Gift
