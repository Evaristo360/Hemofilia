import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Box, Button } from '@material-ui/core';
import { messages } from './CancelWebinarModalActionsMessages';
import { useStyles } from './CancelWebinarModalActionsStyles';

const CancelWebinarModalActions = ({ formikRef }) => {
  const { formatMessage } = useIntl();
  const classes = useStyles();

  return (
    <Box px={1.5} pb={1}>
      <Button
        color="primary"
        className={classes.acceptButton}
        onClick={() => formikRef.current.submitForm()}
      >
        {formatMessage(messages.accept)}
      </Button>
    </Box>
  );
};

CancelWebinarModalActions.propTypes = {
  webinar: PropTypes.object.isRequired
};

export { CancelWebinarModalActions };
