import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@material-ui/core';
import { useStyles } from './ContactCardStyle';

const ContactCard = (props) => {
  const { IconComponent, title, description, footer } = props;
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <IconComponent className={classes.icon} />
      <div className={classes.title}>{title}</div>
      <div className={classes.description}>{description}</div>
      <div className={classes.footerContainer}>{footer}</div>
    </Card>
  );
};

ContactCard.propTypes = {};

export default ContactCard;
