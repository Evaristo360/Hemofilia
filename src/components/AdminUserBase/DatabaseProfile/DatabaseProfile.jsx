/* eslint-disable no-param-reassign */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import {
  Typography,
  Card,
  Avatar,
  Grid,
  Button,
  IconButton
} from '@material-ui/core';
import {
  VideoLibrary,
  ChromeReaderMode,
  Star,
  Close
} from '@material-ui/icons';
import { Form, messages as formMessages } from '@octopy/react-form';
import { useModal } from '@octopy/react-modal';
import * as Yup from 'yup';
import { Avatares } from '../../../assets';
import { messages } from './DatabaseProfileMessages';
import { useStyles } from './DatabaseProfileStyles';
import { useApi } from 'hooks';
import { get } from 'lodash';
import moment from 'moment';

const DatabaseProfile = (props) => {
  const { background, item = {} } = props;
  const intl = useIntl();
  const { formatMessage: f } = useIntl();
  const formikRef = useRef();
  const classes = useStyles({ background });
  const { handleCloseModal, handleOpenModal } = useModal();
  const requiredFieldError = f(formMessages.requiredFieldError);
  const [doctorData, setDoctorData] = useState({});
  const [lastLogin, setLastLogin] = useState('');
  const [lastComment, setLastComment] = useState('');

  const [getDoctor] = useApi({
    endpoint: `doctor/dashboard/get/${item}`,
    method: 'get'
  });

  const getDoctorData = async () => {
    const response = await getDoctor();
    const doctorResponse = get(response, 'payload', []);

    if (doctorResponse.comments.length > 0) {
      let last = doctorResponse.comments.length - 1;
      let lastDate = doctorResponse.comments[last].date;

      setLastLogin(moment(lastDate).format('DD/MM/YYYY'));
      setLastComment(doctorResponse.comments[last].comment);
    }

    doctorResponse.last_login = doctorResponse.last_login
      ? moment(doctorResponse.last_login).format('DD/MM/YYYY')
      : '';
    setDoctorData(doctorResponse);
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  const getInitialValues = () => ({
    comment: ''
  });

  const getValidationRules = () =>
    Yup.object({
      comment: Yup.string().required(requiredFieldError)
    });

  const getFields = () => [
    {
      type: 'text',
      name: 'comment',
      label: intl.formatMessage(messages.placeholderModal),
      placeholder: intl.formatMessage(messages.placeholderModal),
      breakpoints: { xs: 12 }
    }
  ];

  const [changeStatus] = useApi({
    endpoint: `doctor/dashboard/enable-account/${item}`,
    method: 'post'
  });

  const handleStatus = async (data = {}) => {
    data.enable = !doctorData.enabled;
    try {
      const response = await changeStatus({
        body: data
      });

      await getDoctorData();
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSubmit = (values) => {
    handleStatus(values);
    handleCloseModal();
  };

  return (
    <div className={classes.container}>
      <Card className={classes.rootCard}>
        <Grid container spacing={3}>
          <Grid
            item
            lg={2}
            md={3}
            sm={12}
            xs={12}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Avatar
              className={classes.avatar}
              src={doctorData.avatar}
              alt="avatar"
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Typography className={classes.titleSpecialty}>
              {doctorData.speciality}
            </Typography>
            <Typography className={classes.name}>{item.name}</Typography>
            <Typography className={classes.telephoneNumber}>
              {doctorData.phone}
            </Typography>
            <Typography className={classes.textInformation}>
              {doctorData.email} <br />
              {doctorData.createdAt} <br />
              {doctorData.state}
            </Typography>
            <Typography className={classes.lastIncome}>
              {intl.formatMessage(messages.lastIncome)}
            </Typography>
            <Typography className={classes.textInformation}>
              {doctorData.last_login}
            </Typography>

            <Grid className={classes.responsiveButton}>
              {doctorData.enabled ? (
                <Button
                  className={classes.button}
                  onClick={() =>
                    handleOpenModal({
                      body: (
                        <Grid className={classes.contentForm}>
                          <Grid className={classes.contentIcon}>
                            <IconButton onClick={() => handleCloseModal()}>
                              <Close className={classes.iconClose} />
                            </IconButton>
                          </Grid>
                          <Grid
                            style={{ textAlign: 'center', marginBottom: 20 }}
                          >
                            <Typography className={classes.commentModal}>
                              {intl.formatMessage(messages.comment)}
                            </Typography>
                            <Typography className={classes.commentInfoModal}>
                              {intl.formatMessage(messages.commentInfo)}
                            </Typography>
                          </Grid>
                          <Form
                            initialValues={getInitialValues()}
                            validationRules={getValidationRules()}
                            fields={getFields()}
                            showSubmitButton={false}
                            formikRef={formikRef}
                            handleSubmit={handleSubmit}
                            withInputsBorder
                            inputProps={{
                              type: 'filled',
                              fullWidth: true,
                              rows: 5,
                              multiline: true
                            }}
                          />

                          <Button
                            className={classes.button}
                            onClick={() => formikRef.current.submitForm()}
                          >
                            {intl.formatMessage(messages.toDisable)}
                          </Button>
                        </Grid>
                      )
                    })
                  }
                >
                  {intl.formatMessage(messages.toDisable)}
                </Button>
              ) : (
                <Button
                  className={classes.button}
                  onClick={() => handleStatus({ comment: 'Habilitado' })}
                >
                  {intl.formatMessage(messages.enable)}
                </Button>
              )}
            </Grid>
          </Grid>
          <Grid item lg={7} md={6} sm={12} xs={12}>
            <Grid
              container
              spacing={2}
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Grid item>
                <Card className={classes.rootCardProfile}>
                  <Typography className={classes.titleCardProfile}>
                    {intl.formatMessage(messages.attendedConferences)}
                  </Typography>
                  <Typography className={classes.statisticsNumber}>
                    {doctorData.webinar_attended}
                  </Typography>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.rootCardProfile}>
                  <Typography className={classes.titleCardProfile}>
                    {intl.formatMessage(messages.lecturesGiven)}
                  </Typography>
                  <Typography className={classes.statisticsNumber}>
                    {doctorData.webinar_given}
                  </Typography>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.rootCardProfile}>
                  <Typography className={classes.titleCardProfile}>
                    {intl.formatMessage(messages.qualifiedContent)}
                  </Typography>
                  <Grid container className={classes.contentQualified}>
                    <Grid item style={{ display: 'flex' }}>
                      <ChromeReaderMode className={classes.iconQualified} />
                      &nbsp;
                      <Grid>
                        <Typography className={classes.statisticsNumber}>
                          {doctorData.document_count}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item style={{ display: 'flex' }}>
                      <VideoLibrary className={classes.iconQualified} /> &nbsp;
                      <Grid>
                        <Typography className={classes.statisticsNumber}>
                          {doctorData.video_count}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item style={{ display: 'flex' }}>
                      <Star className={classes.iconQualified} /> &nbsp;
                      <Grid>
                        <Typography className={classes.statisticsNumber}>
                          {doctorData.content_vote_average}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.rootCardBackground}>
                  <Typography className={classes.titleCardProfile}>
                    {intl.formatMessage(messages.conferencesAuthorized)}
                  </Typography>
                  <Typography className={classes.numberAuthorized}>
                    {doctorData.webinar_pending}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {!doctorData.enabled && (
          <>
            <Grid className={classes.contentComentaries} container>
              <Grid item lg={2}>
                <Grid className={classes.contentText}>
                  <Typography className={classes.titleComentaries}>
                    {intl.formatMessage(messages.comentaries)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item lg={10}>
                <Typography className={classes.text}>{lastComment}</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item lg={2}>
                <Grid className={classes.contentText}>
                  <Typography className={classes.text}>
                    {intl.formatMessage(messages.disabled)} &nbsp; {lastLogin}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item lg={10}></Grid>
            </Grid>
          </>
        )}
      </Card>
    </div>
  );
};

DatabaseProfile.propTypes = {};

export { DatabaseProfile };
