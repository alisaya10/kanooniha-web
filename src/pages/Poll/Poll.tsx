import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import messageIcon from '@/assets/icons/message-icon.png'
import Button from '@/components/common/Button/Button'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import { usePollList, usePollSet } from '@/queries/polls'

export default function Poll() {
  const [pollData, setPollData] = useState<any>({})
  const [selectedOptions, setSelectedOptions] = useState<any>({})
  const [textAnswers, setTextAnswers] = useState<any>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [successMessage, setSuccessMessage] = useState('')
  const pollInitializedRef = useRef(false)

  const { mutate: pollSet } = usePollSet()
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { data: polls = [] } = usePollList()

  useEffect(() => {
    if (pollInitializedRef.current) return

    if (Array.isArray(polls) && polls.length > 0) {
      setIsModalOpen(true)
      setPollData(polls[0])
      pollInitializedRef.current = true
    }
  }, [polls])

  const handleOptionChange = (questionNumber: number, option: any) => {
    setSelectedOptions((prev: any) => ({
      ...prev,
      [questionNumber]: option,
    }))
  }

  const handleTextAnswerChange = (questionNumber: number, value: any) => {
    setTextAnswers((prev: any) => ({
      ...prev,
      [questionNumber]: value,
    }))
  }

  const handleSubmit = (questionNumber: number) => {
    const isTextType = pollData?.type === 2
    const selectedOption = isTextType
      ? textAnswers[questionNumber]?.trim()
      : selectedOptions[questionNumber]
    if (!selectedOption) {
      alert(isTextType ? 'لطفا پاسخ خود را وارد کنید' : 'لطفا یک گزینه انتخاب کنید')
      return
    }

    const poll = pollData.polls.find((p: any) => p.questionNumber === questionNumber)
    if (!poll) {
      alert('سوال پیدا نشد')
      return
    }

    const payload = {
      uniqueId: pollData.uniqueId,
      pollDetailId: poll.pollDetailsId.toString(),
      answer: isTextType ? selectedOption : (pollData?.answer ?? null),
      checkedOptions: pollData?.checkedOptions ?? null,
      selectedOption: isTextType ? null : selectedOption,
    }

    pollSet(payload, {
      onError: (error) => {
        console.log(error)
      },
      onSuccess: () => {
        const isLastQuestion = currentQuestionIndex >= pollData.polls.length - 1

        if (!isLastQuestion) {
          setCurrentQuestionIndex(currentQuestionIndex + 1)
          return
        }

        setIsModalOpen(false)
        setSuccessMessage('نظرسنجی با موفقیت انجام شد')
        queryClient.invalidateQueries({ queryKey: ['pollList'] })
        setTimeout(() => {
          navigate('/')
        }, 1000)
      },
    })
  }

  const currentPoll = pollData?.polls?.[currentQuestionIndex]

  return (
    <PageLayout
      title="نظرسنجی"
      hasData={1}
      hasBackButton={pollData?.isRequired ? false : true}
    >
      <div className="lg:mx-0 mx-3">
        <div className="flex items-center justify-between w-full border-b border-b-gray-300 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <img
              src={messageIcon}
              className="filter grayscale brightness-75 w-5 h-5"
              alt=""
            />
            <p className="text-textGray font-bold text-base">{pollData?.title}</p>
          </div>
        </div>

        {isModalOpen && currentPoll && (
          <div className="w-full">
            <p className="mb-3 font-medium text-base">
              {currentQuestionIndex + 1} - {currentPoll?.question}
            </p>

            {pollData?.type === 2 ? (
              <textarea
                className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="پاسخ خود را بنویسید..."
                value={textAnswers[currentPoll.questionNumber] ?? ''}
                onChange={(e) =>
                  handleTextAnswerChange(currentPoll.questionNumber, e.target.value)
                }
              />
            ) : (
              currentPoll?.options?.map((option: any, optIndex: number) => (
                <label
                  key={optIndex}
                  className="flex items-center gap-2 mb-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${currentPoll.questionNumber}`}
                    value={optIndex + 1}
                    checked={selectedOptions[currentPoll.questionNumber] === optIndex + 1}
                    onChange={() =>
                      handleOptionChange(currentPoll.questionNumber, optIndex + 1)
                    }
                  />
                  <p className="font-medium text-sm">{option}</p>
                </label>
              ))
            )}

            <div className="mt-1">
              <Button
                onClick={() => handleSubmit(currentPoll.questionNumber)}
                className="min-h-10 text-sm font-demibold"
              >
                ثبت پاسخ
              </Button>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="w-full max-w-md mx-auto px-4 py-6 text-center">
            <p className="text-green-600 font-iransans font-bold text-base">
              {successMessage}
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
