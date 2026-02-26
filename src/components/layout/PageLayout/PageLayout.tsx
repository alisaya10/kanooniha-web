import { Link } from 'react-router-dom'

import backIcon from '@/assets/icons/back-icon.png'
import borderImage from '@/assets/images/border-image.png'
import notFoundImage from '@/assets/images/not-found-image.png'

const PageLayout = ({
  title,
  backLink,
  children,
  grayParent = true,
  minHeight = 500,
  hasData,
  hasDataTitle,
}: {
  title: string
  backLink: string
  children: React.ReactNode
  grayParent?: boolean
  minHeight?: number
  hasData?: false
  hasDataTitle?: ''
}) => (
  <div className="bg-white lg:rounded-2xl lg:min-h-full min-h-dvh pb-20">
    <div className="py-4 lg:block hidden">
      <h1 className="font-bold text-lg text-center">{title}</h1>
    </div>
    <img src={borderImage} className="w-full lg:block hidden" alt="border-image" />

    <div className="bg-diagonal-gradient py-4 px-3 rounded-b-2xl flex items-center justify-between lg:hidden">
      <div className="w-8 h-8 rounded-full" />
      <p className="text-white text-sm font-bold">{title}</p>
      <Link to={backLink}>
        <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
          <img src={backIcon} className="w-[17px]" alt="back-icon" />
        </div>
      </Link>
    </div>
    <div
      className={`${grayParent ? `bg-boxGray rounded-xl py-6 px-4 relative min-h-[${minHeight}px] lg:mx-6 mx-3 my-6` : 'bg-white rounded-xl py-6 px-4 relative min-h-[${minHeight}px] lg:mx-6 mx-3 my-6'}`}
    >
      {children}

      {!hasData && (
        <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src={notFoundImage} className="h-[155px]" alt="not-found-news-image" />
          <p className="font-bold text-base">{hasDataTitle}</p>
        </div>
      )}
    </div>
  </div>
)

export default PageLayout
