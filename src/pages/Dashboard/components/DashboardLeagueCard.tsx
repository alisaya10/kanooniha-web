import { useCallback, useEffect, useRef, useState } from 'react'

import bronzeCupImage from '@/assets/images/bronze-cup-image.png'
import bronzeShineImage from '@/assets/images/bronze-shine-image.png'
import goldCupImage from '@/assets/images/gold-cup-image.png'
import goldShineImage from '@/assets/images/gold-shine-image.png'
import silverCupImage from '@/assets/images/silver-cup-image.png'
import silverShineImage from '@/assets/images/silver-shine-image.png'
import Button from '@/components/common/Button/Button'

const slides = [
  {
    id: 1,
    title: 'نفر اول لیگ درسی',
    name: 'پارسا محمدی',
    correctCount: 12,
    cupImage: goldCupImage,
    shineImage: goldShineImage,
    titleColor: '#F1B716',
    gradientFrom: '#E19E15',
    gradientTo: '#FEDB39',
    backgroundColor: '#FFF5D9',
  },
  {
    id: 2,
    title: 'نفر دوم لیگ درسی',
    name: 'امیرحسین رضایی',
    correctCount: 10,
    cupImage: silverCupImage,
    shineImage: silverShineImage,
    titleColor: '#A8A8A8',
    gradientFrom: '#8E8E8E',
    gradientTo: '#D4D4D4',
    backgroundColor: '#F0F0F0',
  },
  {
    id: 3,
    title: 'نفر سوم لیگ درسی',
    name: 'سارا احمدی',
    correctCount: 9,
    cupImage: bronzeCupImage,
    shineImage: bronzeShineImage,
    titleColor: '#CD7F32',
    gradientFrom: '#A0522D',
    gradientTo: '#CD7F32',
    backgroundColor: '#FAEBD7',
  },
]

const FADE_DURATION = 500

const DashboardLeagueCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const timerRef = useRef<number | null>(null)
  const touchStartX = useRef(0)
  const isTransitioningRef = useRef(false)

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
  }, [changeSlide, currentIndex])

  const prevSlide = useCallback(() => {
    changeSlide(currentIndex === 0 ? slides.length - 1 : currentIndex - 1)
  }, [changeSlide, currentIndex])

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(nextSlide, 5000)
  }, [nextSlide])

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
    const diff = touchStartX.current - event.changedTouches[0].clientX

    if (Math.abs(diff) < 50) return

    if (diff > 0) nextSlide()
    else prevSlide()

    resetTimer()
  }

  const slide = slides[currentIndex]

  return (
    <div
      className="rounded-xl min-h-[200px] relative overflow-visible pb-5 transition-colors duration-700 ease-in-out"
      style={{ backgroundColor: slide.backgroundColor }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`flex items-center justify-between px-[38px] py-5 transition-opacity duration-500 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col gap-[15px]">
          <h1 className="font-bold text-[20px]" style={{ color: slide.titleColor }}>
            {slide.title}
          </h1>
          <p className="font-bold text-[14px] text-[#1B1B1A]">{slide.name}</p>
          <p className="font-bold text-[14px] text-[#282827]">
            تعداد سوالات درست : {slide.correctCount}
          </p>
          <Button
            hoverEffect={false}
            className="min-w-[190px] border-0 h-10"
            style={{
              backgroundImage: `linear-gradient(to right, ${slide.gradientFrom}, ${slide.gradientTo})`,
            }}
          >
            <p className="text-white font-bold text-xs">دیدن رتبه من</p>
          </Button>
        </div>
        <div className="relative overflow-visible shrink-0">
          <img
            src={slide.shineImage}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[185px] max-w-none pointer-events-none"
            alt=""
          />
          <img src={slide.cupImage} className="relative w-[150px]" alt="league-cup" />
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`اسلاید ${index + 1}`}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-200 ${
              index === currentIndex ? 'w-6' : 'w-2'
            }`}
            style={{
              backgroundColor: item.titleColor,
              opacity: index === currentIndex ? 1 : 0.4,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default DashboardLeagueCard
