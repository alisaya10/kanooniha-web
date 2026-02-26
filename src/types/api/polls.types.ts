export type PollQuestion = {
  pollId: number
  pollDetailsId: number
  questionNumber: number
  question: string
  options: string[]
}

export type PollListItem = {
  uniqueId: string
  title: string
  description: string | null
  isRequired: boolean
  type: number
  polls: PollQuestion[]
}

export type PollSetParams = {
  uniqueId: string
  pollDetailId: string
  selectedOption?: number
  answer?: string | null
  checkedOptions?: number[] | null
}

export type PollSetResponse = number
