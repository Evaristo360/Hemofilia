import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get, toUpper } from 'lodash';
import { Avatar, Box, ButtonBase, Typography } from '@material-ui/core';
import { useRootProvider } from 'components/RootProvider';
import { useStyles } from './ProfilePreviewStyles';
import { useSideMenu } from '..';

const ProfilePreview = () => {
  const { expanded } = useSideMenu();
  const classes = useStyles({ expanded });
  const { rootState } = useRootProvider();

  const account = get(rootState, 'session.user', {});
  const firstLetter = toUpper(get(account, ['name', 0]));

  const user = {
    name: get(account, 'name', ''),
    role: get(account, 'role', 'administrador'),
    image: get(account, 'avatar', '')
  };

  const idDoctor = user.role === 'doctor';

  return (
    <ButtonBase
      component={idDoctor ? Link : Box}
      className={classes.container}
      to="/perfil"
    >
      <Avatar
        src={user.image}
        variant="circular"
        className={classes.avatar}
        alt={firstLetter}
      />
      <Box pl={1.5} className={classes.textContainer}>
        <Typography variant="subtitle2">{user.name}</Typography>
        <Typography component="div" variant="body2" color="textSecondary">
          {user.role}
        </Typography>
      </Box>
    </ButtonBase>
  );
};

ProfilePreview.propTypes = {};

export { ProfilePreview };
