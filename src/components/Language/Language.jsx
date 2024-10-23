import _ from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';
import {
  Box,
  Button,
  MenuItem,
  useTheme,
  useMediaQuery,
  IconButton
} from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
  Translate as TranslateIcon
} from '@material-ui/icons';
import { useLanguage } from './hooks/useLanguage';
import { messages } from './LanguageMessages';
import { Popover } from 'components/Popover';

const Language = () => {
  const intl = useIntl();
  const { languageCode, availableLocales, handleChangeLocale } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectLanguage = (newLocale) => {
    handleChangeLocale(newLocale);
    handleClose();
  };

  return (
    <Box mr={xs ? 1 : 2} ml="auto">
      {!xs ? (
        <Button
          size="large"
          variant="text"
          aria-controls="locale-menu"
          aria-haspopup="true"
          startIcon={<TranslateIcon />}
          endIcon={<ArrowDropDownIcon />}
          onClick={handleClick}
        >
          {intl.formatMessage(messages.displayName, {
            locale: _.replace(languageCode, '-', '')
          })}
        </Button>
      ) : (
        <IconButton edge="start" color="inherit" onClick={handleClick}>
          <TranslateIcon />
        </IconButton>
      )}

      <Popover
        id="locale-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box py={1}>
          {_.map(availableLocales, (locale, index) => (
            <MenuItem
              key={`${index}-${locale}`}
              onClick={() => {
                handleSelectLanguage(locale);
              }}
            >
              {`${intl.formatMessage(messages.displayName, {
                locale: _.replace(locale, '-', '')
              })} (${locale})`}
            </MenuItem>
          ))}
        </Box>
      </Popover>
    </Box>
  );
};

export { Language };
