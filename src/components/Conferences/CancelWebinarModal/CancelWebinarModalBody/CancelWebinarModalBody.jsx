import React from 'react';
import { Form } from '@octopy/react-form';
import PropTypes from 'prop-types';
import { useForm } from './hooks/useForm';
import { WebinarDetails } from 'components/WebinarDetails/WebinarDetails';
import Typography from '@material-ui/core/esm/Typography';
import { useIntl } from 'react-intl';
import { messages } from './CancelWebinarModalBodyMessages';
import { Box } from '@material-ui/core';

const CancelWebinarModalBody = ({ webinar, formikRef, setWebinars }) => {
  const intl = useIntl();
  const form = useForm({ webinar, setWebinars });

  return (
    <>
      <Box mb={2}>
        <Typography variant="body2" color="textSecondary">
          {intl.formatMessage(messages.sureToCancel)}
        </Typography>
      </Box>

      <WebinarDetails webinar={webinar} showBody={false} />

      <Form formikRef={formikRef} showSubmitButton={false} {...form} />
    </>
  );
};

CancelWebinarModalBody.propTypes = {
  webinar: PropTypes.object.isRequired
};

export { CancelWebinarModalBody };
