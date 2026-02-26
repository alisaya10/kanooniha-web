interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  placeholder?: string
  errorMessage?: string
}

const TextArea = ({
  value,
  onChange,
  className = '',
  placeholder = '',
  errorMessage = '',
  ...rest
}: TextAreaProps) => {
  return (
    <div>
      <textarea
        value={value}
        onChange={onChange}
        className={`${className} ${errorMessage ? 'border-redText' : 'border-textGray500'}`}
        placeholder={placeholder}
        {...rest}
      />
      {errorMessage && <p className="text-redText mt-2 text-sm">{errorMessage}</p>}
    </div>
  )
}

export default TextArea
