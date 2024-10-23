import React from 'react';
import { Typography, Card, CardActionArea } from '@material-ui/core';
import { useStyles } from './CardInfoStyles';

const CardInfo = ({ info }) => {
  const classes = useStyles();
  const { description, total } = info;

  return (
    <div>
      <Card className={classes.card}>
        <CardActionArea className={classes.cardArea}>
          <info.icon className={classes.icon} />
          <Typography className={classes.description}>{description}</Typography>
          <Typography className={classes.total}>{total}</Typography>
        </CardActionArea>
      </Card>
    </div>
  );
};

CardInfo.propTypes = {};

export { CardInfo };
