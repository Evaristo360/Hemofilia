export const config = {
  appId: (process.env.REACT_APP_NAME || '').replace(/@octopy\/react-spa-/, ''),
  siteConfig: {
    languageCode: (process.env.REACT_APP_LANGUAGE_CODE || '').toLowerCase(),
    defaultTheme: process.env.REACT_APP_DEFAULT_THEME,
    allowBrowserTheme:
      process.env.REACT_APP_THEME_ENABLE_BROWSER_SUPPORT === 'true'
  },
  endpoints: {
    mainBackendUrl: process.env.REACT_APP_MAIN_BACKEND_URL
  },
  videoPlayer: {
    vimeoAppId: process.env.REACT_APP_VIMEO_APP_ID
  },
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  }
};
