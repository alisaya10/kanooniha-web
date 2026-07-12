export type UserInfo = {
  userGuid: string
  fullName: string
  groupCode: number
  groupName: string
  avatar: string
  currentYear: string
  userIdCall: string | null
  userOfficeIdCall: string | null
  userTokenFireBase: string | null
  isTokenFirebaseExist: boolean
}

export type LoginParams = {
  userName: string
  password?: string
  counter?: string
  activeCode?: string
}

export type LoginResponse = {
  success: boolean
  message: string | null
  mobile: boolean
  loginBy: string
  mobileToken: string
  tokenJwt: string | null
  tokenRefresh: string | null
}

export type TokenDto = {
  token: string
  refreshToken: string
}

export type BookFairSignupParams = {
  mobile: string
}

export type BookFairSignupResponse = {
  success: boolean
  message: string | null
  tokenJwt: string
  tokenRefresh: string | null
  state: number
  status: number
}

export type MemberVerifyParams = {
  mobile: string
  activeCode: string
}

export type MemberVerifyResponse = {
  success: boolean
  message: string | null
  data: string | null
  status: number
}

export type BookFairSubmitProfileParams = {
  firstName: string
  lastName: string
  stateCode: number
  gender: number | null
  cityCode: number
  groupCode: number
  inviteCode: string | null
}

export type BookFairSubmitProfileResponse = {
  success: boolean
  message: string | null
  tokenJwt: string | null
  tokenRefresh: string | null
}

export type BookFairProfileSelectItem = {
  text: string
  value: string
  selected: boolean
}

export type BookFairProfileFormData = {
  groupList: BookFairProfileSelectItem[]
  stateList: BookFairProfileSelectItem[]
  cityList?: BookFairProfileSelectItem[]
  genderList?: BookFairProfileSelectItem[]
}

export type BookFairProfileDataResponse = {
  data: BookFairProfileFormData
  message: string | null
  success: boolean
  status: number
}
