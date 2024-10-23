import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './ItemDetailsModalBodyStyles';

const exampleItem = {
  name: 'Fabio Bermudez',
  email: 'fabiosaac12@gmail.com',
  age: 19,
  description:
    'eedadedadedadedadedadsaklcjkklacwj salkc akwlc slakc lawk ckal csedadedadedadedadedadsaklcjkklacwj salkc akwlc slakc lawk ckal csdadedadedadedadedadsaklcjkklacwj salkc akwlc slakc lawk ckal cs'
};

const ItemDetailsModalBody = ({ item = exampleItem }) => {
  const classes = useStyles();

  return (
    <>
      {Object.keys(item).map((key) => (
        <Box key={`${key}Key`} className={classes.propertyContainer}>
          <Typography
            component="div"
            className={classes.key}
            variant="subtitle1"
          >
            {key}
          </Typography>
          <Typography component="div" className={classes.value} variant="body2">
            {item[key]}
          </Typography>
        </Box>
      ))}
    </>
  );
};

ItemDetailsModalBody.propTypes = {
  item: PropTypes.object.isRequired
};

export { ItemDetailsModalBody };
