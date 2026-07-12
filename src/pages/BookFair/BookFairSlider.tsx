import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import type { Swiper as SwiperType } from 'swiper'
import { EffectCards } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import BookFair from '@/assets/images/book-fair-image.png'
import Button from '@/components/common/Button/Button'
import Modal from '@/components/common/Modal/Modal'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'

import { useNavigate } from 'react-router-dom'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { useQueryClient } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

import ProgressBar from '@/components/common/Progress/LineProgress'
import { useGetQuestionList } from '@/queries/bookfair'
import { useGetMemberGift } from '@/queries/bookfair/useGetMemberGift'
import { useSubmitAnswer } from '@/queries/bookfair/useSubmitAnswer'
import { PATHS } from '@/routes/paths'

const CELEBRATION_COLORS = [
  '#3EC14D',
  '#FFD700',
  '#FF6B6B',
  '#22D3EE',
  '#A78BFA',
  '#FBBF24',
]

const fireCelebration = () => {
  const zIndex = 10000
  const burst = (
    particleCount: number,
    spread: number,
    origin: { x?: number; y?: number },
  ) => {
    void confetti({
      particleCount,
      spread,
      startVelocity: 38,
      ticks: 220,
      gravity: 0.9,
      scalar: 1,
      zIndex,
      colors: CELEBRATION_COLORS,
      origin: { x: origin.x ?? 0.5, y: origin.y ?? 0.65 },
    })
  }

  burst(90, 88, { y: 0.62 })
  window.setTimeout(() => burst(55, 55, { x: 0.15, y: 0.7 }), 120)
  window.setTimeout(() => burst(55, 55, { x: 0.85, y: 0.7 }), 240)
}

