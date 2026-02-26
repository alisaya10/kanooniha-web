const CircularProgress = ({ value, max = 100 }) => {
  const radius = 47
  const strokeWidth = 5
  const circumference = 2 * Math.PI * radius
  const progress = (value / max) * circumference

  return (
    <div className="relative w-[104px] h-[104px]">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#BCEBFF"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#1E94F6"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 m-auto w-[84px] h-[84px] flex items-center justify-center rounded-full bg-progress-gradient">
        <span className="text-textBlue800 text-2xl font-bold">{value}</span>
      </div>
    </div>
  )
}

export default CircularProgress
