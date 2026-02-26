import { useState } from 'react'
import moment from 'jalali-moment'

import leftArrowIcon from '@/assets/icons/arrow-left-icon.png'
import rightArrowIcon from '@/assets/icons/arrow-right-icon.png'

moment.locale('fa')

interface Props {
  eventCounts: Array<{
    eventDate: string
    totalEventCount: number
  }>
  selectedDate?: string // میلادی
  onSelectDate: (date: string) => void // میلادی
  onMonthChange?: (fromDate: string, toDate: string) => void // میلادی
}

const weekDays = ['شنبه ', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'جمعه ']
const monthNames = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
]

const CustomJalaliCalendar = ({
  eventCounts,
  selectedDate,
  onSelectDate,
  onMonthChange,
}: Props) => {
  const [currentMonth, setCurrentMonth] = useState(moment().startOf('jMonth'))

  const startOfMonth = currentMonth.clone().startOf('jMonth')
  const daysInMonth = currentMonth.jDaysInMonth()
  const firstWeekDay = startOfMonth.jDay() // تغییر از day() به jDay()

  const changeMonth = (dir: number) => {
    const newMonth = currentMonth.clone().add(dir, 'jMonth')
    setCurrentMonth(newMonth)

    // اول ماه شمسی را به میلادی تبدیل می‌کنیم
    const firstDayJalali = newMonth.clone().startOf('jMonth')
    // آخر ماه شمسی را به میلادی تبدیل می‌کنیم
    const lastDayJalali = newMonth.clone().endOf('jMonth')

    // تبدیل به تاریخ میلادی
    const fromDateGregorian = firstDayJalali.locale('en').format('YYYY-MM-DD')
    const toDateGregorian = lastDayJalali.locale('en').format('YYYY-MM-DD')

    onMonthChange?.(fromDateGregorian, toDateGregorian)
  }


  return (
    <div className="  bg-boxGray rounded-xl p-4 w-full font-iransans">
      <div className="bg-white rounded-lg p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-3 text-sm font-iransans">
          <button
            onClick={() => changeMonth(-1)}
            aria-label="ماه قبل"
            className="flex items-center cursor-pointer gap-1"
          >
            <img className="w-6 h-6" src={rightArrowIcon} alt="left-arrow" />
            <p>ماه قبل</p>
          </button>

          {/* نام ماه فارسی */}
          <div className="font-bold text-center text-base text-textBlue900">
            {monthNames[currentMonth.jMonth()]} {currentMonth.format('jYYYY')}
          </div>

          <button
            onClick={() => changeMonth(1)}
            aria-label="ماه بعد"
            className="flex items-center cursor-pointer gap-1"
          >
            <p>ماه بعد</p>
            <img className="w-6 h-6" src={leftArrowIcon} alt="right-arrow" />
          </button>
        </div>

        {/* Week days */}
        <div className="grid grid-cols-7 text-center text-xs mb-[18px]">
          {weekDays.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 text-center gap-y-2">
          {/* Empty cells */}
          {Array.from({ length: firstWeekDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Month days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayMoment = startOfMonth.clone().add(i, 'day')

            // تاریخ میلادی برای API
            const gregorianDate = dayMoment.clone().locale('en').format('YYYY-MM-DD')

            const eventData = eventCounts.find(
              (e) => e.eventDate.split('T')[0] === gregorianDate,
            )

            const count = eventData?.totalEventCount || 0
            const isSelected = selectedDate === gregorianDate

            const isToday = moment().isSame(dayMoment, 'day')

            return (
              <div className="flex flex-col items-center justify-center">
                <div
                  key={i}
                  onClick={() => onSelectDate(gregorianDate)}
                  className={`
                    border w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition
                    ${isSelected
                      ? 'bg-blue-500 text-white border-0'
                      : isToday
                        ? 'bg-textBlue100 text-textBlue800 border-0'
                        : 'border-gray-300'
                    }
                  
              `}
                >
                  {/* نمایش شمسی */}
                  <div
                    className={`flex text-xs flex-col items-center justify-center font-bold ${isSelected ? 'text-white' : isSelected && isToday ? 'text-blue-600' : 'text-textGray700'}`}
                  >
                    {dayMoment.format('jD')}
                    {
                      <span
                        className={`text-[8px] ${isSelected ? 'text-white' : isSelected && isToday ? 'text-white ' : 'text-textGray700'} `}
                      >
                        {isToday ? 'امروز' : ''}
                      </span>
                    }
                  </div>
                </div>
                {count > 0 ? (
                  <div className="text-[9px] w-9 h-3 bg-textBlue100 text-textBlue800 rounded-full flex items-center justify-center mt-[2px] font-iransans">
                    {count} رویداد
                  </div>
                ) : (
                  <div className="w-9 h-3"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CustomJalaliCalendar
