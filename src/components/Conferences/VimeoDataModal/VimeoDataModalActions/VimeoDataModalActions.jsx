import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Box, Button } from '@material-ui/core';
import { messages } from './VimeoDataModalMessages';
import { useStyles } from './VimeoDataModalStyles';

const VimeoDataModalActions = ({ formikRef }) => {
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

VimeoDataModalActions.propTypes = {
  webinar: PropTypes.object.isRequired
};

export { VimeoDataModalActions };
