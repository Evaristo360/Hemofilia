import React from 'react';
import { useIntl } from 'react-intl';
import { Avatar, Box, Typography } from '@material-ui/core';
import { messages } from './WebinarDetailsMessages';
import { useStyles } from './WebinarDetailsStyles';

const WebinarDetails = ({ webinar, showBody = true, showHeader = true }) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <>
      {showHeader && (
        <Box className={classes.themeContainer}>
          <Avatar
            className={classes.avatar}
            src={webinar.imageUrl}
            variant="rounded"
          />
          <Box>
            <Typography
              component="div"
              className={classes.theme}
              variant="subtitle1"
            >
              {webinar.theme}
            </Typography>
            <Typography
              component="div"
              className={classes.doctorName}
              variant="subtitle2"
            >
              {webinar.doctorName}
            </Typography>
          </Box>
        </Box>
      )}

      {showBody &&
        ['date', 'duration', 'description'].map((key) => (
          <Box key={`${key}-webinar`} className={classes.propertyContainer}>
            <Typography
              component="div"
              className={classes.key}
              variant="subtitle2"
            >
              {intl.formatMessage(messages[key])}
            </Typography>
            <Typography
              component="div"
              className={classes.value}
              variant="body2"
            >
              {webinar[key]}
            </Typography>
          </Box>
        ))}
    </>
  );
};

export { WebinarDetails };
