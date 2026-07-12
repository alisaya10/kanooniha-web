// import { useEffect, useMemo, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Cookies from 'js-cookie'
// import { toast } from 'react-toastify'

// import BookFair from '@/assets/images/book-fair-image.png'
// import kanoonLogo from '@/assets/images/kanoon-logo-image.png'
// import Button from '@/components/common/Button/Button'
// import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
// import Input from '@/components/common/Input/Input'
// import SelectInput from '@/components/common/Input/SelectInput'
// import { useBookFairCityList } from '@/queries/auth/useBookFairCityList'
// import { useBookFairProfileData } from '@/queries/auth/useBookFairProfileData'
// import { useBookFairSubmitProfile } from '@/queries/auth/useBookFairSubmitProfile'
// import { PATHS } from '@/routes/paths'
// import type { BookFairProfileSelectItem } from '@/types/api/auth.types'
// import BookFairImageAnimation from './components/BookFairImageAnimation'

// const GENDER_FALLBACK = [
//   { title: 'مرد', id: 0 },
//   { title: 'زن', id: 1 },
// ]

// function mapProfileSelectItems(items: BookFairProfileSelectItem[] | undefined) {
//   if (!items?.length) return []
//   return items.map((item) => ({
//     title: item.text,
//     id: Number(item.value),
//   }))
// }

// const BookFairLoginInfo = () => {
//   const navigate = useNavigate()
//   const { data, isPending, isError, refetch } = useBookFairProfileData()
//   const submitProfileMutation = useBookFairSubmitProfile()

//   const [name, setName] = useState('')
//   const [family, setFamily] = useState('')
//   const [groupCode, setGroupCode] = useState<number | null>(null)
//   const [genderCode, setGenderCode] = useState<number | null>(null)
//   const [stateCode, setStateCode] = useState<number | null>(null)
//   const [cityCode, setCityCode] = useState<number | null>(null)
//   const [invitationCode, setInvitatonCode] = useState('')

//   const { data: cityListFromApi } = useBookFairCityList(stateCode)

//   const groupOptions = useMemo(() => mapProfileSelectItems(data?.groupList), [data])
//   const stateOptions = useMemo(() => mapProfileSelectItems(data?.stateList), [data])
//   const cityOptions = useMemo(
//     () => mapProfileSelectItems(cityListFromApi),
//     [cityListFromApi],
//   )
//   const genderOptions = useMemo(() => {
//     if (data?.genderList?.length) return mapProfileSelectItems(data.genderList)
//     return GENDER_FALLBACK
//   }, [data])

//   useEffect(() => {
//     if (!cityListFromApi?.length || cityCode == null) return
//     const ok = cityListFromApi.some((row) => Number(row.value) === cityCode)
//     if (!ok) setCityCode(null)
//   }, [cityListFromApi, cityCode])

//   useEffect(() => {
//     if (!data) return
//     const selected = (list?: BookFairProfileSelectItem[]) => list?.find((x) => x.selected)
//     const g = selected(data.groupList)
//     if (g) setGroupCode(Number(g.value))
//     const s = selected(data.stateList)
//     if (s) setStateCode(Number(s.value))
//     const c = selected(data.cityList)
//     if (c) setCityCode(Number(c.value))
//     const gen = selected(data.genderList)
//     if (gen) setGenderCode(Number(gen.value))
//   }, [data])

//   const texts = [
//     {
//       line1: 'نمایشگاه مجازی بین‌المللی',
//       line2: 'کتاب تهران',
//     },
//     {
//       line1: 'کانون فرهنگی آموزش',
//       line2: 'قلم چی',
//     },
//   ]

//   const handleSubmit = () => {
//     if (!name.trim() || !family.trim()) {
//       toast.error('نام و نام خانوادگی را وارد کنید', { containerId: 'bookfair' })
//       return
//     }
//     if (groupCode === null) {
//       toast.error('گروه درسی را انتخاب کنید', { containerId: 'bookfair' })
//       return
//     }
//     if (stateCode === null || cityCode === null) {
//       toast.error('استان و شهر را انتخاب کنید', { containerId: 'bookfair' })
//       return
//     }

