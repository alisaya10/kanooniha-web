import { SpinLoading } from 'respinner'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  imageSrc?: string
  imageAlt?: string
  isLoading?: boolean
  disabled?: boolean
}

const Button = ({
  children,
  className = '',
  onClick,
  imageSrc,
  imageAlt = 'button icon',
  isLoading = false,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`border group border-seeAllBlue min-h-8 min-w-[85px] cursor-pointer text-seeAllBlue rounded-lg flex items-center justify-center gap-2 px-3 hover:bg-seeAllBlue hover:text-white transition ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {isLoading ? (
        <SpinLoading
          duration={0.8}
          fill="#185390"
          borderRadius={2}
          count={9}
          barHeight={5}
          barWidth={2}
          size={20}
        />
      ) : (
        <>
          {imageSrc && (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-6 h-6 group-hover:filter group-hover:brightness-0 group-hover:invert"
            />
          )}
          {children}
        </>
      )}
    </button>
  )
}

export default Button
