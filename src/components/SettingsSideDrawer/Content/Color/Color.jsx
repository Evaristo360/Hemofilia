import React from 'react';
import { ButtonBase, Grid, useTheme as useMuiTheme } from '@material-ui/core';
import { useStyles } from './ColorStyles';
import { getColors } from 'providers/theme/config/colors';
import { useTheme } from 'components/Theme';
import { setItem } from 'utils/persistentStorage';

const Color = () => {
  const { palette } = useMuiTheme();
  const colors = getColors(palette.type);
  const { handleChangeColor } = useTheme();

  const classes = useStyles();

  const onChangeColorClick = (color) => {
    handleChangeColor(color);

    setItem('color', color);
  };

  return (
    <Grid container spacing={1}>
      {Object.keys(colors).map((key) => (
        <Grid item xs={4}>
          <ButtonBase
            TouchRippleProps={{
              classes: { child: `${classes.ripple} ${key}` }
            }}
            onClick={() => onChangeColorClick(key)}
            className={`${classes.item}  ${
              palette.color === key ? 'active' : ''
            }`}
          >
            <div
              className={`${classes.color} ${
                palette.color === key ? 'active' : ''
              }`}
              style={{ backgroundColor: colors[key].primary.main }}
            />
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
  );
};

Color.propTypes = {};

export { Color };
