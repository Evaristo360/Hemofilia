import React from 'react';
import { useIntl } from 'react-intl';
import {
  Typography,
  Card,
  Box,
  Avatar,
  CardContent,
  CardActions
} from '@material-ui/core';
import { useStyles } from './CardContactStyles';

const CardContact = ({ image, name, speciality, email, phone, state }) => {
  const { formatMessage: f } = useIntl();
  const classes = useStyles();

  return (
    <Card className={classes.cardContainer}>
      <CardContent>
        <Box className={classes.cardHeader}>
          {image ? (
            <Avatar
              alt={`image-${name}`}
              src={image}
              className={classes.imageContact}
            />
          ) : (
            <Avatar alt={`image-${name}`} className={classes.imageContact}>
              {name.substring(0, 2).toUpperCase()}
            </Avatar>
          )}
        </Box>
        <Typography
          variant="h7"
          className={classes.primaryText}
          display="block"
        >
          {name}
        </Typography>
        <Typography
          variant="h7"
          className={classes.secondaryText}
          display="block"
        >
          {speciality}
        </Typography>
        <Typography
          variant="h7"
          className={classes.complementText}
          display="block"
        >
          {email}
        </Typography>
        <Typography
          variant="h7"
          className={classes.complementText}
          display="block"
        >
          {phone}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardFooter}>
        <Typography variant="h7" className={classes.secondaryText}>
          {state}
        </Typography>
      </CardActions>
    </Card>
  );
};

export { CardContact };
