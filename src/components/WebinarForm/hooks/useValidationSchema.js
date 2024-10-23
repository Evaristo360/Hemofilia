/* eslint-disable prettier/prettier */
import * as Yup from 'yup';
import { useIntl } from 'react-intl';
import { messages } from '../WebinarFormMessages';

export const useValidationSchema = ({ withComment, formikRef }) => {
  const intl = useIntl();

  const requiredErrorMessage = intl.formatMessage(messages.requiredError);
  const laterThanStartDateErrorMessage = intl.formatMessage(
    messages.laterThanStartDateError
  );
  const laterThanTomorrowErrorMessage = intl.formatMessage(
    messages.laterThanTomorrowError
  );

  return Yup.object({
    image: Yup.object()
      .shape({ url: Yup.string() })
      .nullable()
      .required(requiredErrorMessage),
    theme: Yup.string().required(requiredErrorMessage),
    date: Yup.date()
      .min(
        new Date(
          new Date().setTime(new Date().getTime() + 25 * 60 * 60 * 1000)
        ),
        laterThanTomorrowErrorMessage
      )
      .nullable()
      .required(requiredErrorMessage),
    startTime: Yup.date().nullable().required(requiredErrorMessage),
    endTime: Yup.date()
      .nullable()
      .required(requiredErrorMessage)
      .test({
        message: laterThanStartDateErrorMessage,
        test: (value) =>
          formikRef.current?.values.startTime
            ? value > formikRef.current.values.startTime
            : true
      }),
    description: Yup.string().required(requiredErrorMessage),
    ...(withComment
      ? { comment: Yup.string().required(requiredErrorMessage) }
      : {})
  });
};
