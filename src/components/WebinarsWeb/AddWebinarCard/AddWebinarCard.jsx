import React from 'react';
import { useIntl } from 'react-intl';
import { Box, IconButton, Typography } from '@material-ui/core';
import { messages } from './AddWebinarCardMessages';
import { useStyles } from './AddWebinarCardStyles';
import WebinarIcon from '@material-ui/icons/RecordVoiceOverOutlined';
import AddIcon from '@material-ui/icons/AddRounded';
import { useHistory } from 'react-router-dom';

const AddWebinarCard = () => {
  const intl = useIntl();
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box
      className={classes.wrapper}
      onClick={() => history.push('webinarsWeb/create')}
    >
      <div className={classes.topContainer}>
        <div className={classes.iconContainer}>
          <WebinarIcon className={classes.icon} />
        </div>
        <div className={classes.bodyContainer}>
          <Typography variant="body1" className={classes.title}>
            {intl.formatMessage(messages.add)}
          </Typography>
          <Typography variant="body1" className={classes.subtitle}>
            {intl.formatMessage(messages.webinar)}
          </Typography>
        </div>
      </div>
      <div className={classes.bottomContainer}>
        <IconButton className={classes.addButton}>
          <AddIcon className={classes.addButtonIcon} fontVariant="button" />
        </IconButton>
      </div>
    </Box>
  );
};

export { AddWebinarCard };
