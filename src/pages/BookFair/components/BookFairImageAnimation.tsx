import { useEffect, useState } from 'react'

const BookFairImageAnimation = ({ imageSrc, texts }: any) => {
  const [displayedText, setDisplayedText] = useState({
    line1: '',
    line2: '',
  })

  const [textIndex, setTextIndex] = useState(0)

  useEffect(() => {
    let line1Index = 0
    let line2Index = 0
    let isLine1Complete = false
    let isRestarting = false

    const currentText = texts[textIndex]

    const interval = setInterval(() => {
      if (!isLine1Complete) {
        // خط اول در حال تایپ
        if (line1Index <= currentText.line1.length) {
          setDisplayedText((prev) => ({
            ...prev,
            line1: currentText.line1.slice(0, line1Index),
          }))
          line1Index++
        } else {
          isLine1Complete = true
        }
      } else if (line2Index <= currentText.line2.length) {
        // خط دوم در حال تایپ
        setDisplayedText((prev) => ({
          ...prev,
          line2: currentText.line2.slice(0, line2Index),
        }))
        line2Index++
      } else if (!isRestarting) {
        // هر دو خط کامل شدن، آماده برای restart
        isRestarting = true
        setTimeout(() => {
          // تغییر به متن بعدی
          setTextIndex((prev) => (prev === 0 ? 1 : 0))
          // ریست کردن همه مقادیر
          line1Index = 0
          line2Index = 0
          isLine1Complete = false
          isRestarting = false
          setDisplayedText({
            line1: '',
            line2: '',
          })
        }, 1000) // مکث 1 ثانیه قبل از تکرار
      }
    }, 150)

    return () => clearInterval(interval)
  }, [textIndex])
  return (
    <div className="relative lg:flex hidden flex-1 after:absolute after:inset-0 after:bg-black/57 after:pointer-events-none">
      <img className="w-full h-dvh object-cover" src={imageSrc} alt="" />
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center w-full text-5xl leading-20 font-bold px-4 z-10">
        {displayedText.line1}
        {displayedText.line1 && <br />}
        {displayedText.line2}
      </h1>
    </div>
  )
}

export default BookFairImageAnimation
