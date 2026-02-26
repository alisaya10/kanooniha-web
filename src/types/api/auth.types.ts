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
