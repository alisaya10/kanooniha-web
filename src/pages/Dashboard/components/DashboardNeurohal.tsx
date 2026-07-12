import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import neurohalImage from '@/assets/images/neurohal-image.png'
import Button from '@/components/common/Button/Button'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import { useAppPromotionList } from '@/queries/appPromotion/useAppPromotionList'

const FADE_DURATION = 500
const DEFAULT_BACKGROUND_COLOR = '#E5E6FF'

const normalizeColor = (color?: string) => {
  if (!color) return DEFAULT_BACKGROUND_COLOR

  const trimmed = color.trim()
  if (!trimmed) return DEFAULT_BACKGROUND_COLOR

  if (/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(trimmed)) return `#${trimmed}`

  return trimmed
}

const DashboardNeurohal = () => {
  const { data, isLoading, isError, refetch } = useAppPromotionList()

  const slides = useMemo(
    () => (Array.isArray(data) ? data.filter((item) => item.isActive) : []),
    [data],
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const timerRef = useRef<number | null>(null)
  const touchStartX = useRef(0)
  const isTransitioningRef = useRef(false)

  const safeIndex = slides.length > 0 ? currentIndex % slides.length : 0

  const changeSlide = useCallback(
    (targetIndex: number) => {
      if (isTransitioningRef.current || targetIndex === currentIndex) return

      isTransitioningRef.current = true
      setIsVisible(false)

      window.setTimeout(() => {
        setCurrentIndex(targetIndex)
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            setIsVisible(true)
            window.setTimeout(() => {
              isTransitioningRef.current = false
            }, FADE_DURATION)
          })
        })
      }, FADE_DURATION)
    },
    [currentIndex],
  )

  const nextSlide = useCallback(() => {
    changeSlide(currentIndex === slides.length - 1 ? 0 : currentIndex + 1)
  }, [changeSlide, currentIndex, slides.length])

  const prevSlide = useCallback(() => {
    changeSlide(currentIndex === 0 ? slides.length - 1 : currentIndex - 1)
  }, [changeSlide, currentIndex, slides.length])

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (slides.length > 1) {
      timerRef.current = window.setInterval(nextSlide, 5000)
    }
  }, [nextSlide, slides.length])

  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [resetTimer])

  const goToSlide = (index: number) => {
    changeSlide(index)
    resetTimer()
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (slides.length <= 1) return

    const diff = touchStartX.current - event.changedTouches[0].clientX

    if (Math.abs(diff) < 50) return

    if (diff > 0) nextSlide()
    else prevSlide()

    resetTimer()
  }

  if (isLoading || isError) {
    return (
      <div className="bg-[#E5E6FF] rounded-xl min-h-[200px] relative">
        <LoaderTryAgainButton
          onClick={() => refetch()}
          error={isError}
          isLoading={isLoading}
        />
      </div>
    )
  }

  if (slides.length === 0) return null

  const slide = slides[safeIndex]

  return (
    <div
      className="rounded-xl relative pb-5 transition-colors duration-700 ease-in-out"
      style={{ backgroundColor: normalizeColor(slide.color) }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`flex py-5 pr-[30px] pl-6 items-center gap-6 transition-opacity duration-500 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          src={slide.imagePath || neurohalImage}
          alt={slide.title}
          className="w-[100px] h-[100px] object-contain shrink-0"
        />
        <div className="flex flex-col gap-[15px]">
          <h2 className="text-base font-bold text-[#7983FE] text-center">
            {slide.title}
          </h2>
          {slide.description && <p className="text-xs leading-5">{slide.description}</p>}
          {slide.link && (
            <div className="w-full">
              <Button
                hoverEffect={false}
                onClick={() => window.open(slide.link, '_blank')}
                className="w-full bg-[#7983FE] text-white font-bold border-0 h-[40px]"
              >
                دانلود اپلیکیشن
              </Button>
            </div>
          )}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {slides.map((item, index) => (
            <button
              key={item.id ?? index}
              type="button"
              aria-label={`اسلاید ${index + 1}`}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-200 ${
                index === safeIndex ? 'w-6' : 'w-2'
              }`}
              style={{
                backgroundColor: '#7983FE',
                opacity: index === safeIndex ? 1 : 0.4,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default DashboardNeurohal
