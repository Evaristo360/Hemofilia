import React from 'react';
import { useIntl } from 'react-intl';
import { Box, Button, Typography } from '@material-ui/core';
import { messages } from './MyWebinarCardMessages';
import { useStyles } from './MyWebinarCardStyles';
import { formatDate, msToTime } from 'utils/dates';
import { useActions } from './hooks/useActions';

const MyWebinarCard = ({ webinar, setWebinars }) => {
  const intl = useIntl();
  const classes = useStyles();

  const actions = useActions(webinar, setWebinars);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.bodyContainer}>
          <Typography
            variant="subtitle1"
            color="primary"
            className={classes.theme}
          >
            {webinar.theme}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {intl.formatMessage(messages.date)}{' '}
            {formatDate(webinar.startDate, intl)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {intl.formatMessage(messages.duration)}{' '}
            {msToTime(webinar.endDate - webinar.startDate, intl)}
          </Typography>
          <Box className={`${classes.status} ${webinar.status}`}>
            <Typography variant="caption">
              {intl.formatMessage(messages[webinar.status])}
            </Typography>
          </Box>
        </div>
        <div className={classes.actionsContainer}>
          {actions.map((action, index) => (
            <Button
              key={`webinar-${webinar.id}-action-${index}`}
              className={`${classes.actionButton} ${action?.className} ${
                !action ? 'hidden' : ''
              }`}
              variant="text"
              color="primary"
              startIcon={action?.icon}
              onClick={action?.action}
            >
              {action?.label || '.'}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export { MyWebinarCard };
