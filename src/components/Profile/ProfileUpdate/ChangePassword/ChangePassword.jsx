import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button
} from '@material-ui/core';
import { messages } from './ChangePasswordMessages';
import { useStyles } from './ChangePasswordStyles';
import { ProfileIcons } from 'assets';
import * as Yup from 'yup';
import { Form, messages as formMessages } from '@octopy/react-form';
import { useApi } from 'hooks';

const ChangePassword = () => {
  const { profileChangePassword } = ProfileIcons;
  const { formatMessage: f } = useIntl();
  const classes = useStyles();
  const formikRef = useRef();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#,.:;/])[A-Za-z\d@$!%*?&#,.:;/]{8,}$/;
  const invalidPasswordError = f(formMessages.passwordNoMatchesError);

  const getValidationRules = () =>
    Yup.object().shape({
      currentPassword: Yup.string().required(
        f(formMessages.requiredFieldError)
      ),
      newPassword: Yup.string()
        .required(f(formMessages.requiredFieldError))
        .matches(passwordRegex, {
          message: f(messages.passwordNotMatchRegex),
          excludeEmptyString: true
        }),
      confirmPassword: Yup.string()
        .required(f(formMessages.requiredFieldError))
        .oneOf([Yup.ref('newPassword'), null], invalidPasswordError)
    });

  const getInitialValues = () => ({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const getFields = () => [
    {
      type: 'password',
      name: 'currentPassword',
      label: f(formMessages.currentPasswordLabel),
      breakpoints: { xs: 12 }
    },
    {
      type: 'password',
      name: 'newPassword',
      label: f(formMessages.newPasswordLabel),
      breakpoints: { xs: 12 }
    },
    {
      type: 'password',
      name: 'confirmPassword',
      label: f(formMessages.newPasswordConfirmLabel),
      breakpoints: { xs: 12 }
    }
  ];

  const handleSubmit = (values) => {
    const body = {
      password: values.newPassword
    };

    handleChangePassword(body);
  };

  const [changePassword] = useApi({
    endpoint: 'auth/change-password',
    method: 'post'
  });

  const handleChangePassword = async (data) => {
    try {
      const response = await changePassword({
        body: data
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Card className={classes.cardContainer}>
      <CardHeader
        avatar={
          <img
            src={profileChangePassword}
            alt={'ChangePassword-Icon'}
            style={{ marginRight: '-8px' }}
          />
        }
        title={
          <Typography variant="h4" color="primary">
            {f(messages.title)}
          </Typography>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8} lg={8}>
            <Form
              initialValues={getInitialValues()}
              validationRules={getValidationRules()}
              fields={getFields()}
              showSubmitButton={false}
              formikRef={formikRef}
              handleSubmit={handleSubmit}
              withInputsBorder
              inputProps={{
                variant: 'filled',
                fullWidth: true
              }}
            />
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={4}
            md={4}
            lg={4}
            className={classes.buttonContainer}
          >
            <Button
              color="primary"
              size="large"
              style={{ margin: '5px 0px' }}
              onClick={() => formikRef.current.submitForm()}
            >
              {f(messages.changeButton)}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export { ChangePassword };
