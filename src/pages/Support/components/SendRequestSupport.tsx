import { useState } from 'react'

import Button from '@/components/common/Button/Button'
import SelectInput from '@/components/common/Input/SelectInput'
import TextArea from '@/components/common/Input/TextArea'

const SendRequestSupport = ({
  siteOption,
  receiverKindOptions,
  insertMutation,
  onSubmitSuccess,
}: {
  siteOption: any
  receiverKindOptions: any
  insertMutation: any
  onSubmitSuccess?: () => void
}) => {
  const [messageDetail, setMessageDetail] = useState('')
  const [kindId, setKindId] = useState('')
  const [receiverKindId, setReceiverKindId] = useState('')
  const [isSuccessMessage, setIsSuccessMessage] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const sendRequestSupport = () => {
    const newErrors: Record<string, string> = {}

    if (!receiverKindId) {
      newErrors.receiverKindIdError = 'لطفا بخش مورد نظر خود را انتخاب کنید'
    }
    if (!kindId) {
      newErrors.kindIdError = 'لطفا نوع مشکل خود را انتخاب کنید'
    }
    if (!messageDetail) {
      newErrors.messageDetailError = 'لطفا توضیحات مشکل خود را وارد کنید'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    insertMutation.mutate(
      {
        supportKindId: Number(kindId),
        message: messageDetail,
        receiverKindId: Number(receiverKindId),
      },
      {
        onSuccess: () => {
          setIsSuccessMessage(true)
          setTimeout(() => {
            setMessageDetail('')
            setReceiverKindId('')
            setKindId('')
            setIsSuccessMessage(false)
            onSubmitSuccess?.()
          }, 1000)
        },
      },
    )
  }

  return (
    <>
      {receiverKindOptions.length > 0 && siteOption.length > 0 && (
        <>
          <div className="w-full flex flex-col items-end space-y-4">
            <SelectInput
              keyfilter="receiverKindId"
              errorMessage={errors?.receiverKindIdError}
              keyName="name"
              title="بخش مورد نظر خود را انتخاب کنید"
              options={receiverKindOptions}
              onChange={(v) => setReceiverKindId(String(v ?? ''))}
              className="w-full h-[48px] outline-none border z-40 rounded-[5px] text-base font-medium text-gray-500"
            />
            <SelectInput
              keyfilter="kindId"
              errorMessage={errors?.kindIdError}
              showTitle="title"
              title="نوع مشکل خود را انتخاب کنید"
              options={siteOption}
              onChange={(v) => setKindId(String(v ?? ''))}
              className="w-full h-[48px] outline-none border rounded-[5px] text-base font-medium text-gray-500"
            />
            <TextArea
              errorMessage={errors?.messageDetailError}
              placeholder="توضیحات"
              value={messageDetail}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setMessageDetail(e.target.value)
              }
              className="resize-none w-full min-h-[156px] border rounded-[5px] outline-0 px-2 py-3 text-gray-500"
            />

            <Button
              isLoading={insertMutation.isPending}
              onClick={() => !insertMutation.isPending && sendRequestSupport()}
              className="bg-seeAllBlue hover:bg-seeAllBlue/80 text-white lg:w-[157px] w-full h-[48px] font-demibold text-base"
            >
              ثبت درخواست
            </Button>
          </div>

          <p className="text-seeAllBlue font-demibold text-base mt-3 w-full text-center">
            {isSuccessMessage && 'پیام شما با موفقیت ثبت شد ✌️'}
          </p>
        </>
      )}
    </>
  )
}

export default SendRequestSupport
