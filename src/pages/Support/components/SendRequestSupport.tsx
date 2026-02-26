import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SpinLoading } from 'respinner'

import Button from '@/components/common/Button/Button'
import SelectInput from '@/components/common/Input/SelectInput'
import TextArea from '@/components/common/Input/TextArea'
import {
  useRequestSupportOptions,
  useTicketInsert,
  useTicketReceiverKindList,
} from '@/queries/support'
import { PATHS } from '@/routes/paths'

const SendRequestSupport = () => {
  const navigate = useNavigate()
  const [messageDetail, setMessageDetail] = useState('')
  const [kindId, setKindId] = useState('')
  const [receiverKindId, setReceiverKindId] = useState('')
  const [isSuccessMessage, setIsSuccessMessage] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const requestOptionsQuery = useRequestSupportOptions()
  const receiverKindQuery = useTicketReceiverKindList()
  const insertMutation = useTicketInsert()

  const options = requestOptionsQuery.data ?? []
  const receiverKindOptions = receiverKindQuery.data ?? []
  const isLoadingOptions = requestOptionsQuery.isFetching || receiverKindQuery.isFetching

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
            setKindId('')
            navigate(PATHS.SUPPORT)
          }, 1000)
        },
      },
    )
  }

  return (
    <div className="flex flex-col flex-1 items-end  ">
      <div className="w-full">
        <SelectInput
          keyfilter="receiverKindId"
          errorMessage={errors?.receiverKindIdError}
          keyName="name"
          title="بخش مورد نظر خود را انتخاب کنید"
          options={receiverKindOptions}
          onChange={(v) => setReceiverKindId(String(v ?? ''))}
          className="w-full h-[48px] outline-none border z-40 rounded-[5px] text-base font-medium text-gray-500"
        />
        {!isLoadingOptions ? (
          <SelectInput
            keyfilter="kindId"
            errorMessage={errors?.kindIdError}
            showTitle="title"
            title="نوع مشکل خود را انتخاب کنید"
            options={options}
            onChange={(v) => setKindId(String(v ?? ''))}
            className="w-full h-[48px] outline-none border rounded-[5px] text-base font-medium mt-4 text-gray-500"
          />
        ) : (
          <div className="flex items-center justify-center">
            <SpinLoading
              duration={0.8}
              fill="#185390"
              borderRadius={2}
              count={9}
              barHeight={5}
              barWidth={2}
              size={20}
            />
          </div>
        )}
        <TextArea
          errorMessage={errors?.messageDetailError}
          placeholder="توضیحات"
          value={messageDetail}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessageDetail(e.target.value)
          }
          className="resize-none w-full min-h-[156px] border rounded-[5px] outline-0 px-2 py-3 mt-4 text-gray-500"
        />
      </div>
      <Button
        isLoading={insertMutation.isPending}
        onClick={() => !insertMutation.isPending && sendRequestSupport()}
        className="bg-seeAllBlue hover:bg-seeAllBlue/80 lg:mt-0 mt-3 text-white lg:w-[157px] w-full h-[48px] font-demibold text-base"
      >
        ثبت درخواست
      </Button>

      <p className="text-seeAllBlue font-demibold text-base mt-3 w-full text-center">
        {isSuccessMessage && 'پیام شما با موفقیت ثبت شد ✌️'}
      </p>
    </div>
  )
}

export default SendRequestSupport
