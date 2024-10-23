/* eslint-disable jsx-a11y/no-autofocus */
import React, { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  AppBar,
  Button,
  ClickAwayListener,
  Fade,
  IconButton,
  Input,
  Slide,
  Toolbar
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchRounded';
import { messages } from './SearchBarMessages';
import { useStyles } from './SearchBarStyles';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const intl = useIntl();
  const classes = useStyles();

  const searchButtonRef = useRef();

  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
    <ClickAwayListener onClickAway={() => setVisible(false)}>
      <div>
        <Fade in={!visible}>
          <IconButton onClick={() => setVisible(true)}>
            <SearchIcon />
          </IconButton>
        </Fade>

        <Slide direction="down" in={visible} mountOnEnter unmountOnExit>
          <AppBar color="default" position="absolute" className={classes.bar}>
            <Toolbar>
              <IconButton className={classes.barSearchIcon}>
                <SearchIcon />
              </IconButton>
              <Input
                onKeyDown={({ key }) =>
                  key.toLowerCase() === 'enter' &&
                  searchText &&
                  searchButtonRef.current.click()
                }
                value={searchText}
                onChange={({ target: { value } }) => setSearchText(value)}
                fullWidth
                autoFocus
                disableUnderline
                placeholder={intl.formatMessage(messages.search)}
              />
              <Button
                ref={searchButtonRef}
                className={classes.searchButton}
                color="primary"
                disabled={!searchText}
                component={Link}
                to={`/search/${searchText}`}
                onClick={() => {
                  setVisible(false);
                  setSearchText('');
                }}
              >
                Buscar
              </Button>
            </Toolbar>
          </AppBar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
};

export { SearchBar };
