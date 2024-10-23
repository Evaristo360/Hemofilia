import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useStyles } from './ResearchCardStyles';

const ResearchCard = (props) => {
  const classes = useStyles();
  const { data, textLink, children, onClick } = props;

  const IconStar = data.vote_average > 0 ? StarIcon : StarBorderIcon;

  return (
    <Card className={classes.container}>
      <img className={classes.image} src={data.image} alt="banner" />
      <div className={classes.content}>{children}</div>
      <div className={classes.footerContainer}>
        <div className={classes.rateContainer}>
          <IconStar className={classes.icon} />
          <p className={classes.rate}>{data.vote_average}</p>
        </div>
        <Typography variant="button" className={classes.link} onClick={onClick}>
          {textLink}
        </Typography>
      </div>
    </Card>
  );
};

ResearchCard.propTypes = {
  data: PropTypes.object,
  textLink: PropTypes.string,
  children: PropTypes.element
};

export default ResearchCard;
