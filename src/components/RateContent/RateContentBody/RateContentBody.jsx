import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { useStyles } from '../RateContentStyles';

const RateContentBody = (props) => {
  const { src, contentType, title } = props;
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        {contentType === 'pdf' ? (
          <object
            data={`${src}#toolbar=0`}
            type="application/pdf"
            style={{
              width: '100%',
              height: '85vh'
            }}
          >
            <iframe
              src={`https://docs.google.com/viewer?url=${src}&embedded=true`}
              title={title}
              type="application/pdf"
              style={{
                width: '100%',
                height: '85vh'
              }}
              frameBorder="0"
            ></iframe>
          </object>
        ) : (
          <video controls controlsList="nodownload" className={classes.video}>
            <source src={src} type="video/mp4" />
            <track kind="captions" />
            Your browser does not support the video tag.
          </video>
        )}
      </Grid>
    </Grid>
  );
};

RateContentBody.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  contentType: PropTypes.oneOf(['pdf', 'video'])
};

export { RateContentBody };
