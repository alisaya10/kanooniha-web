import { useEffect, useState } from 'react'

import kanoonLogo from '@/assets/images/kanoon-logo-image.png'

const SPLASH_DURATION_MS = 2500

export function SplashScreen() {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsExiting(true)
    }, SPLASH_DURATION_MS)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-50 items-center justify-center bg-diagonal-gradient ${
        isExiting ? 'hidden' : 'flex'
      }`}
    >
      <img
        src={kanoonLogo}
        alt="کانونی ها"
        className="w-[182px] h-[182px] border-[3px] border-blue-800 rounded-full"
      />
    </div>
  )
}
