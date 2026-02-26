import PageLayout from '@/components/layout/PageLayout/PageLayout'
import { Tab, TabBar } from '@/components/layout/Tab/TabBar'
import { PATHS } from '@/routes/paths'
import SendRequestSupport from './components/SendRequestSupport'
import RequestSupportMessages from './RequestSupportMessages'

const Support = () => {
  return (
    <PageLayout
      title="پشتیبانی"
      backLink={PATHS.Dashboard}
      minHeight={0}
      grayParent={false}
    >
      <TabBar>
        <Tab tabTitle="درخواست های من">
          <div className="lg:p-6 py-6">
            <RequestSupportMessages />
          </div>
        </Tab>
        <Tab tabTitle="ثبت درخواست پشتیبانی">
          <div className="lg:p-6 py-6">
            <SendRequestSupport />
          </div>
        </Tab>
      </TabBar>
    </PageLayout>
  )
}

export default Support
