import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import { Typography, Container, Tabs, Tab, Button } from '@material-ui/core';
import { messages } from './CreateWebinarMessages';
import { useStyles } from './CreateWebinarStyles';
import WebinarIcon from '@material-ui/icons/RecordVoiceOverOutlined';
import { WebinarForm } from 'components/WebinarForm/WebinarForm';
import { useApi } from 'hooks';
import { useHistory } from 'react-router-dom';

const CreateWebinar = () => {
  const intl = useIntl();
  const classes = useStyles();
  const formikRef = useRef();
  const history = useHistory();
  const [createWebinar] = useApi({
    endpoint: 'webinar/dashboard/create',
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

      history.push('/admin/webinars');
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