const CardSlider = () => {
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const { data, isLoading } = useGetQuestionList()
  const { data: dada, refetch: refetchGifts } = useGetMemberGift()
  const answerMutation = useSubmitAnswer()
  const [answerComp, setAnswerComp] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  })
  persistQueryClient({
    queryClient,
    persister,
  })

  const openAnswerModal = () => {
    modalRef.current?.open()
    window.requestAnimationFrame(() => {
      fireCelebration()
    })
  }

  const isEmptyData = !isLoading && Array.isArray(data) && data.length === 0

  let hasQuestions = Array.isArray(data) && data.length > 0

  const SubmitAnswer = (QuestionId: number, Answer: number) => {
    answerMutation.mutate(
      { QuestionId: QuestionId, Answer: Answer },
      {
        onError: (error) => {
          toast.error(error.message, { containerId: 'bookfair' })
        },
        onSuccess: (data) => {
          if (data) {
            console.log('if')
            if (swiperRef.current) {
              swiperRef.current.slideNext()
              toast.success('جواب سوال شما ثبت شد', { containerId: 'bookfair' })
            }
          } else if (data == false) {
            refetchGifts()
            setAnswerComp(true)
            hasQuestions = false
            setTimeout(() => {
              openAnswerModal()
            }, 500)
          }
        },
      },
    )
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success(`کد تخفیف کپی شد ${code}`, { containerId: 'bookfair' })
  }

  const exitUser = async () => {
    localStorage.clear()
    Cookies.remove('bookFairToken')
    queryClient.clear()
    persister.removeClient()
    navigate(PATHS.SIGNUP_BOOK_FAIR)
  }

  const progressValue =
    ((activeSlideIndex + 1) / ((Array.isArray(data) && data?.length) || 1)) * 100

  // const isEmptyData = !data || (Array.isArray(data) && data.length === 0)

  // const hasQuestions = Array.isArray(data) && data.length > 0

  useEffect(() => {
    if (isLoading) return

    if (isEmptyData) {
      setAnswerComp(true)
    }
    if (answerComp == true || (isEmptyData && !hasQuestions)) {
      openAnswerModal()
    }
    console.log('is empty', isEmptyData, 'answer comp', answerComp, 'has q', hasQuestions)
  }, [answerComp, isEmptyData])

  return (
    <div
      className={`relative w-full flex min-h-screen after:absolute after:inset-0 after:bg-black/57 after:z-0`}
    >
      <img className="absolute w-full h-full object-cover" src={BookFair} alt="" />
      <div className="relative z-10 w-full flex-1 flex-col min-h-screen  flex items-center justify-center">
        <style>{`
                .swiper-slide-shadow,
                .swiper-slide-shadow-left,
                .swiper-slide-shadow-right {
                    display: none !important;
                }
                .mySwiper .swiper-slide {
                    transition: filter 0.3s ease;
                    pointer-events: none;
                    filter: grayscale(0.5) blur(2px);
                }
                .mySwiper .swiper-slide.swiper-slide-active {
                    filter: grayscale(0);
                    pointer-events: auto;
                    box-shadow: 0px 1px 16px 8px #00000040;
                }
                @keyframes bookfair-modal-sparkle {
                    0%, 100% {
                        transform: translateY(0) scale(0.75) rotate(-6deg);
                        opacity: 0.35;
                    }
                    50% {
                        transform: translateY(-14px) scale(1.2) rotate(10deg);
                        opacity: 1;
                    }
                }
                .bookfair-modal-sparkle {
                    animation-name: bookfair-modal-sparkle;
                    animation-timing-function: ease-in-out;
                    animation-iteration-count: infinite;
                }
            `}</style>

        {answerComp && (
          <>
            <h1 className="relative z-10 text-white lg:text-4xl text-2xl lg:leading-normal leading-12 text-center lg:px-0 px-5 font-bold lg:mb-15 mb-10">
              ممنون بابت پاسخ های شما <span className="text-yellow-300">جوایز</span> خود
              را دریافت کنید.
            </h1>
            <div className="lg:w-[40%] w-[90%] flex flex-col lg:flex-row gap-3">
              <Button
                onClick={() => openAnswerModal()}
                hoverEffect={false}
                className="w-full h-12 bg-[#FFDE1E] border-0 rounded-lg"
              >
                <p className="text-black font-demibold text-sm ">باز کردن مدال جوایز</p>
              </Button>
              <Button
                onClick={exitUser}
                hoverEffect={false}
                className="w-full h-12 bg-[#FFDE1E] border-0 rounded-lg"
              >
                <p className="text-black font-demibold text-sm text-nowrap">
                  خروج و ثبت شماره جدید
                </p>
              </Button>
            </div>
          </>
        )}

        {!answerComp && (
          <>
            <h1 className="relative z-10 text-white lg:text-4xl text-2xl lg:leading-normal leading-12 text-center lg:px-0 px-5 font-bold lg:mb-15 mb-10">
              به سوالات پاسخ دهید و <span className="text-yellow-300">جوایز</span> خود را
              دریافت کنید.
            </h1>
            <div className="w-full relative ">
              <div className="px-4 sm:px-8 lg:px-16 overflow-hidden">
                <Swiper
                  modules={[EffectCards]}
                  effect="cards"
                  allowTouchMove={false}
                  cardsEffect={{
                    perSlideOffset: 30,
                    perSlideRotate: 5,
                  }}
                  grabCursor={true}
                  navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                  }}
                  pagination={{ clickable: true }}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper
                  }}
                  onSlideChange={(swiper) => {
                    setActiveSlideIndex(swiper.activeIndex)
                  }}
                  className="mySwiper w-full max-w-[400px] mx-auto"
                >
                  {Array.isArray(data) &&
                    data?.map((slide: any) => (
                      <SwiperSlide key={slide.id}>
                        <div className="bg-white border border-black/10  w-full max-w-[400px] mx-auto p-5  min-h-[350px] sm:min-h-[400px] flex flex-col justify-between rounded-lg">
                          <p className=" text-gray-800 font-demibold leading-relaxed text-base">
                            {slide.title}
                          </p>

                          <div className="flex flex-col gap-3 sm:pt-[93px]">
                            <Button
                              hoverEffect={false}
                              onClick={() => SubmitAnswer(slide.id, 1)}
                              className="bg-[#FFDE1E] w-full flex h-11 sm:h-12 border-0 text-sm sm:text-base"
                            >
                              <p className="text-black text-sm font-demibold">
                                {slide.answer1}
                              </p>
                            </Button>
                            <Button
                              hoverEffect={false}
                              onClick={() => SubmitAnswer(slide.id, 2)}
                              className="bg-[#73c7ff] w-full flex h-11 sm:h-12 border-0 text-sm sm:text-base"
                            >
                              <p className="text-black text-sm font-demibold ">
                                {slide.answer2}
                              </p>
                            </Button>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
              <div className="relative z-10 w-[200px] mt-10 m-auto">
                <ProgressBar value={progressValue} />
              </div>
            </div>
          </>
        )}

        <Modal ref={modalRef}>
          <div className="relative bg-white rounded-xl p-6 max-w-lg mx-4 shadow-lg overflow-hidden">
            <h3 className="relative font-bold text-lg mb-3 text-center text-gray-900 z-10">
              تبریک! جایزه شما
            </h3>
            <p className="relative text-center mb-5 text-gray-700 leading-relaxed text-sm sm:text-base z-10 px-1">
              کد تخفیف خود را کپی کنید و با مراجعه به لینک ها با استفاده از کد تخفیف اقدام
              به دریافت خدمات کنید.
            </p>
            {Array.isArray(dada) &&
              dada?.map((prop: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="border border-gray-200 hover:border-yellow-300 p-3 space-y-2 last:mb-0 mb-2 rounded-lg transition-all hover:shadow-sm bg-white"
                  >
                    <p className="text-xs font-bold text-gray-800">{prop.title}</p>
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                      {prop.description}
                    </p>

                    <div className="flex items-center justify-between gap-2">
                      {prop.code ? (
                        <button
                          onClick={() => handleCopyCode(prop.code)}
                          className="flex items-center gap-1 px-2 py-1 cursor-pointer bg-yellow-100 text-black text-[11px] font-semibold rounded transition-colors"
                        >
                          <span>{prop.code}</span>
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      ) : (
                        <div></div>
                      )}

                      <a
                        href={
                          prop.link.startsWith('http')
                            ? prop.link
                            : `https://${prop.link}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          hoverEffect={false}
                          className="bg-[#FFDE1E] border-0 text-black text-xs font-medium px-3 py-1 rounded h-auto"
                        >
                          <p className="text-black">مشاهده سایت</p>
                        </Button>
                      </a>
                    </div>
                  </div>
                )
              })}
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default CardSlider
