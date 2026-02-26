import { useMemo } from 'react'

import PageLayout from '@/components/layout/PageLayout/PageLayout'
import { useMessagesList } from '@/queries/messages/useMessages'
import { PATHS } from '@/routes/paths'
import AllMessages from './AllMessages'

const Messages = () => {
  const {
    data: rawMessages = [],
    isLoading,
    isError: error,
    refetch: getMessages,
  } = useMessagesList()

  const filteredData = useMemo(
    () => (rawMessages ?? []).filter((msg) => !msg?.filePath),
    [rawMessages],
  )
  const messages = useMemo(() => filteredData, [filteredData])

  return (
    <PageLayout
      title="پیام ها"
      backLink={PATHS.Dashboard}
      hasData={messages.length}
      hasDataTitle="پیامی برای نمایش وجود ندارد."
    >
      <AllMessages
        messages={messages}
        showSeeAll={false}
        getMessages={getMessages}
        error={error}
        isLoading={isLoading}
      />
    </PageLayout>
  )
}

export default Messages
