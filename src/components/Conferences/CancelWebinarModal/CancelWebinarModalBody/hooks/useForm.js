import * as Yup from 'yup';
import { useIntl } from 'react-intl';
import { messages } from '../CancelWebinarModalBodyMessages';
import { useApi } from 'hooks';
import { useModal } from '@octopy/react-modal';

export const useForm = ({ webinar, setWebinars }) => {
  const { handleCloseModal } = useModal();
  const intl = useIntl();
  const [changeWebinarStatus] = useApi({
    endpoint: 'webinar/dashboard/change-status',
    method: 'put'
  });

  const initialValues = {
    comment: ''
  };

  const fields = [
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
    comment: Yup.string().required(intl.formatMessage(messages.requiredError))
  });

  const handleSubmit = async ({ comment }) => {
    handleCloseModal();

    try {
      const {
        headerResponse: { status }
      } = await changeWebinarStatus({
        urlParams: webinar.id,
        body: { status: 'cancelada', comment }
      });

      if (status !== 200) {
        throw new Error();
      }

      const webinarToCancel = webinar;

      setWebinars((webinars) =>
        webinars.map((webinar) =>
          webinar.id === webinarToCancel.id
            ? { ...webinar, status: 'cancelada' }
            : webinar
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  return {
    fields,
    handleSubmit,
    validationRules: validationSchema,
    initialValues
  };
};
