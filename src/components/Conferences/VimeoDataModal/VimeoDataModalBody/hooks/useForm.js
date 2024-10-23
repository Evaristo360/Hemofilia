import * as Yup from 'yup';
import { useIntl } from 'react-intl';
import { messages } from '../VimeoDataModalBodyMessages';
import { mapValues } from '../helpers';
import { useApi } from 'hooks';
import { useModal } from '@octopy/react-modal';

export const useForm = ({ webinar, setWebinars }) => {
  const { handleCloseModal } = useModal();
  const intl = useIntl();
  const [editWebinar] = useApi({
    endpoint: 'webinar/dashboard/update',
    method: 'put'
  });

  const initialValues = {
    eventId: webinar.eventId ?? '',
    comment: ''
  };

  const fields = [
    {
      type: 'text',
      name: 'eventId',
      label: intl.formatMessage(messages.eventIdLabel),
      placeholder: intl.formatMessage(messages.eventIdPlaceholder),
      size: 'small',
      fullWidth: true,
      breakpoints: { xs: 12 }
    },
    {
      type: 'textarea',
      name: 'comment',
      label: intl.formatMessage(messages.commentLabel),
      placeholder: intl.formatMessage(messages.commentPlaceholder),
      size: 'small',
      fullWidth: true,
      rows: 3,
      breakpoints: { xs: 12 }
    }
  ];

  const validationSchema = Yup.object({
    eventId: Yup.string().required(intl.formatMessage(messages.requiredError)),
    comment: Yup.string().required(intl.formatMessage(messages.requiredError))
  });

  const handleSubmit = async (_values) => {
    handleCloseModal();

    const values = {
      ...webinar,
      ..._values
    };

    const mappedValues = mapValues(values);

    const targetWebinarId = webinar.id;

    try {
      const {
        headerResponse: { status }
      } = await editWebinar({ urlParams: targetWebinarId, body: mappedValues });

      if (status === 200) {
        setWebinars((webinars) =>
          webinars.map((webinar) =>
            webinar.id === targetWebinarId
              ? { ...webinar, ..._values }
              : webinar
          )
        );
      }
    } catch {}
  };

  return {
    fields,
    handleSubmit,
    validationRules: validationSchema,
    initialValues
  };
};
