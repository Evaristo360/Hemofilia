import { get, toUpper, replace } from 'lodash';
import { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton
} from '@material-ui/core';

import {
  Home as HomeIcon,
  Person as PersonIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  AssignmentInd as AssignmentIndIcon,
  LocalHospital as LocalHospitalIcon
} from '@material-ui/icons';

import { useAuth } from '@octopy/react-auth';
import { Popover } from 'components/Popover';
import { menuItemWithStyles, useStyles } from './AccountPopoverStyles';
import { useRootProvider } from 'components/RootProvider';
import { messages } from './AccountPopoverMessages';

const StyledMenuItem = menuItemWithStyles((props) => <MenuItem {...props} />);

const AccountPopover = () => {
  const classes = useStyles();
  const intl = useIntl();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { actions: authActions, auth } = useAuth();
  const { rootState } = useRootProvider();

  const account = get(rootState, 'session.user', {});
  const name = replace(get(account, 'name', ''), 'Dr. ', '');
  const isDoctor = get(auth, 'user.role') === 'doctor';

  const firstLetter = toUpper(get(name, [0]));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    authActions.logout();
  };

  const MENU_OPTIONS = [
    {
      label: intl.formatMessage(messages.homepage),
      icon: HomeIcon,
      linkTo: '/'
    },
    ...(isDoctor
      ? [
          {
            label: intl.formatMessage(messages.profile),
            icon: PersonIcon,
            linkTo: '/perfil'
          }
        ]
      : [])
  ];

  return (
    <>
      <IconButton ref={anchorRef} onClick={handleOpen}>
        <Avatar src={get(account, 'avatar', 'x-no-image')} alt={firstLetter} />
      </IconButton>

      <Popover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ minWidth: 220, my: 1, px: 1.5 }}>
          <Typography variant="subtitle1" color="primary" noWrap>
            {get(account, 'name', '')}
          </Typography>
          {isDoctor && (
            <Typography variant="body2" color="primary" noWrap>
              <LocalHospitalIcon
                color="secondary"
                className={classes.iconStyle}
              />
              {get(account, 'clinic', '')}
            </Typography>
          )}
          <Typography variant="body2" color="primary" noWrap>
            <MailIcon color="secondary" className={classes.iconStyle} />
            {get(account, 'email', '')}
          </Typography>
          {isDoctor && (
            <Typography variant="body2" color="primary" noWrap>
              <AssignmentIndIcon
                color="secondary"
                className={classes.iconStyle}
              />
              {get(account, 'license', '')}
            </Typography>
          )}
          {isDoctor && get(account, 'phone') && (
            <Typography variant="body2" color="primary" noWrap>
              <PhoneIcon className={classes.iconStyle} />
              {get(account, 'phone')}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => {
          const Icon = option.icon;

          return (
            <StyledMenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
            >
              <Box
                sx={{
                  mr: 1,
                  width: 24,
                  height: 24
                }}
              >
                <Icon />
              </Box>

              {option.label}
            </StyledMenuItem>
          );
        })}

        <Box sx={{ p: 1.5, pt: 1 }}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            onClick={handleLogout}
          >
            {intl.formatMessage(messages.logout)}
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export { AccountPopover };
