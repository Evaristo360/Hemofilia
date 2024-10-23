/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { Card, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { Form, messages as formMessages } from '@octopy/react-form';
import { useModal } from '@octopy/react-modal';
import { Images } from '../../assets';
import * as formConfig from './config';
import { useStyles } from './FormStyles';

const FormExample = (props) => {
  const { actions, buttonSubmitProps } = props;

  const intl = useIntl();
  const classes = useStyles();
  const { email } = useParams();
  const { handleOpenModal } = useModal();

  const getInitialValues = (initialValues) => ({
    name: 'Armando Albor',
    email: email,
    password: '',
    ...initialValues
  });

  const getFields = () => [
    {
      type: 'text',
      name: 'name',
      label: 'Nombre',
      placeholder: 'Escribe tu nombre',
      breakpoints: { xs: 12 }
    },
    {
      type: 'text',
      name: 'email',
      label: intl.formatMessage(formMessages.emailLabel),
      placeholder: intl.formatMessage(formMessages.emailPlaceholder),
      breakpoints: formConfig.fieldBreakpoints
    },
    {
      type: 'password',
      name: 'password',
      label: intl.formatMessage(formMessages.passwordLabel),
      placeholder: intl.formatMessage(formMessages.passwordPlaceholder),
      breakpoints: formConfig.fieldBreakpoints
    },
    {
      type: 'text',
      name: 'email1',
      label: intl.formatMessage(formMessages.emailLabel),
      placeholder: intl.formatMessage(formMessages.emailPlaceholder),
      breakpoints: formConfig.fieldBreakpoints
    },
    {
      type: 'password',
      name: 'password',
      label: intl.formatMessage(formMessages.passwordLabel),
      placeholder: intl.formatMessage(formMessages.passwordPlaceholder),
      breakpoints: formConfig.fieldBreakpoints
    },
    {
      type: 'text',
      name: 'email2',
      label: intl.formatMessage(formMessages.emailLabel),
      placeholder: intl.formatMessage(formMessages.emailPlaceholder),
      breakpoints: formConfig.fieldBreakpoints
    }
  ];

  const requiredFieldError = intl.formatMessage(
    formMessages.requiredFieldError
  );

  const invalidEmailError = intl.formatMessage(formMessages.invalidEmailError);

  const getValidationRules = () =>
    Yup.object({
      email: Yup.string().email(invalidEmailError).required(requiredFieldError),
      password: Yup.string().required(requiredFieldError)
    });

  const handleSubmit = async (formData) => {
    if (actions && actions.handleSubmit) actions.handleSubmit(formData);
  };

  return (
    <div className={classes.container}>
      <Card className={classes.containerForm}>
        <Form
          initialValues={getInitialValues()}
          validationRules={getValidationRules()}
          fields={getFields()}
          buttonSubmitLabel={'Enviar'}
          handleSubmit={handleSubmit}
          withInputsBorder
          inputProps={formConfig.inputProps}
          buttonSubmitProps={formConfig.buttonSubmitProps}
          // error={'Usuario o contraseña inválido'}
          // disableSubmitOnFormInvalid
        />
      </Card>
    </div>
  );
};

FormExample.propTypes = {};

export { FormExample };
