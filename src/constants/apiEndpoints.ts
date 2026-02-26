export const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/Account/UserLogin',
    USER_INFO: '/Account/UserInfo',
  },

  // News
  NEWS: {
    LIST: '/App/ArticleNew',
  },

  // Messages
  MESSAGES: {
    LIST: '/Messages/MessagesList',
    VISIT: (messageId: string | number) =>
      `/Messages/MessagesVisit?messageId=${messageId}`,
  },

  // Records
  RECORDS: {
    KINDS: '/WorkBook/WorkBookKinds',
    DOWNLOAD: '/WorkBook/WorkBook',
    PAST_RECORDS: '/WorkBook/DateValueWorkBookList',
    LAST_EXAM: '/WorkBook/DateValueLast',
    NEXT_EXAM: '/WorkBook/DateValueNext',
  },

  // Tickets
  SUPPORT: {
    REQUEST_LIST: '/Ticket/TicketRequestList',
    REQUEST_OPTIONS: '/Support/TicketRequestKinds',
    SEND_REQUEST: '/Support/TicketRequestInsert',
    TICKET_APP_LIST: '/Support/TicketAppList',
    TICKET_MESSAGE_LIST: (ticketId: string | number) =>
      `/Support/TicketMessageList?ticketId=${ticketId}`,
    TICKET_RECEIVER_KIND_LIST: '/Support/TicketReceiverKindList',
    TICKET_INSERT: '/Support/TicketInsert',
    TICKET_MESSAGE_INSERT: '/Support/TicketMessageAppInsert',
  },

  // Polls
  POLLS: {
    LIST: '/Poll/PollList',
    VOTE: '/Poll/PollSet',
  },

  // Podcasts
  PODCASTS: {
    CATEGORY_LIST: '/Podcast/PodcastCategoryList',
    ITEM_LIST: '/Podcast/PodcastItemList',
    VISIT_COUNT: (podcastId: string | number) =>
      `/Podcast/PodcastVisitCount?podcastId=${podcastId}`,
  },

  // Events
  EVENTS: {
    CALENDAR_LIST: (fromDate: string, toDate: string) =>
      `/Event/CalendarEventList?FromDate=${fromDate}&ToDate=${toDate}`,
    DAILY_LIST: (date: string) => `/Event/DailyEventList?date=${date}`,
    SKY_ROOM: (roomId: string, apiType: string) =>
      `/Event/EventSkyRoom?roomId=${roomId}&apiType=${apiType}`,
    ACTIVE_COUNT: '/Event/ActiveEventCount',
  },

  // App
  APP: {
    VERSION_CHECK: '/App/VersionCheck',
  },
}

export default API_ENDPOINTS
