import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import * as Yup from 'yup';
import { messages } from '../WebinarDetailsModalBodyMessages';
import { useApi } from 'hooks';
import { useModal } from '@octopy/react-modal';

export const useForm = ({ setWebinars, webinar }) => {
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
      rows: 3
    }
  ];

  const validationSchema = Yup.object({
    comment: Yup.string().required(intl.formatMessage(messages.requiredError))
  });

  const handleSubmit = async (values) => {
    handleCloseModal();

    const targetWebinarId = webinar.id;

    try {
      const response = await changeWebinarStatus({
        urlParams: targetWebinarId,
        body: values
      });

      if (response.headerResponse.status === 200) {
        setWebinars((webinars) =>
          webinars.map((webinar) =>
            webinar.id === targetWebinarId
              ? { ...webinar, status: values.status }
              : webinar
          )
        );
      }
    } catch {}
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  });

  return { fields, formik };
};
