import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import sendIcon from '@/assets/icons/send-icon.png'
import kanoonLogo from '@/assets/images/kanoon-logo-image.png'
import Button from '@/components/common/Button/Button'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import Modal from '@/components/common/Modal/Modal'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import { useUserInfo } from '@/queries/auth'
import { useInspectorInfo } from '@/queries/support/useInspectorInfo'
import { useTicketMessageInsert } from '@/queries/support/useTicketMessageInsert'
import { useTicketMessageList } from '@/queries/support/useTicketMessageList'
import { PATHS } from '@/routes/paths'
import { fetchInspectorInfo } from '@/services/api/support'
import type {
  InspectorInfo,
  InspectorInfoParams,
  TicketAppItem,
  TicketMessageItem,
} from '@/types/api/support.types'

function isValidInspectorInfo(
  info: InspectorInfo | null | undefined,
): info is InspectorInfo {
  if (!info) return false
  if (info.officeCode === 0 && info.areaCode === 0) return false
  if (info.fullName === 'حذف شده') return false
  return true
}

const SingleRequestSupportMessage = () => {
  const [messageText, setMessageText] = useState('')
  const [inspectorParams, setInspectorParams] = useState<InspectorInfoParams | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const inspectorModalRef = useRef<{ open: () => void; close: () => void } | null>(null)
  const location = useLocation()
  const queryClient = useQueryClient()
  const { data: userData } = useUserInfo()

  const ticket = location?.state?.message as TicketAppItem | undefined
  const ticketId = ticket?.ticketId

  const {
    data: messages = [],
    isLoading,
    isError,
    refetch,
  } = useTicketMessageList(ticketId)
  const { mutate: sendMessage, isPending: isSending } = useTicketMessageInsert()
  const {
    data: inspectorInfo,
    isLoading: isInspectorLoading,
    isError: isInspectorError,
    refetch: refetchInspectorInfo,
  } = useInspectorInfo(inspectorParams)

  const handleInspectorProfileClick = async (msg: TicketMessageItem) => {
    const params = { officeCode: msg.officeCode, areaCode: msg.areaCode }

    try {
      const info = await queryClient.fetchQuery({
        queryKey: ['inspectorInfo', params.officeCode, params.areaCode],
        queryFn: () => fetchInspectorInfo(params),
      })

      if (!isValidInspectorInfo(info)) return

      setInspectorParams(params)
      inspectorModalRef.current?.open()
    } catch {
      // اطلاعات پشتیبان موجود نیست — مدال باز نمی‌شود
    }
  }

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '28px'
    }
  }

  const scrollToLatestMessage = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = () => {
    const text = messageText.trim()
    if (!text || isSending || ticketId == null) return
    sendMessage(
      { ticketId, message: text },
      {
        onSuccess: () => {
          setMessageText('')
          resetTextareaHeight()
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

  useEffect(() => {
    if (orderedMessages.length === 0) return
    scrollToLatestMessage()
  }, [orderedMessages])

  return (
    <PageLayout
      title="درخواست پشتیبانی"
      backLink={PATHS.Dashboard}
      minHeight={0}
      hasData={messages.length}
      isLoading={isLoading}
      error={isError}
      hasDataTitle="پیامی با این شناسه پیدا نشد."
    >
      <div className="flex flex-col h-[calc(100dvh-15rem)] lg:h-[calc(100dvh-17.5rem)]">
        <div className="flex-1 min-h-0 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {orderedMessages.map((msg, index) => {
            const isUser = msg?.senderKind === 0
            return (
              <div
                key={msg?.messageId}
                className={`w-full ${index !== 0 ? 'mt-5' : 'mt-0'} flex ${isUser ? 'justify-start' : 'justify-end'}`}
              >
                <div className="flex max-w-[92%] sm:max-w-[80%] space-x-2">
                  {isUser && (
                    <img
                      className="min-w-[42px] min-h-[42px] max-w-[42px] max-h-[42px] rounded-full object-cover"
                      src={userData?.avatar}
                    />
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2 gap-3">
                      {msg?.fullName && (
                        <p className="text-xs font-bold text-gray-700">{msg?.fullName}</p>
                      )}
                      {msg?.dateCreate && (
                        <p
                          className={`text-xs font-bold text-gray-500 ${isUser ? 'text-start' : 'text-end'}`}
                        >
                          {formatTime(msg.dateCreate)}
                        </p>
                      )}
                    </div>
                    <div
                      className={`rounded-xl px-3 py-2 ${isUser ? 'bg-white text-black' : 'bg-[#185390] text-white'}`}
                    >
                      <p className="text-sm font-medium leading-6 wrap-break-words break-all whitespace-pre-wrap">
                        {msg?.message}
                      </p>
                    </div>
                  </div>
                  {!isUser && (
                    <button
                      type="button"
                      onClick={() => handleInspectorProfileClick(msg)}
                      className="shrink-0 cursor-pointer"
                      aria-label="مشاهده اطلاعات پشتیبان"
                    >
                      <img
                        className="min-w-[42px] min-h-[42px] max-w-[42px] max-h-[42px] rounded-full object-cover"
                        src={kanoonLogo}
                        alt=""
                      />
                    </button>
                  )}
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center gap-2 mt-4 shrink-0 border border-[#1379E2] rounded-[8px] px-3 py-2">
          <textarea
            ref={textareaRef}
            value={messageText}
            onChange={handleTextareaChange}
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder="پیام خود را بنویسید..."
            className="flex-1 min-h-[28px] max-h-[200px] outline-0 text-sm resize-none font-semibold bg-transparent"
            rows={1}
            style={{
              overflow: 'hidden',
              overflowY: 'auto',
            }}
          />
          <button
            type="button"
            onClick={handleSendMessage}
            disabled={!messageText.trim() || isSending}
            className="shrink-0 flex items-center justify-center disabled:opacity-40"
            aria-label="ارسال پیام"
          >
            <img src={sendIcon} alt="" className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Modal ref={inspectorModalRef}>
        <div className="bg-white flex flex-col items-center px-4 py-6 rounded-xl w-[min(100%,320px)] mx-4 relative min-h-[280px]">
          <LoaderTryAgainButton
            onClick={() => refetchInspectorInfo()}
            error={isInspectorError}
            isLoading={isInspectorLoading}
          />
          {!isInspectorLoading && !isInspectorError && inspectorInfo && (
            <>
              <img
                src={kanoonLogo}
                className="w-[82px] h-[82px] rounded-full object-cover mb-4"
                alt=""
              />
              <p className="text-base font-bold mb-6">{inspectorInfo.fullName}</p>
              <div className="w-full space-y-4 mb-8">
                {inspectorInfo.vocation && (
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-gray-500">سمت</p>
                    <p className="text-sm font-bold text-gray-800">
                      {inspectorInfo.vocation}
                    </p>
                  </div>
                )}
                {inspectorInfo.course && (
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-gray-500">رشته</p>
                    <p className="text-sm font-bold text-gray-800">
                      {inspectorInfo.course}
                    </p>
                  </div>
                )}
                {inspectorInfo.managerName && (
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-gray-500">مدیر</p>
                    <p className="text-sm font-bold text-gray-800">
                      {inspectorInfo.managerName}
                    </p>
                  </div>
                )}
              </div>
              <Button
                onClick={() => inspectorModalRef.current?.close()}
                className="min-h-10 text-sm font-demibold w-full"
              >
                بستن
              </Button>
            </>
          )}
        </div>
      </Modal>
    </PageLayout>
  )
}

export default SingleRequestSupportMessage
