import { responseMapper } from 'utils/responseMapper';

const valuesTemplate = {
  subject: 'theme',
  description: 'description',
  picture: 'imageUrl',
  start_date: 'startDate',
  end_date: 'endDate'
};

const valuesTemplateWithComment = {
  subject: 'theme',
  description: 'description',
  picture: 'imageUrl',
  start_date: 'startDate',
  end_date: 'endDate',
  comment: 'comment'
};

export const mapValues = (values, withComment) => {
  const valuesWithFormattedDates = {
    ...values,
    startDate: new Date(
      `${values.date.toDateString()} ${values.startTime.toTimeString()}`
    ),
    endDate: new Date(
      `${values.date.toDateString()} ${values.endTime.toTimeString()}`
    )
  };

  const mappedValues = responseMapper({
    template: withComment ? valuesTemplateWithComment : valuesTemplate,
    data: valuesWithFormattedDates
  });

  return mappedValues;
};
