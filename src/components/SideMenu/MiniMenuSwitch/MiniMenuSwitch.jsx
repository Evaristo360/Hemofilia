import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Switch, Tooltip } from '@material-ui/core';
import { messages } from './MiniMenuSwitchMessages';
import { useStyles } from './MiniMenuSwitchStyles';
import { useSideMenu } from '../hooks/useSideMenu';
import { setItem } from 'utils/persistentStorage';

const MiniMenuSwitch = () => {
  const { formatMessage } = useIntl();
  const { mini, setMini, expanded } = useSideMenu();
  const classes = useStyles({ expanded });

  const handleSetMini = (value) => {
    setMini(value);
    setItem('mini_menu', value);
  };

  return (
    <Tooltip title={formatMessage(messages.tooltip)}>
      <Switch
        size="small"
        className={classes.container}
        checked={mini}
        onChange={({ target }) => handleSetMini(target.checked)}
        name="miniMenu"
      />
    </Tooltip>
  );
};

MiniMenuSwitch.propTypes = {};

export { MiniMenuSwitch };
