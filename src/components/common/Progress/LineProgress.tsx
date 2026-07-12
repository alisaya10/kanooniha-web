function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className="bg-yellow-300 h-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export default ProgressBar
