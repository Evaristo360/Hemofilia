import React from 'react';
import {
  Typography,
  Card,
  IconButton,
  CardActionArea,
  Divider,
  Box
} from '@material-ui/core';
import { useStyles } from './ApprovedCardStyles';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

const ApprovedCard = ({ item }) => {
  const classes = useStyles();
  const { title, description, doctor, date, hour, edit } = item;

  return (
    <>
      {edit ? (
        <Card className={classes.card}>
          <CardActionArea className={classes.boxInformation}>
            <Typography className={classes.title}>{title}</Typography>
            <Typography className={classes.description}>
              {description}
            </Typography>
            <Typography className={classes.doctor}>{doctor}</Typography>
            <Typography className={classes.date}>{date}</Typography>
            <Typography className={classes.hour}>{hour}</Typography>
          </CardActionArea>
          <Divider />
          <Box className={classes.boxButtons}>
            <IconButton>
              <CreateIcon className={classes.icon} />
            </IconButton>
            <IconButton>
              <DeleteIcon className={classes.icon} />
            </IconButton>
          </Box>
        </Card>
      ) : (
        <Card className={classes.card}>
          <CardActionArea className={classes.boxInformation}>
            <Typography className={classes.title}>{title}</Typography>
            <Typography className={classes.description}>
              {description}
            </Typography>
            <Typography className={classes.doctor}>{doctor}</Typography>
            <Typography className={classes.date}>{date}</Typography>
            <Typography className={classes.hour}>{hour}</Typography>
          </CardActionArea>
        </Card>
      )}
    </>
  );
};

ApprovedCard.propTypes = {};

export { ApprovedCard };
