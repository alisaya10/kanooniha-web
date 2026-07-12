import { useEffect, useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'

const MyChart = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    document.fonts.ready.then(() => {
      setReady(true)
    })
  }, [])

  // دیتای نمونه روزانه
  const visits = useMemo(() => [5, 8, 3, 12, 10, 7], [])

  const data = useMemo(
    () => ({
      // labels: days,
      labels: [
        '۱۴۰۴/۰۱/۰۳',
        '۱۴۰۴/۰۳/۰۲',
        '۱۴۰۴/۰۵/۰۱',
        '۱۴۰۴/۰۶/۰۱',
        '۱۴۰۴/۰۷/۰۱',
        '۱۴۰۴/۰۸/۰۱',
      ],
      datasets: [
        {
          label: 'پاسخ های صحیح',
          data: visits,
          backgroundColor: 'rgba(255, 216, 0, 0.5)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    }),
    [],
  )

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          labels: {
            font: {
              family: 'IRANSansXFaNum',
              size: 14,
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255,255,255,0.15)',
          },
          ticks: {
            font: {
              family: 'IRANSansXFaNum',
              size: 12,
            },
          },
        },
        y: {
          grid: {
            color: 'rgba(255,255,255,0.15)',
          },
          ticks: {
            font: {
              family: 'IRANSansXFaNum',
              size: 12,
            },
          },
        },
      },
    }),
    [],
  )

  if (!ready) return null

  return <Bar key="daily-chart" data={data} options={options} />
}

export default MyChart
