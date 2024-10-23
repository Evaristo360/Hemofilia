import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@material-ui/core';
import { useStyles } from './InfoCardStyle';

const InfoCard = (props) => {
  const { IconComponent, title, stat } = props;
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <IconComponent className={classes.icon} />
      <div>
        <div className={classes.title}>{title}</div>
        <div className={classes.stat}>{stat}</div>
      </div>
    </Card>
  );
};

InfoCard.propTypes = {};

export default InfoCard;
