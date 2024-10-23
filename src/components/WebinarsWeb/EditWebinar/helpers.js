import { responseMapper } from 'utils/responseMapper';

const webinarsTemplate = {
  image: {
    url: 'picture'
  },
  theme: 'subject',
  date: 'start_date',
  startTime: 'start_date',
  endTime: 'end_date',
  description: 'description',
  comments: [
    'comment',
    {
      date: 'date',
      text: 'comment'
    }
  ]
};

export const mapWebinar = (webinars) => {
  const mappedWebinars = responseMapper({
    template: webinarsTemplate,
    data: webinars
  }).map((webinar) => ({
    ...webinar,
    date: new Date(webinar.date),
    startTime: new Date(webinar.startTime),
    endTime: new Date(webinar.endTime),
    comments: webinar.comments.map((comment) => ({
      ...comment,
      date: new Date(comment.date)
    }))
  }));

  return mappedWebinars[0];
};