//     submitProfileMutation.mutate(
//       {
//         firstName: name.trim(),
//         lastName: family.trim(),
//         gender: genderCode,
//         stateCode,
//         cityCode,
//         groupCode,
//         inviteCode: invitationCode.trim().length == 0 ? null : invitationCode.trim(),
//       },
//       {
//         onError: (error) => {
//           toast.error(error?.message ?? 'خطا در ارتباط با سرور', {
//             containerId: 'bookfair',
//           })
//         },
//         onSuccess: (data) => {
//           if (data?.message) {
//             toast.success(data.message, { containerId: 'bookfair' })
//           }
//           if (data?.success) {
//             if (data.tokenJwt) {
//               Cookies.set('bookFairToken', data.tokenJwt, { expires: 360, secure: true })
//               Cookies.set('logout', 'false')
//             }
//             navigate(PATHS.SIGNUP_BOOK_FAIR_SLIDER)
//           }
//         },
//       },
//     )
//   }

//   const formReady = !isPending && !isError && data

//   return (
//     <div className="w-full flex relative">
//       <BookFairImageAnimation texts={texts} imageSrc={BookFair} />
//       <div className="flex flex-col flex-1 h-dvh justify-center items-center">
//         <img
//           className="w-[182px] h-[182px] border-[3px] border-[#FFDE1E] rounded-full mb-[-91px]"
//           src={kanoonLogo}
//         />

//         {(isPending && !data) || isError ? (
//           <div className="flex flex-col flex-1 w-full items-center justify-center min-h-[320px]">
//             <LoaderTryAgainButton
//               hasPosition={false}
//               isLoading={isPending && !isError}
//               error={isError}
//               onClick={() => refetch()}
//             />
//           </div>
//         ) : null}

