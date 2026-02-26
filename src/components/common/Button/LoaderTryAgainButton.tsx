import { SpinLoading } from 'respinner'

import Button from './Button'

interface LoaderTryAgainButtonProps {
  onClick?: () => void
  error?: boolean
  isLoading?: boolean
}

const LoaderTryAgainButton = ({
  onClick,
  error = false,
  isLoading = false,
}: LoaderTryAgainButtonProps) => {
  if (isLoading || error)
    return (
      <div className="absolute flex items-center space-y-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {isLoading && error == false ? (
          <SpinLoading
            duration={0.8}
            fill="#185390"
            borderRadius={2}
            count={9}
            barHeight={11.45}
            barWidth={3.82}
            size={42}
          />
        ) : (
          isLoading == false &&
          error == true && <Button onClick={onClick}>تلاش مجدد</Button>
        )}
      </div>
    )
}

export default LoaderTryAgainButton
