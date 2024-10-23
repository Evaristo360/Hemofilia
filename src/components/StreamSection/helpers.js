import { responseMapper } from 'utils/responseMapper';

const webinarsTemplate = {
  title: 'subject',
  startDate: 'start_date',
  endDate: 'end_date',
  eventId: 'event_id'
};

const getChatUrl = (eventId) => `https://vimeo.com/event/${eventId}/chat`;
const getStreamUrl = (eventId) =>
  `https://vimeo.com/event/${eventId}/embed?autoplay=1;showinfo=0;loop=1;badge=0&amp;autopause=0&amp;player_id=0&amp`;
const getVideoUrl = (eventId) =>
  `https://player.vimeo.com/video/${eventId}?autoplay=1;showinfo=0;loop=1;badge=0&amp;autopause=0&amp;player_id=0&amp`;

export const mapWebinar = (webinars) => {
  const mappedWebinars = responseMapper({
    template: webinarsTemplate,
    data: webinars
  }).map((webinar) => ({
    ...webinar,
    startDate: new Date(webinar.startDate),
    endDate: new Date(webinar.endDate)
  }));

  const webinar = mappedWebinars[0];

  webinar.eventUrl =
    webinar.endDate > new Date()
      ? getStreamUrl(webinar.eventId)
      : getVideoUrl(webinar.eventId);

  if (webinar.endDate > new Date()) {
    webinar.chatUrl = getChatUrl(webinar.eventId);
  }

  return webinar;
};
