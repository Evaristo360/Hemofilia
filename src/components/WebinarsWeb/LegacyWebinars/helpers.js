import { responseMapper } from 'utils/responseMapper';

const webinarsTemplate = {
  id: '_id',
  publicId: 'public_id',
  theme: 'subject',
  imageUrl: 'picture',
  startDate: 'start_date',
  endDate: 'end_date',
  doctor: {
    name: 'doctor_name',
    avatarUrl: 'doctor_avatar',
    speciality: 'doctor_speciality'
  }
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
