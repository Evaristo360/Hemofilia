/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import {
  Typography,
  Grid,
  Box,
  Card,
  CardHeader,
  CardContent,
  Button,
  Link
} from '@material-ui/core';
import { messages } from './ProfileUpdateMessages';
import { useStyles } from './ProfileUpdateStyles';
import { useApi } from 'hooks';
import { ProfileIcons } from 'assets';
import { ChangePassword } from './ChangePassword';
import { ChangeImage } from '../ChangeImage';
import { renderTextField } from '@octopy/react-form';
import { get } from 'lodash';
import { useFormik } from 'formik';
import { useProfile } from './useProfile';
import { uploadFile } from '@octopy/react-aws-utils';
import { useLoader } from '@octopy/react-loader';
import { Alert, useModal } from '@octopy/react-modal';
import { useRootProvider } from 'components/RootProvider';
import { useAuth } from '@octopy/react-auth';

const ProfileUpdate = () => {
  const { rootState } = useRootProvider();
  const session = get(rootState, 'session', {});
  const { profileMyAccount } = ProfileIcons;
  const { formatMessage: f } = useIntl();
  const { getValidationRules, initialValues, fieldsForm } = useProfile();
  const classes = useStyles();
  const { handleShowLoader } = useLoader();
  const { handleCloseModal, handleOpenModal } = useModal();
  const [urlAvatar, setUrlAvatar] = useState('');
  const { actions: authActions } = useAuth();
  const formik = useFormik({
    initialValues,
    validationSchema: getValidationRules(),
    onSubmit: (values) => handleSubmit(values)
  });

  const handleSubmit = (values) => {
    handleShowLoader(true);
    let body = {
      name: values.name,
      phone: values.phone,
      clinic: values.clinic,
      avatar: urlAvatar
    };

    if (values.avatar && values.avatar.file) {
      uploadFile({
        file: values.avatar.file,
        onError: () => {
          handleOpenModal({
            configProps: {
              maxWidth: 'sm'
            },
            body: <Alert message={f(messages.uploadFileError)} />
          });
          handleShowLoader(false);
        },
        onSuccess: (fileUrl) => {
          body.avatar = fileUrl;
          handleUpdateData(body);
        }
      });
    } else {
      handleUpdateData(body);
    }
  };

  const [getUser] = useApi({
    endpoint: `doctor/web/get`,
    method: 'get'
  });

  const getUserData = async () => {
    const response = await getUser();

    const user = get(response, 'payload[0]', []);

    formik.setValues({ ...user, avatar: { url: user.avatar } });

    setUrlAvatar(user.avatar);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const [updateData] = useApi({
    endpoint: 'doctor/web/update',
    method: 'put'
  });

  const handleUpdateData = async (data) => {
    try {
      const response = await updateData({
        body: data
      });
      const user = get(response, 'payload', []);
      const headerResponse = get(response, 'headerResponse', {});

      if (headerResponse.status == 200) {
        let newData = { ...session };
        let userData = newData.user;
        let accountData = {
          ...userData,
          name: user.name,
          phone: user.phone,
          clinic: user.clinic,
          avatar: user.avatar
        };

        newData.user = accountData;
        window.localStorage.setItem('session', JSON.stringify(newData));
        window.location.reload();
      } else {
        handleShowLoader(false);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const [unsuscribeUser] = useApi({
    endpoint: `doctor/web/unsuscribe`,
    method: 'post'
  });

  const handleUnsuscribeUser = async () => {
    handleCloseModal();
    const response = await unsuscribeUser();
    const headerResponse = get(response, 'headerResponse', {});

    if (headerResponse.status == 200) {
      authActions.logout();
    }
  };

  const handleAskUnsuscribeUser = () => {
    handleOpenModal({
      configProps: {
        maxWidth: 'sm'
      },
      body: (
        <Grid container direction="column">
          <Grid item className={classes.gridItem}>
            <Typography variant="h6" color="primary">
              {f(messages.questionDeleteAccount)}
            </Typography>
            <Typography variant="h7">
              {f(messages.textDeleteAccount)}
            </Typography>
          </Grid>
          <Grid item className={classes.containerButtons}>
            <Button
              color="secondary"
              className={classes.deleteButton}
              onClick={() => handleCloseModal()}
            >
              {f(messages.cancelDeleteAccount)}
            </Button>
            <Button
              color="primary"
              className={classes.deleteButton}
              onClick={handleUnsuscribeUser}
            >
              {f(messages.acceptDeleteAccount)}
            </Button>
          </Grid>
        </Grid>
      )
    });
  };

  const fieldsMapper = (field, index) => (
    <Grid item {...field.breakpoints}>
      {field.type === 'text' && renderTextField({ index, formik, field })}
    </Grid>
  );

  return (
    <Box className={classes.mainContainer}>
      <Grid container spacing={2} style={{ height: '100%' }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          className={`${classes.gridItem}`}
        >
          <Card className={classes.cardContainer}>
            <CardHeader
              avatar={
                <img
                  src={profileMyAccount}
                  alt={'MyAccount-Icon'}
                  style={{ marginRight: '-8px' }}
                />
              }
              title={
                <Typography variant="h4" color="primary">
                  {f(messages.myAccount)}
                </Typography>
              }
            />
            <CardContent>
              <Typography
                variant="h7"
                color="primary"
                display="block"
                className={classes.labelText}
              >
                {f(messages.myAccountText)}
              </Typography>
              <Box>
                <Grid container spacing={2}>
                  {fieldsForm.map(fieldsMapper)}
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={12}
          lg={6}
          className={classes.gridItem}
        >
          <Grid item lg={12} md={12} xs={12} className={`${classes.itemFirst}`}>
            <ChangePassword />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
            className={`${classes.itemSecond}`}
          >
            <ChangeImage formik={formik} />
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Typography
            variant="h7"
            color="primary"
            display="block"
            className={classes.deleteTitle}
          >
            {f(messages.deleteAccountTittle)}
          </Typography>
          <Typography
            variant="h7"
            className={classes.primaryText}
            display="block"
          >
            {f(messages.deleteAccountText)}
            <Link
              component="button"
              variant="body2"
              onClick={handleAskUnsuscribeUser}
              className={classes.linkButton}
            >
              {f(messages.deleteAccountLink)}
            </Link>
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={12}
          lg={6}
          direction="row-reverse"
        >
          <Button
            color="primary"
            size="large"
            onClick={() => formik.submitForm()}
          >
            {f(messages.saveButton)}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileUpdate;
