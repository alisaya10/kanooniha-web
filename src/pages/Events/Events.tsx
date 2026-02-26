import { useMemo, useRef, useState } from 'react'
import moment from 'jalali-moment'

import Button from '@/components/common/Button/Button'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import CustomJalaliCalendar from '@/components/common/Calendar/CustomJalaliCalendar'
import Modal from '@/components/common/Modal/Modal'
import PageLayout from '@/components/layout/PageLayout/PageLayout'
import {
  useCalendarEventList,
  useDailyEventList,
  useEventSkyRoom,
  type DailyEventItem,
} from '@/queries/events'
import { PATHS } from '@/routes/paths'

const getInitialDateRange = () => {
  const today = moment()
  const first = today.clone().startOf('jMonth')
  const last = today.clone().endOf('jMonth')
  return {
    fromDate: first.locale('en').format('YYYY-MM-DD'),
    toDate: last.locale('en').format('YYYY-MM-DD'),
  }
}

const getTodayGregorian = () => moment().locale('en').format('YYYY-MM-DD')

const Events = () => {
  const [calendarDateRange, setCalendarDateRange] = useState(getInitialDateRange)
  const [selectedDate, setSelectedDate] = useState(getTodayGregorian)
  const [modalMessage, setModalMessage] = useState<string>('')
  const modalRef = useRef<any>(null)

  const calendarParams = useMemo(
    () => ({
      FromDate: calendarDateRange.fromDate,
      ToDate: calendarDateRange.toDate,
    }),
    [calendarDateRange.fromDate, calendarDateRange.toDate],
  )

  const calendarQuery = useCalendarEventList(calendarParams)
  const dailyQuery = useDailyEventList(selectedDate)
  const skyRoomMutation = useEventSkyRoom()

  const eventCounts = calendarQuery.data ?? []
  const dailyEvents: DailyEventItem[] = dailyQuery.data ?? []
  const isLoading = calendarQuery.isFetching || dailyQuery.isFetching
  const error = calendarQuery.isError || dailyQuery.isError

  const handleRetry = () => {
    calendarQuery.refetch()
    dailyQuery.refetch()
  }

  const handleSelectDate = (date: string) => {
    setSelectedDate(date)
  }

  const handleMonthChange = (from: string, to: string) => {
    setCalendarDateRange({ fromDate: from, toDate: to })
  }

  const handleEventSkyRoom = (roomId: number, apiType: number) => {
    skyRoomMutation.mutate(
      { roomId: String(roomId), apiType: String(apiType) },
      {
        onError: () => {
          setModalMessage('خطا در ورود به جلسه. دوباره تلاش کنید.')
          modalRef.current?.open()
        },
      },
    )
  }

  const toPersianDigits = useMemo(() => {
    const map: Record<string, string> = {
      '0': '۰',
      '1': '۱',
      '2': '۲',
      '3': '۳',
      '4': '۴',
      '5': '۵',
      '6': '۶',
      '7': '۷',
      '8': '۸',
      '9': '۹',
      '/': '/',
    }
    return (val?: string) => (val ?? '').replace(/[0-9/]/g, (d) => map[d] ?? d)
  }, [])

  const checkEventTime = (eventDate: string): 'active' | 'not_started' | 'passed' => {
    if (!eventDate) return 'not_started'

    const eventDateTime = new Date(eventDate)
    const now = new Date()

    // مقایسه فقط بر اساس تاریخ (بدون ساعت)
    const eventDateOnly = new Date(
      eventDateTime.getFullYear(),
      eventDateTime.getMonth(),
      eventDateTime.getDate(),
    )
    const todayDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // اگر تاریخ رویداد قبل از امروز باشد
    if (eventDateOnly < todayDateOnly) {
      return 'passed'
    }

    // اگر تاریخ رویداد بعد از امروز باشد
    if (eventDateOnly > todayDateOnly) {
      return 'not_started'
    }

    // اگر تاریخ رویداد همان امروز باشد
    // اگر زمان رویداد هنوز نرسیده
    if (now < eventDateTime) {
      return 'not_started'
    }

    // اگر زمان رویداد گذشته باشد (بیش از 24 ساعت گذشته)
    const hoursDiff = (now.getTime() - eventDateTime.getTime()) / (1000 * 60 * 60)
    if (hoursDiff > 24) {
      return 'passed'
    }

    // اگر در همان روز و زمان رویداد گذشته اما کمتر از 24 ساعت
    return 'active'
  }

  return (
    <PageLayout title="رویداد ها" backLink={PATHS.Dashboard} grayParent={false} hasData={dailyEvents.length} hasDataTitle="رویدادی برای نمایش وجود ندارد.">
      <LoaderTryAgainButton onClick={handleRetry} error={error} isLoading={isLoading} />

      <div className="flex gap-5 lg:flex-row flex-col">

        <div className="lg:w-1/2">
          <CustomJalaliCalendar
            eventCounts={eventCounts}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            onMonthChange={handleMonthChange}
          />
        </div>
        {/* Daily Events */}
        <div className="lg:w-1/2 space-y-3">
          {dailyEvents.map((event) => (
            <div key={event.eventId} className="bg-boxGray rounded-lg p-3 space-y-3">
              <div className="flex justify-between">
                <p className="text-sm">
                  تاریخ:{' '}
                  {/* {toPersianDigits(convertToJalali(
                                            event.eventDate || selectedDate
                                        ))} */}
                  {event.eventDate && (
                    <>
                      {' - '}
                      {toPersianDigits(
                        new Date(event.eventDate).toLocaleTimeString('fa-IR', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        }),
                      )}
                      {' ساعت'}
                    </>
                  )}
                </p>
              </div>

              <p className="text-sm">{event.description || 'توضیحات رویداد'}</p>

              {event.roomId != null && (event.apiType === 0 || event.apiType === 1) && (
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    const timeStatus = checkEventTime(event.eventDate)
                    if (timeStatus === 'active') {
                      handleEventSkyRoom(event.roomId, event.apiType)
                    } else if (timeStatus === 'not_started') {
                      setModalMessage('هنوز رویداد شروع نشده است')
                      modalRef.current?.open()
                    } else if (timeStatus === 'passed') {
                      setModalMessage('زمان ورود به رویداد گذشته است')
                      modalRef.current?.open()
                    }
                  }}
                  disabled={
                    checkEventTime(event.eventDate) === 'passed' ||
                    skyRoomMutation.isPending
                  }
                  className="w-full"
                >
                  ورود به جلسه
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Calendar */}

      </div>

      {/* Modal for Event Time Messages */}
      <Modal ref={modalRef}>
        <div className="bg-white rounded-2xl p-6 max-w-md mx-4">
          <h3 className="font-bold text-lg mb-4 text-center">اطلاع‌رسانی</h3>
          <p className="text-center mb-6">{modalMessage}</p>
          <Button onClick={() => modalRef.current?.close()} className="w-full">
            بستن
          </Button>
        </div>
      </Modal>
    </PageLayout>
  )
}

export default Events
