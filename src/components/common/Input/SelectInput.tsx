import { useState } from 'react'

import arrowDownIcon from '@/assets/icons/arrow-down-icon.png'

type SelectOption = Record<string, unknown>

const CustomDropdown = ({
  className = '',
  options = [] as SelectOption[],
  errorMessage = '',
  onChange,
  title = '',
  keyName = 'title',
  keyfilter = 'id',
}: {
  className?: string
  options?: SelectOption[]
  errorMessage?: string
  onChange: (value: unknown) => void
  title?: string
  keyName?: string
  keyfilter?: string
  showTitle?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(title)

  return (
    <>
      <div
        className={`${className}  ${errorMessage != '' ? 'border-redText' : 'border-textGray500'} relative`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-full w-full flex items-center justify-between px-2"
        >
          <span>{selectedOption}</span>
          <img
            src={arrowDownIcon}
            className={`w-5 h-6 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            alt=""
          />
        </button>

        {isOpen && (
          <ul className="absolute w-full left-0 top-14 border border-gray-700  bg-white rounded-md shadow-lg">
            {Array.isArray(options) &&
              options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(option[keyName])
                    setIsOpen(false)
                    // console.log(keyfilter)

                    onChange(option[keyfilter])
                  }}
                  className="px-4 py-2  hover:bg-gray-200 cursor-pointer"
                >
                  {option[keyName]}
                </li>
              ))}
          </ul>
        )}
      </div>
      <p className="text-redText mt-2 text-sm">{errorMessage}</p>
    </>
  )
}

export default CustomDropdown
