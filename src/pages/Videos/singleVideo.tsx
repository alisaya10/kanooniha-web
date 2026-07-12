import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import PageLayout from '@/components/layout/PageLayout/PageLayout'
import { useIncrementPodcastVisit } from '@/queries/podcasts/useIncrementPodcastVisit'
import { PATHS } from '@/routes/paths'

const SinglePodcast = () => {
  const location = useLocation()
  let message = location?.state?.message
  const { mutate: incrementVisit } = useIncrementPodcastVisit()

  useEffect(() => {
    if (message?.id != null) {
      incrementVisit(message.id)
    }
  }, [message?.id, incrementVisit])

  return (
    <PageLayout
      title="جزییات ویدیو"
      backLink={PATHS.Dashboard}
      minHeight={0}
      isLoading={false}
      hasData={1}
    >
      <div className="flex flex-col items-start">
        <p className="font-iransans lg:text-base text-sm font-bold">
          {message?.fileName}
        </p>
        <p className="font-iransans lg:text-sm text-xs mt-3 leading-7">
          {message?.description}
        </p>
      </div>

      {/* {message.url && <video src={message.url} controls />} */}
      <video
        // ref={videoRef}
        controls
        src="www.aparat.com/video/video/embed/videohash/pph37cg/vt/frame?t=1294"
        width="100%"
        className="mt-4"
        onClick={() => {}}
        style={{ borderRadius: '8px', cursor: 'pointer', height: 400 }}
      />
    </PageLayout>
  )
}

export default SinglePodcast
