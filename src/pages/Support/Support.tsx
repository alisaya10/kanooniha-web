import { useMemo, useState } from 'react'

import PageLayout from '@/components/layout/PageLayout/PageLayout'
import { Tab, TabBar } from '@/components/layout/Tab/TabBar'
import {
  useRequestSupportOptions,
  useTicketInsert,
  useTicketReceiverKindList,
} from '@/queries/support'
import { useTicketAppList } from '@/queries/support/useTicketAppList'
import { PATHS } from '@/routes/paths'
import ApplicationHelp from './ApplicationHelp'
import SendRequestSupport from './components/SendRequestSupport'
import RequestSupportMessages from './RequestSupportMessages'

const Support = () => {
  const [supportTab, setSupportTab] = useState('درخواست های من')
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTicketAppList()

  const requestSupport = useMemo(
    () => data?.pages.flatMap((page) => page ?? []) ?? [],
    [data?.pages],
  )

  const requestOptionsQuery = useRequestSupportOptions()
  const receiverKindQuery = useTicketReceiverKindList()
  const insertMutation = useTicketInsert()

  const siteOptions = requestOptionsQuery.data ?? []
  const receiverKindOptions = receiverKindQuery.data ?? []

  const handleSubmitSuccess = () => {
    setActiveTabIndex(0)
    refetch()
  }

  return (
    <PageLayout
      title="پشتیبانی"
      backLink={PATHS.Dashboard}
      grayParent={false}
      hasData={
        supportTab == 'درخواست های من' || supportTab == 'راهنمای اپلیکیشن'
          ? 1
          : siteOptions.length && receiverKindOptions.length
      }
      hasDataTitle="فعلا نمیتوان درخواستی ثبت کرد."
      isLoading={
        supportTab == 'درخواست های من' || supportTab == 'راهنمای اپلیکیشن'
          ? false
          : isLoading
      }
      error={
        supportTab == 'درخواست های من' || supportTab == 'راهنمای اپلیکیشن'
          ? false
          : isError
      }
      tryagain={refetch}
    >
      <div className="lg:px-6">
        <TabBar
          setTabState={setSupportTab}
          activeTabIndex={activeTabIndex}
          onActiveTabChange={setActiveTabIndex}
        >
          <Tab tabTitle="درخواست های من">
            <div className="py-6">
              <RequestSupportMessages
                data={requestSupport}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                isLoading={isLoading}
                isError={isError}
                tryagain={refetch}
              />
            </div>
          </Tab>
          <Tab tabTitle="ثبت درخواست پشتیبانی">
            <div className="py-6 px-3 lg:px-0">
              <SendRequestSupport
                siteOption={siteOptions}
                receiverKindOptions={receiverKindOptions}
                insertMutation={insertMutation}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </div>
          </Tab>
          <Tab tabTitle="راهنمای اپلیکیشن">
            <div className="py-6 px-3 lg:px-0">
              <ApplicationHelp />
            </div>
          </Tab>
        </TabBar>
      </div>
    </PageLayout>
  )
}

export default Support
