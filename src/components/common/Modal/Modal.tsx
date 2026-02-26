import { forwardRef, ReactNode, useEffect, useImperativeHandle, useState } from 'react'

interface ModalProps {
  children: ReactNode
  required?: boolean
}

const Modal = forwardRef(({ children, required = false }: ModalProps, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    open: () => setIsVisible(true),
    close: () => {
      if (!required) {
        setIsVisible(false)
      } else {
        console.warn('Modal is required and cannot be closed.')
      }
    },
    forceClose: () => setIsVisible(false),
  }))

  const hideModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      if (!required) {
        setIsVisible(false)
      } else {
        console.warn('Cannot close required modal by clicking outside.')
      }
    }
  }

  // جلوگیری از بسته شدن با بک‌زدن مرورگر
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isVisible && required) {
        e.preventDefault()
        e.returnValue = '' // برای بعضی مرورگرها لازمه
        return ''
      }
    }

    const handlePopState = () => {
      if (isVisible && required) {
        window.history.pushState({}, '', window.location.pathname)
      }
    }

    if (isVisible && required) {
      window.addEventListener('beforeunload', handleBeforeUnload)
      window.addEventListener('popstate', handlePopState)
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [isVisible, required])

  return (
    isVisible && (
      <div
        className="fixed z-50 top-0 inset-0 flex items-center justify-center bg-black/70"
        onClick={hideModal}
      >
        {children}
      </div>
    )
  )
})

export default Modal
