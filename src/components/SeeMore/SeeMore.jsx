import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { messages } from './SeeMoreMessages';
import { useStyles } from './SeeMoreStyles';
import { useApi } from 'hooks';
import { get, map, size } from 'lodash';

export const SeeMore = ({ endpoint, handleSubmitValues }) => {
  // const [index, setIndex] = useState(1);

  const { formatMessage: f } = useIntl();
  const classes = useStyles();

  // const [getData] = useApi({
  //   endpoint: 'modules', //endpoint,
  //   method: 'get'
  // });

  // const getDataList = async () => {
  //   const response = await getData();

  //   const data = get(response, 'payload.items', []);

  //   console.log(data);
  // };

  // useEffect(() => {
  //   // getDataList();
  //   handleSubmitValues(index);
  // }, []);

  // useEffect(() => {
  //   // getDataList();
  //   handleSubmitValues(index);
  // }, [index]);

  return (
    <Container className={classes.rowContainer}>
      <Button
        color="primary"
        variant="text"
        onClick={() => handleSubmitValues()}
        fullWidth
      >
        <Typography variant="h7" color="primary" display={'block'}>
          {f(messages.title)}
        </Typography>
        <Typography variant="h7" color="primary" display={'block'}>
          <KeyboardArrowDownIcon className={classes.seeMoreIcon} />
        </Typography>
      </Button>
    </Container>
  );
};
