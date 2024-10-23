import { responseMapper } from 'utils/responseMapper';

export const valuesTemplate = {
  subject: 'theme',
  description: 'description',
  picture: 'imageUrl',
  start_date: 'startDate',
  end_date: 'endDate',
  event_id: 'eventId',
  comment: 'comment'
};

export const mapValues = (values) => {
  const mappedValues = responseMapper({
    template: valuesTemplate,
    data: values
  });

  return mappedValues;
};
