import React from 'react';
import PropTypes from 'prop-types';
import { Box, ButtonBase } from '@material-ui/core';
import { useStyles } from './StretchStyles';
import { useTheme } from 'components/Theme';
import LeftArrow from '@material-ui/icons/ArrowBackIosRounded';
import RightArrow from '@material-ui/icons/ArrowForwardIosRounded';
import { setItem } from 'utils/persistentStorage';

const Stretch = () => {
  const classes = useStyles();
  const { handleChangeStretch } = useTheme();

  const onChangeStretchClick = () => {
    handleChangeStretch((stretch) => {
      setItem('stretch', !stretch);

      return !stretch;
    });
  };

  return (
    <ButtonBase
      TouchRippleProps={{
        classes: { child: classes.ripple }
      }}
      className={classes.container}
      onClick={onChangeStretchClick}
    >
      <Box className={classes.stretch}>
        <RightArrow className={classes.arrow} />
        <LeftArrow className={classes.arrow} />
      </Box>
    </ButtonBase>
  );
};

Stretch.propTypes = {};

export { Stretch };
