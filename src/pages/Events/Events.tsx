import { useMemo, useRef, useState } from 'react'
import moment from 'jalali-moment'

import clockImage from '@/assets/icons/clock-icon.png'
import personImage from '@/assets/icons/profile-icon.png'
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
import { toJalaliFarsi, toJalaliTextFarsi } from '@/utils/date'

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

  return (
    <PageLayout
      title="رویداد ها"
      backLink={PATHS.Dashboard}
      grayParent={false}
      hasData={dailyEvents.length}
      hasDataTitle="رویدادی برای نمایش وجود ندارد."
      hasDataPosition="left"
    >
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
              <p className="text-textGray700 font-bold text-sm">{event.description}</p>
              <div className="flex items-center space-x-1">
                <img className="w-5 h-5" src={personImage} />
                <p className="text-textGray700 font-medium text-sm">مدرس: بابک اسلامی</p>
              </div>
              <div className="flex items-center space-x-1">
                <img className="w-5 h-5" src={clockImage} />
                <p className="text-textGray700 font-medium text-sm">
                  زمان شروع: {toJalaliTextFarsi(event.eventDate)} ساعت{' '}
                  {new Date(event.eventDate).toLocaleTimeString('fa-IR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </p>
              </div>
              <div className="w-full flex items-center justify-end">
                <p className="text-textGray700">
                  {new Date(event.eventDate).toLocaleTimeString('fa-IR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}{' '}
                  | {toJalaliFarsi(event.eventDate)}
                </p>
              </div>

              {event.roomId != null && (event.apiType === 0 || event.apiType === 1) && (
                <Button
                  onClick={(e) => {
                    // e.preventDefault()
                    handleEventSkyRoom(event.roomId, event.apiType)
                  }}
                  // disabled={
                  //   checkEventTime(event.eventDate) === 'passed' ||
                  //   skyRoomMutation.isPending
                  // }
                  className="w-full"
                >
                  ورود به جلسه
                </Button>
              )}
            </div>
          ))}
        </div>
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
