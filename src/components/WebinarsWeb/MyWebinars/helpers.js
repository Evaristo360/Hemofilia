import { responseMapper } from 'utils/responseMapper';

const webinarsTemplate = {
  id: '_id',
  publicId: 'public_id',
  theme: 'subject',
  status: 'status',
  startDate: 'start_date',
  endDate: 'end_date'
};

export const mapWebinars = (webinars) => {
  const mappedWebinars = responseMapper({
    template: webinarsTemplate,
    data: webinars
  }).map((webinar) => ({
    ...webinar,
    startDate: new Date(webinar.startDate),
    endDate: new Date(webinar.endDate)
  }));

  return mappedWebinars;
};
