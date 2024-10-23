import React from 'react';
import { Box, Card, Grid, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useStyles } from './HomeCardStyles';
import { Images } from 'assets';

const HomeCard = (props) => {
  const classes = useStyles();
  const {
    img,
    caption = '',
    title = '',
    description = '',
    stars = 0,
    children
  } = props;

  const IconStar = stars > 0 ? StarIcon : StarBorderIcon;

  return (
    <Card>
      <img
        className={classes.image}
        src={img ? img : Images.defaultImage}
        alt={title}
      />
      <Grid container className={`${classes.px} ${classes.cardBody}`}>
        <Typography variant="caption" className={classes.caption} noWrap>
          {caption}
        </Typography>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              className={classes.title}
              gutterBottom
              noWrap
            >
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.description}>
            <Typography
              variant="subtitle2"
              noWrap
              className={classes.description}
            >
              {description}
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.bottomCard}>
          <Grid item xs={6}>
            <Box className={classes.startContainer}>
              <IconStar style={{ color: '#001964', marginRight: 5 }} />
              <Typography variant="caption" className={classes.caption}>
                {stars}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            container
            direction="row"
            alignItems="center"
            justify="flex-end"
          >
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default HomeCard;