//         {formReady ? (
//           <div className="w-[343px] space-y-2.5 flex flex-col lg:justify-normal justify-between mt-[153px] lg:mb-0 mb-8">
//             <Input
//               errorMessage={''}
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full h-12 px-2 border rounded-md border-gray-500 outline-0 font-medium text-base"
//               placeholder="نام خود را وارد کنید"
//             />
//             <Input
//               errorMessage={''}
//               value={family}
//               onChange={(e) => setFamily(e.target.value)}
//               className="w-full h-12 px-2 border rounded-md border-gray-500 outline-0 font-medium text-base"
//               placeholder="نام خانوادگی خود را وارد کنید"
//             />
//             <SelectInput
//               key={`bf-grp-${groupCode ?? 'n'}-${groupOptions.length}`}
//               title={
//                 groupCode != null
//                   ? (groupOptions.find((o) => o.id === groupCode)?.title ?? 'گروه درسی')
//                   : 'گروه درسی'
//               }
//               errorMessage={''}
//               options={groupOptions}
//               onChange={(value: unknown) => {
//                 const n = typeof value === 'number' ? value : Number(value)
//                 setGroupCode(Number.isFinite(n) ? n : null)
//               }}
//               className="w-full h-[48px] outline-none border z-50 rounded-[5px] text-base font-medium text-gray-500"
//             />
//             <SelectInput
//               key={`bf-gen-${genderCode ?? 'n'}-${genderOptions.length}`}
//               title={
//                 genderCode != null
//                   ? (genderOptions.find((o) => o.id === genderCode)?.title ?? 'جنسیت')
//                   : 'جنسیت'
//               }
//               errorMessage={''}
//               options={genderOptions}
//               onChange={(value: unknown) => {
//                 const n = typeof value === 'number' ? value : Number(value)
//                 setGenderCode(Number.isFinite(n) ? n : null)
//               }}
//               className="w-full h-[48px] outline-none border z-40 rounded-[5px] text-base font-medium text-gray-500"
//             />
//             <SelectInput
//               key={`bf-st-${stateCode ?? 'n'}-${stateOptions.length}`}
//               title={
//                 stateCode != null
//                   ? (stateOptions.find((o) => o.id === stateCode)?.title ??
//                     'استان محل سکونت خود را وارد کنید')
//                   : 'استان محل سکونت خود را وارد کنید'
//               }
//               errorMessage={''}
//               options={stateOptions}
//               onChange={(value: unknown) => {
//                 const n = typeof value === 'number' ? value : Number(value)
//                 const next = Number.isFinite(n) ? n : null
//                 setStateCode((prev) => {
//                   if (prev !== next) setCityCode(null)
//                   return next
//                 })
//               }}
//               className="w-full h-[48px] outline-none border z-30 rounded-[5px] text-base font-medium text-gray-500"
//             />
//             <SelectInput
//               key={`bf-ct-${stateCode ?? 'n'}-${cityCode ?? 'n'}-${cityOptions.length}`}
//               title={
//                 cityCode != null
//                   ? (cityOptions.find((o) => o.id === cityCode)?.title ??
//                     'شهر محل سکونت خود را وارد کنید')
//                   : 'شهر محل سکونت خود را وارد کنید'
//               }
//               errorMessage={''}
//               options={cityOptions}
//               onChange={(value: unknown) => {
//                 const n = typeof value === 'number' ? value : Number(value)
//                 setCityCode(Number.isFinite(n) ? n : null)
//               }}
//               className="w-full h-[48px] outline-none border z-20 rounded-[5px] text-base font-medium text-gray-500"
//             />
//             <Input
//               errorMessage={''}
//               value={invitationCode}
//               onChange={(e) => setInvitatonCode(e.target.value)}
//               className="w-full h-12 px-2 border rounded-md border-gray-500 outline-0 font-medium text-base"
//               placeholder="کد دعوت (اختیاری)"
//             />
//             <Button
//               onClick={handleSubmit}
//               isLoading={submitProfileMutation.isPending}
//               hoverEffect={false}
//               className="w-full h-12 bg-[#FFDE1E] border-0 rounded-lg"
//             >
//               <p className="text-black font-demibold text-base ">تایید و ادامه</p>
//             </Button>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   )
// }

// export default BookFairLoginInfo

import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

import BookFair from '@/assets/images/book-fair-image.png'
import kanoonLogo from '@/assets/images/kanoon-logo-image.png'
import Button from '@/components/common/Button/Button'
import LoaderTryAgainButton from '@/components/common/Button/LoaderTryAgainButton'
import Input from '@/components/common/Input/Input'
import SelectInput from '@/components/common/Input/SelectInput'
import { useBookFairCityList } from '@/queries/auth/useBookFairCityList'
import { useBookFairProfileData } from '@/queries/auth/useBookFairProfileData'
import { useBookFairSubmitProfile } from '@/queries/auth/useBookFairSubmitProfile'
import { PATHS } from '@/routes/paths'
import type { BookFairProfileSelectItem } from '@/types/api/auth.types'
import BookFairImageAnimation from './components/BookFairImageAnimation'

const GENDER_FALLBACK = [
  { title: 'پسر', id: 0 },
  { title: 'دختر', id: 1 },
]

function mapProfileSelectItems(items: BookFairProfileSelectItem[] | undefined) {
  if (!items?.length) return []
  return items.map((item) => ({
    title: item.text,
    id: Number(item.value),
  }))
}

