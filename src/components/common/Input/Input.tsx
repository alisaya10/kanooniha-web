interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  placeholder?: string
  errorMessage?: string
  label?: string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel'
}

const Input = ({
  value,
  onChange,
  className = '',
  placeholder = '',
  errorMessage = '',
  label,
  type = 'text',
  ...rest
}: InputProps) => {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`${className}, ${errorMessage != '' ? 'border-redText' : 'border-textGray500'}`}
        placeholder={placeholder}
        {...rest}
      />
      <p className="text-redText mt-2 text-sm">{errorMessage}</p>
    </div>
  )
}

export default Input
