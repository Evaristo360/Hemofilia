import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import {
  Backdrop,
  Box,
  IconButton,
  Paper,
  Tooltip,
  Typography
} from '@material-ui/core';
import { useStyles } from './SettingsSideDrawerStyles';
import SettingsIcon from '@material-ui/icons/TuneRounded';
import CloseIcon from '@material-ui/icons/CloseRounded';
import { messages } from './SettingsSideDrawerMessages';
import { Content } from './Content/Content';

const SettingsSideDrawer = () => {
  const intl = useIntl();
  const [visible, setVisible] = useState(false);
  const classes = useStyles({ visible });

  return (
    <>
      <Tooltip
        placement="left"
        title={intl.formatMessage(messages[visible ? 'close' : 'settings'])}
      >
        <IconButton
          onClick={() => setVisible((visible) => !visible)}
          className={`${classes.button} ${visible && 'visible'}`}
        >
          {visible ? (
            <CloseIcon className={classes.closeIcon} />
          ) : (
            <SettingsIcon />
          )}
        </IconButton>
      </Tooltip>
      <Backdrop
        className={classes.backdrop}
        open={visible}
        onClick={() => setVisible(false)}
      />
      <Paper className={classes.drawerPaper}>
        <Box className={classes.header}>
          <Typography variant="subtitle1">
            {intl.formatMessage(messages.settings)}
          </Typography>
          <IconButton
            size="small"
            onClick={() => setVisible((visible) => !visible)}
          >
            <CloseIcon className={classes.closeIcon} />
          </IconButton>
        </Box>
        <Box className={classes.contentContainer}>
          <Content />
        </Box>
      </Paper>
    </>
  );
};

SettingsSideDrawer.propTypes = {};

export { SettingsSideDrawer };
