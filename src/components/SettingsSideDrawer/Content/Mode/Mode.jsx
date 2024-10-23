import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, Grid } from '@material-ui/core';
import { useStyles } from './ModeStyles';
import DarkIcon from '@material-ui/icons/Brightness2Rounded';
import LightIcon from '@material-ui/icons/WbSunnyRounded';
import { useTheme } from 'components/Theme';
import { setItem } from 'utils/persistentStorage';

const Mode = () => {
  const { availableSkins, handleChangeTheme, theme } = useTheme();
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <ButtonBase
          TouchRippleProps={{
            classes: { child: classes.ripple }
          }}
          onClick={() => {
            handleChangeTheme(availableSkins.LIGHT);
            setItem('theme', availableSkins.LIGHT);
          }}
          className={`${classes.item} light`}
        >
          <LightIcon color={theme === 'light' ? 'primary' : 'inherit'} />
        </ButtonBase>
      </Grid>
      <Grid item xs={6}>
        <ButtonBase
          TouchRippleProps={{
            classes: { child: classes.ripple }
          }}
          onClick={() => {
            handleChangeTheme(availableSkins.DARK);
            setItem('theme', availableSkins.DARK);
          }}
          className={`${classes.item} dark`}
        >
          <DarkIcon color={theme === 'dark' ? 'primary' : 'inherit'} />
        </ButtonBase>
      </Grid>
    </Grid>
  );
};

Mode.propTypes = {};

export { Mode };
