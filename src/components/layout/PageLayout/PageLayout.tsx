import { Link } from 'react-router-dom'

import backIcon from '@/assets/icons/back-icon.png'
import borderImage from '@/assets/images/border-image.png'
import notFoundImage from '@/assets/images/not-found-news-image.png'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import { PATHS } from '@/routes/paths'

const PageLayout = ({
  title,
  backLink = PATHS.Dashboard,
  children,
  grayParent = true,
  minHeight = 500,
  hasData = 0,
  hasDataTitle,
  isLoading = false,
  tryagain,
  hasDataPosition = 'center',
  hasDataTopPosition = 0,
  hasDataLeftPosition = 0,
  hasDataRightPosition = 0,
  hasDataBottomPosition = 0,
  error = false,
  hasBackButton = true,
}: {
  title: string
  backLink?: string
  children: React.ReactNode
  grayParent?: boolean
  minHeight?: number
  hasData?: number
  isLoading?: boolean
  tryagain?: () => void
  error?: boolean
  hasDataTitle?: string
  hasDataPosition?: string
  hasDataTopPosition?: number | string
  hasDataLeftPosition?: number
  hasDataRightPosition?: number
  hasDataBottomPosition?: number
  hasBackButton?: boolean
}) => (
  <div className="bg-white lg:rounded-2xl lg:min-h-full min-h-dvh pb-20">
    <div className="py-4 lg:block hidden">
      <h1 className="font-bold text-lg text-center">{title}</h1>
    </div>
    <img src={borderImage} className="w-full lg:block hidden" alt="border-image" />

    <div className="bg-diagonal-gradient py-4 px-3 rounded-b-2xl flex items-center justify-between lg:hidden">
      <div className="w-8 h-8" />
      <p className="text-white text-sm font-bold">{title}</p>
      {hasBackButton ? (
        <Link to={backLink}>
          <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
            <img src={backIcon} className="w-[17px]" alt="back-icon" />
          </div>
        </Link>
      ) : (
        <div className="w-8 h-8" />
      )}
    </div>
    <div
      className={`${grayParent ? `bg-boxGray rounded-xl py-6 px-4 relative min-h-[${minHeight}px] lg:mx-6 mx-3 my-6` : `bg-white rounded-xl relative min-h-[${minHeight}px]`}`}
    >
      {children}

      {hasData <= 0 && !isLoading && !error && (
        <div
          className={`flex top-[${hasDataTopPosition}] bottom-[${hasDataBottomPosition}] left-[${hasDataLeftPosition}] right-[${hasDataRightPosition}] flex-col items-center space-y-6 absolute ${hasDataPosition == 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : hasDataPosition == 'left' ? 'left-1/7 top-1/4' : hasDataPosition == 'right' ? 'right-1/7 top-1/4' : ``} `}
        >
          <img
            src={notFoundImage}
            className="lg:h-[155px] h-[120px]"
            alt="not-found-image"
          />
          <p className="font-bold lg:text-base text-xs text-center leading-6">
            {hasDataTitle}
          </p>
        </div>
      )}

      <div
        className={`absolute top-[${hasDataTopPosition}] bottom-[${hasDataBottomPosition}] left-[${hasDataLeftPosition}] right-[${hasDataRightPosition}] ${hasDataPosition == 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : hasDataPosition == 'left' ? 'left-1/4 top-1/2' : hasDataPosition == 'right' ? 'right-1/4 top-1/2' : ''}`}
      >
        <LoaderTryAgainButton error={error} onClick={tryagain} isLoading={isLoading} />
      </div>
    </div>
  </div>
)

export default PageLayout
