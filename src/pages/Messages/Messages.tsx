import PageLayout from '@/components/layout/PageLayout/PageLayout'
import { PATHS } from '@/routes/paths'
import AllMessages from './AllMessages'

const Messages = () => {
  return (
    <PageLayout title="پیام ها" backLink={PATHS.Dashboard}>
      <AllMessages showSeeAll={false} />
    </PageLayout>
  )
}

export default Messages