const BookFairLoginInfo = () => {
  const navigate = useNavigate()
  const { data, isPending, isError, refetch } = useBookFairProfileData()
  const submitProfileMutation = useBookFairSubmitProfile()

  const [name, setName] = useState('')
  const [family, setFamily] = useState('')
  const [groupCode, setGroupCode] = useState<number | null>(null)
  const [genderCode, setGenderCode] = useState<number | null>(null)
  const [stateCode, setStateCode] = useState<number | null>(null)
  const [cityCode, setCityCode] = useState<number | null>(null)
  const [invitationCode, setInvitatonCode] = useState('')

  const { data: cityListFromApi } = useBookFairCityList(stateCode)

  const groupOptions = useMemo(() => mapProfileSelectItems(data?.groupList), [data])
  const stateOptions = useMemo(() => mapProfileSelectItems(data?.stateList), [data])
  const cityOptions = useMemo(
    () => mapProfileSelectItems(cityListFromApi),
    [cityListFromApi],
  )

  const genderOptions = useMemo(() => {
    if (data?.genderList?.length) return mapProfileSelectItems(data.genderList)
    return GENDER_FALLBACK
  }, [data])

  useEffect(() => {
    if (!cityListFromApi?.length || cityCode == null) return
    const ok = cityListFromApi.some((row) => Number(row.value) === cityCode)
    if (!ok) setCityCode(null)
  }, [cityListFromApi, cityCode])

  useEffect(() => {
    if (!data) return
    const selected = (list?: BookFairProfileSelectItem[]) => list?.find((x) => x.selected)

    const g = selected(data.groupList)
    if (g) setGroupCode(Number(g.value))

    const s = selected(data.stateList)
    if (s) setStateCode(Number(s.value))

    const c = selected(data.cityList)
    if (c) setCityCode(Number(c.value))

    const gen = selected(data.genderList)
    if (gen) setGenderCode(Number(gen.value))
  }, [data])

  const texts = [
    {
      line1: 'دانش آموزان',
      line2: 'غیر کانونی',
    },
    {
      line1: 'کانون فرهنگی آموزش',
      line2: 'قلم چی',
    },
  ]

  const handleSubmit = () => {
    if (!name.trim() || !family.trim()) {
      toast.error('نام و نام خانوادگی را وارد کنید', { containerId: 'bookfair' })
      return
    }

    if (groupCode === null) {
      toast.error('گروه درسی را انتخاب کنید', { containerId: 'bookfair' })
      return
    }

    if (genderCode === null) {
      toast.error('جنسیت را انتخاب کنید', { containerId: 'bookfair' })
      return
    }

    if (stateCode === null || cityCode === null) {
      toast.error('استان و شهر را انتخاب کنید', { containerId: 'bookfair' })
      return
    }

    submitProfileMutation.mutate(
      {
        firstName: name.trim(),
        lastName: family.trim(),
        gender: genderCode,
        stateCode,
        cityCode,
        groupCode,
        inviteCode: invitationCode.trim().length === 0 ? null : invitationCode.trim(),
      },
      {
        onError: (error) => {
          toast.error(error?.message ?? 'خطا در ارتباط با سرور', {
            containerId: 'bookfair',
          })
        },
        onSuccess: (data) => {
          if (data?.message) {
            toast.success(data.message, { containerId: 'bookfair' })
          }

          if (data?.success) {
            if (data.tokenJwt) {
              Cookies.set('bookFairToken', data.tokenJwt, { expires: 360, secure: true })
              Cookies.set('logout', 'false')
            }

            navigate(PATHS.SIGNUP_BOOK_FAIR_SLIDER)
          }
        },
      },
    )
  }

  const formReady = !isPending && !isError && data

  return (
    <div className="w-full flex relative">
      <BookFairImageAnimation texts={texts} imageSrc={BookFair} />

      <div className="flex flex-col flex-1 h-dvh justify-center items-center">
        <img
          className="w-[182px] h-[182px] border-[3px] border-[#FFDE1E] rounded-full mb-[-91px]"
          src={kanoonLogo}
        />

        {(isPending && !data) || isError ? (
          <div className="flex flex-col flex-1 w-full items-center justify-center min-h-[320px]">
            <LoaderTryAgainButton
              hasPosition={false}
              isLoading={isPending && !isError}
              error={isError}
              onClick={() => refetch()}
            />
          </div>
        ) : null}

        {formReady ? (
          <div className="w-[343px] space-y-2.5 flex flex-col lg:justify-normal justify-between mt-[153px] lg:mb-0 mb-8">
            <Input
              errorMessage={''}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-2 border rounded-md border-gray-500 outline-0 font-medium text-base"
              placeholder="نام خود را وارد کنید"
            />

            <Input
              errorMessage={''}
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              className="w-full h-12 px-2 border rounded-md border-gray-500 outline-0 font-medium text-base"
              placeholder="نام خانوادگی خود را وارد کنید"
            />

            <SelectInput
              key={`bf-grp-${groupCode ?? 'n'}-${groupOptions.length}`}
              title={
                groupCode != null
                  ? (groupOptions.find((o) => o.id === groupCode)?.title ?? 'گروه درسی')
                  : 'گروه درسی'
              }
              errorMessage={''}
              options={groupOptions}
              onChange={(value: unknown) => {
                const n = typeof value === 'number' ? value : Number(value)
                setGroupCode(Number.isFinite(n) ? n : null)
              }}
              className="w-full h-[48px] outline-none border z-50 rounded-[5px] text-base font-medium text-gray-500"
            />

            <SelectInput
              key={`bf-gen-${genderCode ?? 'n'}-${genderOptions.length}`}
              title={
                genderCode != null
                  ? (genderOptions.find((o) => o.id === genderCode)?.title ?? 'جنسیت')
                  : 'جنسیت'
              }
              errorMessage={''}
              options={genderOptions}
              onChange={(value: unknown) => {
                const n = typeof value === 'number' ? value : Number(value)
                setGenderCode(Number.isFinite(n) ? n : null)
              }}
              className="w-full h-[48px] outline-none border z-40 rounded-[5px] text-base font-medium text-gray-500"
            />

            <SelectInput
              key={`bf-st-${stateCode ?? 'n'}-${stateOptions.length}`}
              title={
                stateCode != null
                  ? (stateOptions.find((o) => o.id === stateCode)?.title ??
                    'استان محل سکونت خود را وارد کنید')
                  : 'استان محل سکونت خود را وارد کنید'
              }
              errorMessage={''}
              options={stateOptions}
              onChange={(value: unknown) => {
                const n = typeof value === 'number' ? value : Number(value)
                const next = Number.isFinite(n) ? n : null
                setStateCode((prev) => {
                  if (prev !== next) setCityCode(null)
                  return next
                })
              }}
              className="w-full h-[48px] outline-none border z-30 rounded-[5px] text-base font-medium text-gray-500"
            />

            <SelectInput
              key={`bf-ct-${stateCode ?? 'n'}-${cityCode ?? 'n'}-${cityOptions.length}`}
              title={
                cityCode != null
                  ? (cityOptions.find((o) => o.id === cityCode)?.title ??
                    'شهر محل سکونت خود را وارد کنید')
                  : 'شهر محل سکونت خود را وارد کنید'
              }
              errorMessage={''}
              options={cityOptions}
              onChange={(value: unknown) => {
                const n = typeof value === 'number' ? value : Number(value)
                setCityCode(Number.isFinite(n) ? n : null)
              }}
              className="w-full h-[48px] outline-none border z-20 rounded-[5px] text-base font-medium text-gray-500"
            />

            <Input
              errorMessage={''}
              value={invitationCode}
              onChange={(e) => setInvitatonCode(e.target.value)}
              className="w-full h-12 px-2 border rounded-md border-gray-500 outline-0 font-medium text-base"
              placeholder="کد دعوت (اختیاری)"
            />

            <Button
              onClick={handleSubmit}
              isLoading={submitProfileMutation.isPending}
              hoverEffect={false}
              className="w-full h-12 bg-[#FFDE1E] border-0 rounded-lg"
            >
              <p className="text-black font-demibold text-base">تایید و ادامه</p>
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default BookFairLoginInfo
