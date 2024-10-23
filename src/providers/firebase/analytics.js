import { getAnalytics, logEvent } from 'firebase/analytics';
import { app } from '.';

export const analytics = getAnalytics(app);

export const logAnalyticsEvent = (name, data) =>
  logEvent(analytics, name, data);
