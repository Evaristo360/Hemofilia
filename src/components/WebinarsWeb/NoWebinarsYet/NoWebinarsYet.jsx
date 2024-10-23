import React from 'react';
import { useIntl } from 'react-intl';
import { Typography } from '@material-ui/core';
import { messages } from './NoWebinarsYetMessages';
import { useStyles } from './NoWebinarsYetStyles';

const NoWebinarsYet = () => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="button" color="primary" className={classes.text}>
        {intl.formatMessage(messages.noWebinars)}
      </Typography>
    </div>
  );
};

export { NoWebinarsYet };
