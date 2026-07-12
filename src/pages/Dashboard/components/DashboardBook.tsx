import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import kanoonBookImage2 from '@/assets/images/kanoon-book-image-2.png'
import kanoonBookImage3 from '@/assets/images/kanoon-book-image-3.png'
import kanoonBookImage from '@/assets/images/kanoon-book-image.png'

const slides = [
  {
    id: 1,
    image: kanoonBookImage,
    title: 'کتاب نوروز',
    description: 'دسته بندی تمرینات جدید ویژه نوروز',
    link: 'https://www.kanoonbook.ir/store/book/1540',
  },
  {
    id: 2,
    image: kanoonBookImage2,
    title: 'تست تاک',
    description: 'کتاب تست تاک کانونی ها',
    link: 'https://www.kanoonbook.ir/store/book/1047',
  },
  {
    id: 3,
    image: kanoonBookImage3,
    title: 'کتاب جمع بندی',
    description: 'کتاب چمع بندی کنکور رشته تجربی',
    link: 'https://www.kanoonbook.ir/store/book/2250',
  },
]

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timerRef = useRef<number | null>(null)

  // حرکت به اسلاید بعدی
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [])

  // حرکت به اسلاید قبلی
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  // ریست تایمر (برای وقتی کاربر کلیک می‌کند)
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    timerRef.current = setInterval(nextSlide, 5000) // هر 5 ثانیه تغییر کند
  }, [nextSlide])

  // راه‌اندازی تایمر خودکار هنگام mount و وقتی currentIndex یا nextSlide تغییر می‌کند
  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [resetTimer])

  // هندلرهای کلیک با ریست تایمر
  const handlePrevClick = () => {
    prevSlide()
    resetTimer()
  }

  const handleNextClick = () => {
    nextSlide()
    resetTimer()
  }

  return (
    <div className="relative bg-gray-900 rounded-xl overflow-hidden">
      {/* تصویر */}
      <div className="relative">
        <Link target="_blank" to={slides[currentIndex].link}>
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className="w-full h-full object-contain"
          />
        </Link>

        {/* متن زیر تصویر */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{slides[currentIndex].title}</h2>
          <p className="text-lg">{slides[currentIndex].description}</p>
        </div>
      </div>

      {/* دکمه قبلی */}
      <button
        onClick={handlePrevClick}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* دکمه بعدی */}
      <button
        onClick={handleNextClick}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* (اختیاری) نمایش دایره‌های نشانگر موقعیت */}
      {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              resetTimer();
            }}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div> */}
    </div>
  )
}

export default ImageSlider
