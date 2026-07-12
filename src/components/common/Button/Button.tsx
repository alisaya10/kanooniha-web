import { SpinLoading } from 'respinner'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  imageSrc?: string
  imageAlt?: string
  hoverEffect?: boolean
  isLoading?: boolean
  disabled?: boolean
}

const Button = ({
  children,
  className = '',
  style,
  onClick,
  imageSrc,
  imageAlt = 'button icon',
  hoverEffect = true,
  isLoading = false,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      style={style}
      className={`border group border-seeAllBlue min-h-8 min-w-[85px] cursor-pointer text-seeAllBlue rounded-lg flex items-center justify-center gap-2 px-3 transition ${
        hoverEffect ? 'hover:bg-seeAllBlue hover:text-white' : ''
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
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
