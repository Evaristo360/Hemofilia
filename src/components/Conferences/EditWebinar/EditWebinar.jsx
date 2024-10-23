import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import { Typography, Container, Tabs, Tab, Button } from '@material-ui/core';
import { messages } from './EditWebinarMessages';
import { useStyles } from './EditWebinarStyles';
import WebinarIcon from '@material-ui/icons/RecordVoiceOverOutlined';
import { WebinarForm } from 'components/WebinarForm/WebinarForm';
import { useApi } from 'hooks';
import { useEffect } from 'react';
import { mapWebinar } from './helpers';

const EditWebinar = ({
  history,
  match: {
    params: { id }
  }
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const formikRef = useRef();
  const [getWebinar] = useApi({
    endpoint: 'webinar/dashboard/get',
    method: 'get'
  });
  const [editWebinar] = useApi({
    endpoint: 'webinar/dashboard/update',
    method: 'put'
  });

  useEffect(() => {
    (async () => {
      try {
        const {
          headerResponse: { status },
          payload: webinar
        } = await getWebinar({ urlParams: id });

        if (status === 200) {
          formikRef.current.setValues(mapWebinar(webinar));
        } else {
          throw new Error();
        }
      } catch (e) {
        history.push('/admin/webinars');
      }
    })();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const {
        headerResponse: { status }
      } = await editWebinar({ body: values, urlParams: id });

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
          <WebinarForm
            formikRef={formikRef}
            onSubmit={handleSubmit}
            withComment
          />
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

export { EditWebinar };
