import React from 'react';
import { useIntl } from 'react-intl';
import { Avatar, Button, Typography } from '@material-ui/core';
import { messages } from './WebinarCardMessages';
import { useStyles } from './WebinarCardStyles';
import { Images } from 'assets';
import { formatDate, formatTime, msToTime } from 'utils/dates';

const WebinarCard = ({ webinar, action }) => {
  const intl = useIntl();
  const classes = useStyles();

  const live = new Date() > webinar.startDate && new Date() < webinar.endDate;

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.imageContainer}>
          {webinar.imageUrl ? (
            <img
              src={webinar.imageUrl}
              alt="webinar"
              className={classes.image}
            />
          ) : (
            <img
              src={Images.defaultImage}
              alt="default"
              className={classes.defaultImage}
            />
          )}

          {live && (
            <div className={classes.live}>
              <Typography variant="caption">
                {intl.formatMessage(messages.live)}
              </Typography>
            </div>
          )}

          <Typography className={classes.duration} variant="caption">
            {msToTime(
              (live ? new Date() : webinar.endDate) - webinar.startDate,
              intl
            )}
          </Typography>
        </div>
        <div className={classes.contentContainer}>
          <div className={classes.avatarContainer}>
            <Avatar src={webinar.doctor.avatarUrl} />
          </div>
          <div className={classes.bodyContainer}>
            <Typography
              variant="subtitle1"
              color="primary"
              className={classes.theme}
            >
              {webinar.theme}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {webinar.doctor.name}
            </Typography>
          </div>
        </div>
        <div className={classes.actionsContainer}>
          <Button
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
          <Typography variant="caption" color="textSecondary">
            {formatDate(webinar.startDate, intl)},{' '}
            {formatTime(webinar.startDate, intl)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export { WebinarCard };
