import React, { useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  Card
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Images } from 'assets';
import { useModal } from '@octopy/react-modal';
import { useLoader } from '@octopy/react-loader';
import { messages } from './IntroductionMessages';
import './Introduction.scss';
import { logAnalyticsEvent } from 'providers/firebase/analytics';

const Introduction = () => {
  const history = useHistory();
  const intl = useIntl();
  const { handleShowLoader } = useLoader();
  const { handleOpenModal } = useModal();
  const pharagrapTranslated = intl.formatMessage(messages.motivationContent, {
    br: <br />
  });

  useEffect(() => {
    // Example to use loader
    handleShowLoader(true);

    setTimeout(() => {
      handleShowLoader(false);
    }, 1000);

    logAnalyticsEvent('On Introduction', { time: new Date().getTime() });
  }, []);

  return (
    <>
      <Container className="introduction-container">
        <Card className="title">
          <img src={Images.logo} className="title__logo" alt="logo" />
          <Typography variant="h1">
            <FormattedMessage {...messages.title} />
          </Typography>
        </Card>

        <Typography variant="body1" component="p">
          <FormattedMessage {...messages.aboutHooks} />
        </Typography>

        <Typography variant="h3">
          <FormattedMessage {...messages.motivationSubtitle} />{' '}
          <span role="img" aria-label="clap">
            👏
          </span>
        </Typography>

        <Typography variant="body1">{pharagrapTranslated}</Typography>

        <Grid
          container
          spacing={2}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Button
              size="medium"
              color="primary"
              onClick={() => history.push('/guideline/file-distribution')}
            >
              {intl.formatMessage(messages.buttonFilesDistribution)}
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="large"
              color="primary"
              onClick={() => history.push('/guideline/code-examples')}
            >
              {intl.formatMessage(messages.buttonExamples)}
            </Button>
          </Grid>

          <TextField
            label="Nombre completo"
            placeholder="Ingresa tu nombre completo"
          />

          <Grid item>
            <Button
              variant="outlined"
              size="small"
              onClick={() =>
                handleOpenModal({
                  body: (
                    <Box p={4}>
                      <div className="title">
                        <img
                          src={Images.logo}
                          className="title__logo"
                          alt="logo"
                        />
                        <Typography variant="h1">
                          <FormattedMessage {...messages.title} />
                        </Typography>
                      </div>
                    </Box>
                  )
                })
              }
            >
              {intl.formatMessage(messages.buttonOpenModal)}
            </Button>
          </Grid>

          <Grid item>
            <Button
              color="secondary"
              onClick={() => history.push('incorrect-path')}
            >
              {intl.formatMessage(messages.buttonExampleNotFound)}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export { Introduction };
