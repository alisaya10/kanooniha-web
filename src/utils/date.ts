import moment from 'jalali-moment'

/**
 * تبدیل تاریخ میلادی (مثل ISO) به شمسی فارسی با jalali-moment.
 * ورودی: "2026-02-14T00:11:06.613" (میلادی)
 * خروجی: "۱۴۰۴/۱۱/۲۵" (شمسی با اعداد فارسی، بدون فاصله)
 */
const JALALI_FORMAT = 'jYYYY/jMM/jDD'

export function toJalaliFarsi(value: string | undefined | null): string {
  if (value == null || String(value).trim() === '') return ''
  const m = moment.from(value.trim(), 'en', 'YYYY-MM-DDTHH:mm:ss.SSS')
  if (!m.isValid()) {
    const m2 = moment.from(value.trim(), 'en', 'YYYY-MM-DDTHH:mm:ss')
    if (!m2.isValid()) {
      const m3 = moment.from(value.trim(), 'en', 'YYYY-MM-DD')
      if (!m3.isValid()) return String(value)
      return m3.locale('fa').format(JALALI_FORMAT)
    }
    return m2.locale('fa').format(JALALI_FORMAT)
  }
  return m.locale('fa').format(JALALI_FORMAT)
}

const JALALI_TEXT_FORMAT = 'jD jMMMM jYYYY'

export function toJalaliTextFarsi(value: string | undefined | null): string {
  if (!value || String(value).trim() === '') return ''

  const date = value.trim()

  const formats = ['YYYY-MM-DDTHH:mm:ss.SSS', 'YYYY-MM-DDTHH:mm:ss', 'YYYY-MM-DD']

  for (const format of formats) {
    const m = moment.from(date, 'en', format)
    if (m.isValid()) {
      return m.locale('fa').format(JALALI_TEXT_FORMAT)
    }
  }

  return String(value)
}
