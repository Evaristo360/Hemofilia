import React from 'react';
import { useIntl } from 'react-intl';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import {
  BrightnessHigh as LightModeIcon,
  Brightness4 as DarkModeIcon
} from '@material-ui/icons';
import { setItem } from 'utils/persistentStorage';
import { useTheme } from './hooks/useTheme';
import { messages } from './ThemeMessages';

const Theme = () => {
  const intl = useIntl();
  const { theme, availableSkins, handleChangeTheme } = useTheme();
  const { LIGHT, DARK } = availableSkins;

  const handleToggleTheme = () => {
    const selectedTheme = theme === LIGHT ? DARK : LIGHT;

    handleChangeTheme(selectedTheme);
    setItem('theme', selectedTheme);
  };

  const tooltipText = intl.formatMessage(messages.tooltip, { theme });

  return (
    <Box mx={1}>
      <Tooltip title={tooltipText}>
        <IconButton
          edge="start"
          aria-label="change-theme"
          onClick={handleToggleTheme}
        >
          {theme === LIGHT ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export { Theme };
