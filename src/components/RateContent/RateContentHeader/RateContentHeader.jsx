import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Grid, Typography, IconButton, Box } from '@material-ui/core';
import { messages } from '../RateContentMessages';
import { useStyles } from '../RateContentStyles';
import { useModal } from '@octopy/react-modal';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Rating from '@material-ui/lab/Rating';
import { useApi } from 'hooks';
import { isFunction, isNumber } from 'lodash';

const RateContentHeader = (props) => {
  const {
    title,
    score = 0,
    starColor = '#0099D7',
    contentId,
    contentType,
    getLastContentList
  } = props;

  const { formatMessage: f } = useIntl();
  const classes = useStyles();
  const [value, setValue] = useState(score);
  const { handleCloseModal } = useModal();

  const [qualifyDocument] = useApi({
    endpoint: `document/web/vote`,
    method: 'post'
  });
  const [qualifyVideo] = useApi({
    endpoint: `video/web/vote`,
    method: 'post'
  });

  const changeScore = async (score) => {
    try {
      const points = score !== null ? score : 0;
      const httpRequest = {
        urlParams: contentId,
        body: {
          points
        }
      };

      setValue(points);
      if (contentType === 'pdf') {
        await qualifyDocument(httpRequest);
      } else {
        await qualifyVideo(httpRequest);
      }

      if (isFunction(getLastContentList)) {
        getLastContentList();
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={2}>
        <IconButton onClick={handleCloseModal}>
          <ArrowBackIcon />
        </IconButton>
      </Grid>
      <Grid item xs={10} md={7} lg={8}>
        <Typography variant="subtitle1" align="center">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} md={3} lg={2} className={classes.center}>
        <Typography variant="body2" className={classes.rateContent}>
          {f(
            contentType === 'pdf' ? messages.rateDocument : messages.rateVideo
          )}
        </Typography>
        <Box className={classes.stars}>
          <Rating
            name="half-rating"
            value={isNumber(value) ? value : 0}
            precision={0.5}
            style={{ color: starColor }}
            onChange={(event, newValue) => {
              changeScore(newValue);
            }}
            disabled={value > 0}
          />
          {/* <Box> */}
          <Typography variant="caption">{`${
            isNumber(value) ? value : 0
          } `}</Typography>
          <Typography variant="caption">
            {value === 1 ? f(messages.star) : f(messages.stars)}
          </Typography>
          {/* </Box> */}
        </Box>
      </Grid>
    </Grid>
  );
};

RateContentHeader.propTypes = {
  title: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  starColor: PropTypes.string,
  contentType: PropTypes.oneOf(['pdf', 'video'])
};

export { RateContentHeader };
