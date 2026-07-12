export const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/Account/UserLogin',
    USER_LOGIN_REFRESH: '/Account/UserLoginRefresh',
    USER_INFO: '/Account/UserInfo',
    BOOK_FAIR_SIGNUP: '/Account/MemberLogin',
    BOOK_FAIR_MEMBER_VERIFY: '/Account/MemberVerify',
  },

  BOOK_FAIR: {
    SUBMIT_PROFILE: '/BookFair/SubmitProfile',
    GET_PROFILE_DATA: '/BookFair/GetProfileData',
    CITY_LIST: (stateCode: number | string) =>
      `/BookFair/cityList?stateCode=${stateCode}`,
    GET_QUESTION_LIST: '/BookFair/GetQuestionList',
    SUBMIT_ANSWER: '/BookFair/SubmitAnswer',
    GET_MEMBER_GIFT: '/BookFair/GetMemberGift',
    GET_INVITATION_CODE: '/BookFair/GetInvitationCode',
    GET_STUDENT_GIFT: '/BookFair/GetStudentGift',
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
    GET_INSPECTOR_INFO: (officeCode: number, areaCode: number) =>
      `/Support/GetInspetorInfo?officeCode=${officeCode}&areaCode=${areaCode}`,
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

  DOWNLOAD: {
    CONTENT_APP_ITEM: (type: number | string) => `/Download/ContentAppItem?type=${type}`,
  },

  // App Promotion
  APP_PROMOTION: {
    LIST: '/AppPromotion/AppList',
  },
}

export default API_ENDPOINTS
