export type Question = {
  id: number
  title: string
  answer1: string
  answer2: string
}

export type GetQuestionListResponse = Question[]

export type SubmitAnswerParams = {
  QuestionId: number
  Answer: number
}

export type SubmitAnswerResponse = {
  success: boolean
  message: string | null
  status: number
}

export type GetMemberGiftResponse = {
  title: string
  description: string
  code: string
  link: string
}

export type GetInvitationGiftResponse = string

export type GetStudentGiftResponse = {
  title: string
  description: string | null
  code: string
  link: string
}
