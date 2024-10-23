import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, Grid } from '@material-ui/core';
import { useStyles } from './DirectionStyles';
import { setItem } from 'utils/persistentStorage';
import { useTheme } from 'components/Theme';

const Direction = () => {
  const classes = useStyles();
  const { handleChangeDirection } = useTheme();

  const onChangeDirectionClick = (direction) => {
    setItem('direction', direction);
    handleChangeDirection(direction);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <ButtonBase
          TouchRippleProps={{
            classes: { child: classes.ripple }
          }}
          onClick={() => onChangeDirectionClick('ltr')}
          className={`${classes.item} left`}
        >
          <div className={`${classes.firstBox} ltr`} />
          <div className={`${classes.secondBox} ltr`} />
          <div className={`${classes.thirdBox} ltr`} />
        </ButtonBase>
      </Grid>
      <Grid item xs={6}>
        <ButtonBase
          TouchRippleProps={{
            classes: { child: classes.ripple }
          }}
          onClick={() => onChangeDirectionClick('rtl')}
          className={`${classes.item} right`}
        >
          <div className={`${classes.firstBox} rtl`} />
          <div className={`${classes.secondBox} rtl`} />
          <div className={`${classes.thirdBox} rtl`} />
        </ButtonBase>
      </Grid>
    </Grid>
  );
};

Direction.propTypes = {};

export { Direction };
