import React, { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Typography,
  Container,
  Tabs,
  Tab,
  Button,
  Grid,
  Box
} from '@material-ui/core';
import { messages } from './EditWebinarMessages';
import { useStyles } from './EditWebinarStyles';
import WebinarIcon from '@material-ui/icons/RecordVoiceOverOutlined';
import { WebinarForm } from 'components/WebinarForm/WebinarForm';
import { useApi } from 'hooks';
import { useEffect } from 'react';
import { mapWebinar } from './helpers';
import ImportantIcon from '@material-ui/icons/Info';
import { formatDate, formatTime } from 'utils/dates';

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
    endpoint: 'webinar/web/get',
    method: 'get'
  });
  const [editWebinar] = useApi({
    endpoint: 'webinar/web/update',
    method: 'put'
  });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const {
          headerResponse: { status },
          payload: webinar
        } = await getWebinar({ urlParams: id });

        if (status === 200) {
          const mappedWebinar = mapWebinar(webinar);

          formikRef.current.setValues(mappedWebinar);

          setComments(mappedWebinar.comments);
        } else {
          throw new Error();
        }
      } catch (e) {
        history.push('/webinarsWeb');
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
            <Grid itemlg={8} md={8} sm={12}>
              <Box mt={2} mb={2}>
                <div className={classes.importantHeader}>
                  <ImportantIcon className={classes.importantIcon} />
                  <Typography
                    className={classes.importantTitle}
                    variant="subtitle1"
                    color="primary"
                  >
                    {comments?.length > 0
                      ? intl.formatMessage(messages.comments)
                      : intl.formatMessage(messages.importantTitle)}
                  </Typography>
                </div>
                {comments?.length > 0 ? (
                  comments.map((comment) => (
                    <div className={classes.commentContainer}>
                      <Typography
                        variant="subtitle2"
                        color="primary"
                        className={classes.commentDate}
                      >
                        {formatDate(new Date(comment.date), intl)},{' '}
                        {formatTime(comment.date, intl)}
                      </Typography>
                      <Typography variant="body2">{comment.text}</Typography>
                    </div>
                  ))
                ) : (
                  <Typography variant="body2">
                    {intl.formatMessage(messages.importantText)}
                  </Typography>
                )}
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

export { EditWebinar };
