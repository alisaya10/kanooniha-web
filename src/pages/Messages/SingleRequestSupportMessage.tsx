import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Button from '@/components/common/Button/Button'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import { useTicketMessageInsert } from '@/queries/support/useTicketMessageInsert'
import { useTicketMessageList } from '@/queries/support/useTicketMessageList'
import { PATHS } from '@/routes/paths'
import type { TicketAppItem, TicketMessageItem } from '@/types/api/support.types'

const SingleRequestSupportMessage = () => {
  const [messageText, setMessageText] = useState('')
  const location = useLocation()
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const ticket = location?.state?.message as TicketAppItem | undefined
  const ticketId = ticket?.ticketId

  const {
    data: messages = [],
    isLoading,
    isError,
    refetch,
  } = useTicketMessageList(ticketId)
  const { mutate: sendMessage, isPending: isSending } = useTicketMessageInsert()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    const text = messageText.trim()
    if (!text || isSending || ticketId == null) return
    sendMessage(
      { ticketId, message: text },
      {
        onSuccess: () => {
          setMessageText('')
          refetch()
        },
      },
    )
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(e.target.value)
    const el = e.target
    el.style.height = '44px'
    el.style.height = `${el.scrollHeight}px`
  }

  const formatTime = (iso?: string) => {
    if (!iso) return ''
    const d = new Date(iso)
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  }

  const orderedMessages = useMemo((): TicketMessageItem[] => {
    if (!Array.isArray(messages)) return []
    return [...messages].reverse()
  }, [messages])

  return (
    <PageLayout
      title="درخواست پشتیبانی"
      backLink={PATHS.Dashboard}
      minHeight={0}
      grayParent={false}
    >
      <div className="lg:mx-6 mx-3 my-6 space-y-3">
        <div className="bg-boxGray rounded-xl relative min-h-[400px] max-h-[65vh] overflow-y-auto p-4">
          <LoaderTryAgainButton
            onClick={() => refetch()}
            error={isError}
            isLoading={isLoading}
          />

          {!isLoading && !isError && (
            <div className="space-y-4">
              {orderedMessages.length > 0 ? (
                orderedMessages.map((msg: TicketMessageItem) => {
                  const isUser = msg?.senderKind === 0 // 0: user, 1: support (based on provided sample)
                  return (
                    <div
                      key={msg?.messageId}
                      className={`w-full flex ${isUser ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className="max-w-[92%] sm:max-w-[80%] ">
                        <div
                          className={`rounded-2xl px-3 py-2 shadow ${isUser ? 'bg-seeAllBlue text-white rounded-br-sm' : 'bg-white text-textGray900 rounded-bl-sm'}`}
                        >
                          {msg?.fullName && (
                            <p
                              className={`text-xs mb-1 ${isUser ? 'text-white/90' : 'text-textGray600'}`}
                            >
                              {msg?.fullName}
                            </p>
                          )}
                          <p className="text-sm leading-6 wrap-break-words break-all whitespace-pre-wrap">
                            {msg?.message}
                          </p>
                        </div>
                        {msg?.dateCreate && (
                          <p
                            className={`mt-1 text-xs ${isUser ? 'text-textGray700 text-start' : 'text-textGray700 text-end'}`}
                          >
                            {formatTime(msg.dateCreate)}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="flex flex-col items-center space-y-4 py-12">
                  <img
                    src="images/not-found-news-image.png"
                    className="h-[120px]"
                    alt=""
                  />
                  <p className="font-bold text-sm text-textGray700">
                    هیچ پیامی برای این گفتگو ثبت نشده است.
                  </p>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        {!ticket?.isClosed && (
          <div className="flex gap-2">
            <div className="flex-1">
              <textarea
                value={messageText}
                onChange={handleTextareaChange}
                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder="پیام خود را بنویسید..."
                className="w-full min-h-[44px] max-h-[200px] outline-none border rounded-[8px] px-3 py-2 text-sm resize-none"
                rows={1}
                style={{
                  overflow: 'hidden',
                  overflowY: 'auto',
                }}
              />
            </div>
            <Button
              isLoading={isSending}
              onClick={handleSendMessage}
              imageSrc={undefined}
              className="bg-seeAllBlue hover:bg-seeAllBlue/80 text-white h-[44px] rounded-[8px] text-sm font-bold"
            >
              ارسال
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default SingleRequestSupportMessage
