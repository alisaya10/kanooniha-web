export type PodcastCategory = {
  id: number
  title: string
}

export type PodcastItem = {
  fileName?: string
  description?: string
  [key: string]: unknown
}
