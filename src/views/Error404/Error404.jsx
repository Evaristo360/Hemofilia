import { get } from 'lodash';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import Lottie from 'react-lottie-player';
import { Typography, Button } from '@material-ui/core';
import { logAnalyticsEvent } from 'providers/firebase/analytics';
import { useStyles } from './Error404Styles';
import { messages } from './messages';
import { useAuth } from '@octopy/react-auth';

import lottieJson from 'assets/animations/404.json';

function Error404() {
  const classes = useStyles();
  const history = useHistory();
  const { auth } = useAuth();
  const role = get(auth, 'user.role', 'public');

  useEffect(() => {
    logAnalyticsEvent('404', {
      time: new Date().getTime(),
      location: history.location
    });
  }, []);

  if (role === 'public') {
    return <Redirect to="/login" />;
  }

  return (
    <div className={classes.container}>
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{
          height: '85%'
        }}
      />

      <div className={classes.errorDetails}>
        <Typography color="primary" className="title">
          <FormattedMessage {...messages.title} />
        </Typography>
        <Typography variant="body1" className="description">
          <FormattedMessage {...messages.description} />
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => history.push('/')}
        >
          <FormattedMessage {...messages.button} />
        </Button>
      </div>
    </div>
  );
}

export { Error404 };
