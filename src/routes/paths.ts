export const PATHS = {
  // Auth
  LOGIN_NATIONAL_CODE: '/login',
  LOGIN_PASSWORD: '/password',
  LOGIN_RESET_PASSWORD: '/reset-password',

  // Main pages
  Dashboard: '/',
  NEWS: '/news',
  PODCASTS: '/podcasts',
  POLL: '/poll',
  POLLS: '/polls',
  EARLY_REPORT_CARD: '/early-report-card',
  SINGLE_PODCAST: '/single-podcast',
  PROFILE: '/profile',
  RECORDS: '/records',
  MAIN_RECORDS: '/main-records',
  EVENTS: '/events',

  // Support
  SUPPORT: '/support',
  SUPPORT_DETAIL: '/support-detail',

  // Detail pages
  MESSAGES: '/messages',
  MESSAGE_DETAIL: '/message-detail',
  MESSAGE_FILE: '/message-file',
  PODCAST_DETAIL: '/podcast-detail',

  // Misc
  NOT_FOUND: '*',
} as const
