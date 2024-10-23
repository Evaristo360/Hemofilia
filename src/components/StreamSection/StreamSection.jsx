import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Box, IconButton, Container } from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';
import { useStyles } from './StreamSectionStyles';
import { Alert, useModal } from '@octopy/react-modal';
import { useEffect } from 'react';
import { useApi } from 'hooks';
import { mapWebinar } from './helpers';
import { useIntl } from 'react-intl';
import { messages } from './StreamSectionMessages';

const StreamSection = ({
  match: {
    params: { id }
  }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const intl = useIntl();
  const { handleOpenModal } = useModal();
  const [getWebinar] = useApi({
    endpoint: 'webinar/web/stream',
    method: 'get'
  });

  const [event, setEvent] = useState();

  useEffect(() => {
    (async () => {
      try {
        const {
          headerResponse: { status },
          payload
        } = await getWebinar({ urlParams: id });

        if (status === 200) {
          const stream = mapWebinar(payload);

          if (!stream.eventId) {
            history.push('/webinarsWeb');
            handleOpenModal({
              configProps: {
                maxWidth: 'sm'
              },
              body: <Alert message={intl.formatMessage(messages.noLiveError)} />
            });
          } else {
            setEvent(stream);
          }
        } else {
          throw new Error();
        }
      } catch (e) {
        console.log(e);
        history.push('/webinarsWeb');
      }
    })();
  }, []);

  if (!event) {
    return null;
  }

  return (
    <Container maxWidth="xl" className={classes.container}>
      <div className={classes.appBarSpacer} />

      <Box className={classes.header}>
        <IconButton onClick={() => history.goBack()}>
          <KeyboardBackspace fontSize="large" />
        </IconButton>
        <Typography variant="h4" color="primary" className={classes.title}>
          {event.title}
        </Typography>
      </Box>

      <Box className={classes.streamContainer}>
        <Box className={classes.videoContainer}>
          <iframe
            className={classes.player}
            src={event.eventUrl}
            title="player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </Box>
        {event.chatUrl && (
          <Box className={classes.chatContainer}>
            <iframe
              title="stream-chat"
              width="100%"
              height="100%"
              frameborder="0"
              className={classes.iframe}
              src={event.chatUrl}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export { StreamSection };
