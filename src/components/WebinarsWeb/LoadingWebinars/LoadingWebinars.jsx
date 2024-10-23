import React from 'react';
import { useIntl } from 'react-intl';
import { CircularProgress, Typography } from '@material-ui/core';
import { messages } from './LoadingWebinarsMessages';
import { useStyles } from './LoadingWebinarsStyles';

const LoadingWebinars = () => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CircularProgress color="primary" className={classes.loader} size={30} />
      <Typography
        variant="button"
        color="primary"
        className={classes.loadingText}
      >
        {intl.formatMessage(messages.loading)}
      </Typography>
    </div>
  );
};

export { LoadingWebinars };
