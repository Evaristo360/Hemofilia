import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import {
  Typography,
  Container,
  Tabs,
  Tab,
  Button,
  Box,
  Grid
} from '@material-ui/core';
import { messages } from './CreateWebinarMessages';
import { useStyles } from './CreateWebinarStyles';
import WebinarIcon from '@material-ui/icons/RecordVoiceOverOutlined';
import { useApi } from 'hooks';
import ImportantIcon from '@material-ui/icons/Info';
import { WebinarForm } from 'components/WebinarForm/WebinarForm';
import { useHistory } from 'react-router-dom';

const CreateWebinar = () => {
  const intl = useIntl();
  const classes = useStyles();
  const formikRef = useRef();
  const history = useHistory();
  const [createWebinar] = useApi({
    endpoint: 'webinar/web/create',
    method: 'post'
  });

  const handleSubmit = async (values) => {
    try {
      const {
        headerResponse: { status }
      } = await createWebinar({ body: values });

      if (status !== 200) {
        throw new Error();
      }

      history.push('/webinarsWeb');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={classes.tabsWrapper}>
        <Container>
          <Tabs value={0} indicatorColor="primary">
            <Tab
              label={
                <Typography variant="body1" color="primary">
                  {intl.formatMessage(messages.title)}
                </Typography>
              }
              icon={<WebinarIcon className={classes.icon} />}
            />
          </Tabs>
        </Container>
      </div>

      <Container>
        <div role="tabpanel">
          <WebinarForm formikRef={formikRef} onSubmit={handleSubmit} />

          <Grid container>
            <Grid item lg={3} md={4} sm={12} />
            <Grid item lg={8} md={8} sm={12}>
              <Box mt={2} mb={2}>
                <div className={classes.importantHeader}>
                  <ImportantIcon className={classes.importantIcon} />
                  <Typography
                    className={classes.importantTitle}
                    variant="subtitle1"
                    color="primary"
                  >
                    {intl.formatMessage(messages.importantTitle)}
                  </Typography>
                </div>
                <Typography variant="body2">
                  {intl.formatMessage(messages.importantText)}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Button
            color="primary"
            size="large"
            className={classes.saveButton}
            onClick={() => formikRef.current.submitForm()}
          >
            {intl.formatMessage(messages.save)}
          </Button>
        </div>
      </Container>
    </>
  );
};

export { CreateWebinar };
