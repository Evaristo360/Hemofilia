import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Typography } from '@material-ui/core';
import { messages } from './ApproveFormMessages';
import { useStyles } from './ApproveFormStyles';
import { formatMessage } from '@formatjs/intl';
import { Form } from '@octopy/react-form';
import * as formConfig from './config';
import { Images } from 'assets';

const ApproveForm = (props) => {
  const intl = useIntl();
  const classes = useStyles();
  const { actions, formikRef, buttonSubmitProps } = props;
  const getInitialValues = (initialValues) => ({
    id: '',
    plataform: '',
    iframe: '',
    comment: '',
    ...initialValues
  });

  const getFields = () => [
    {
      type: 'text',
      name: 'id',
      label: intl.formatMessage(messages.idEvent),
      placeholder: intl.formatMessage(messages.idEvent),
      breakpoints: { xs: 12, lg: 6 }
    },
    {
      type: 'radioGroup',
      name: 'plataform',
      row: true,
      options: [
        {
          name: 'youtube',
          label: <img src={Images.youtubeIcon} alt="youtube" />
        },
        {
          name: 'Vimeo',
          label: <img src={Images.vimeoIcon} alt="vimeo" />
        }
      ],
      radioProps: {
        color: 'primary'
      },
      breakpoints: { xs: 12, lg: 6 }
    },
    {
      type: 'textarea',
      name: 'iframe',
      label: intl.formatMessage(messages.iframe),
      placeholder: 'iframe',
      breakpoints: { xs: 12, lg: 6 }
    },
    {
      type: 'textarea',
      name: 'comment',
      label: intl.formatMessage(messages.comment),
      placeholder: intl.formatMessage(messages.comment),
      breakpoints: { xs: 12, lg: 6 }
    }
  ];
  const handleSubmit = async (formData) => {
    if (actions && actions.handleSubmit) actions.handleSubmit(formData);
  };

  return (
    <div>
      <Form
        initialValues={getInitialValues()}
        withInputBackground={true}
        fields={getFields()}
        formikRef={formikRef}
        showSubmitButton={false}
        handleSubmit={handleSubmit}
        withInputsBorder
        inputProps={formConfig.inputProps}
        buttonSubmitProps={formConfig.buttonSubmitProps}
      />
    </div>
  );
};

ApproveForm.propTypes = {};

export { ApproveForm };
