import _ from 'lodash';
import React from 'react';
import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
  useMediaQuery,
  useTheme,
  Badge
} from '@material-ui/core';
import { Language } from '../Language';
import { AccountPopover } from '../Auth';
import { useStyles } from './HeaderStyles';
import MenuIcon from '@material-ui/icons/Menu';
import { useSideMenu } from 'components/SideMenu';
import { messages } from './HeaderMessages';
import { useIntl } from 'react-intl';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { useAuth } from '@octopy/react-auth';
import NotificationsIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { useDrawer } from 'components/Drawer';
import Typography from '@material-ui/core/esm/Typography';
import { Notifications } from 'components/Notifications';

const Header = () => {
  const { formatMessage } = useIntl();
  const { setVisible, mini } = useSideMenu();
  const classes = useStyles({ mini });
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const auth = useAuth();
  const { handleOpenDrawer } = useDrawer();

  const handleOpenNotificationsModal = () => {
    handleOpenDrawer({
      configProps: {
        anchor: 'right',
        transitionDuration: 1000
      },
      closeButton: true,
      title: (
        <Typography color="primary" className={classes.drawerTitle}>
          {formatMessage(messages.notifications)}
        </Typography>
      ),
      body: <Notifications />
    });
  };

  return (
    <div className={classes.root}>
      <AppBar color="default" position="fixed">
        <Toolbar
          style={{
            [theme.direction === 'ltr' ? 'marginLeft' : 'marginRight']: mdUp
              ? theme.mixins.getSideMenu(mini).width
              : 0,
            transition: theme.transitions.create('margin', {
              duration: theme.transitions.duration.standard
            })
          }}
        >
          <Hidden mdUp implementation="css">
            <Tooltip title={formatMessage(messages.openSideMenu)}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="switch-sidemenu"
                onClick={() => setVisible((visible) => !visible)}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          </Hidden>

          <SearchBar />

          <Language />

          {_.get(auth, 'auth.user.role') === 'doctor' && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleOpenNotificationsModal}
            >
              <Badge
                variant="dot"
                invisible={!_.get(auth, 'auth.user.bell')}
                color="secondary"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}

          <AccountPopover />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export { Header };
