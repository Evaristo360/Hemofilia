import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button, Typography } from '@material-ui/core';
import { messages } from './UserDrawerMessages';
import { useStyles } from './UserDrawerStyles';
import { Form } from '@octopy/react-form';
import {
  useFields,
  useInitialValues,
  useInputProps,
  useSections,
  useValidationRules
} from './helpers';
import { useRef } from 'react';

const UserDrawer = () => {
  const intl = useIntl();
  const classes = useStyles();
  const formikRef = useRef();

  const initialValues = useInitialValues();
  const fields = useFields();
  const validationRules = useValidationRules();
  const inputProps = useInputProps();
  const sections = useSections();

  return (
    <div className={classes.container}>
      <Form
        formikRef={formikRef}
        withInputsBorder
        initialValues={initialValues}
        fields={fields}
        validationRules={validationRules}
        inputProps={inputProps}
        showSubmitButton={false}
        sections={sections}
        handleSubmit={(values) => console.log(values)}
      />
      <Button onClick={() => formikRef.current.submitForm()}>Aceptar</Button>
    </div>
  );
};

UserDrawer.propTypes = {};

export { UserDrawer };
