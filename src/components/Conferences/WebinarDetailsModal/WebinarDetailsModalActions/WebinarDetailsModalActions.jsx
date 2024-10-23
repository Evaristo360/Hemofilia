import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Box, Button } from '@material-ui/core';
import { messages } from './WebinarDetailsModalActionsMessages';
import { useStyles } from './WebinarDetailsModalActionsStyles';

const WebinarDetailsModalActions = ({ formikRef }) => {
  const { formatMessage } = useIntl();
  const classes = useStyles();

  return (
    <Box px={1.5} pb={1}>
      <Button
        className={classes.aproveButton}
        color="secondary"
        onClick={() => {
          formikRef.current.setFieldValue('status', 'aprobada');
          formikRef.current.submitForm('aprove');
        }}
      >
        {formatMessage(messages.aprove)}
      </Button>
      <Button
        className={classes.rejectButton}
        color="primary"
        onClick={() => {
          formikRef.current.setFieldValue('status', 'rechazada');
          formikRef.current.submitForm('reject');
        }}
      >
        {formatMessage(messages.reject)}
      </Button>
    </Box>
  );
};

WebinarDetailsModalActions.propTypes = {
  webinar: PropTypes.object.isRequired
};

export { WebinarDetailsModalActions };
