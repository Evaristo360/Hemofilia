import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { useIntl } from 'react-intl';
import { Form, messages as formMessages } from '@octopy/react-form';
import { useModal } from '@octopy/react-modal';
import { Typography, Button } from '@material-ui/core';
import { messages } from './UploadVideosMessages';
import { useStyles } from './UploadVideosStyles';
import * as Yup from 'yup';
import UploadIcon from '@material-ui/icons/PublishRounded';
import { uploadFile } from '@octopy/react-aws-utils';
import { useLoader } from '@octopy/react-loader';

const UploadVideos = (props) => {
  const { handleShowLoader } = useLoader();
  const intl = useIntl();
  const { formatMessage: f } = useIntl();
  const classes = useStyles();
  const formikRef = useRef();
  const { item = {}, specialtyList = [], onSubmit } = props;
  const { handleCloseModal } = useModal();
  const id = get(item, '_id', null);
  const isEdition = !!id;
  const requiredFieldError = f(formMessages.requiredFieldError);

  const getInitialValues = (initialValues) => {
    const values = {
      title: get(initialValues, 'title', ''),
      specialty: get(initialValues, 'speciality', ''),
      description: get(initialValues, 'description', ''),
      global: get(initialValues, 'global', false),
      image: initialValues?.image
        ? {
            url: get(initialValues, 'image', '')
          }
        : ''
    };

    if (isEdition) return values;

    return { ...values };
  };

  const getValidationRules = () => {
    const rules = {
      title: Yup.string()
        .min(5, f(messages.minCharacters))
        .max(150, f(messages.maxCharacters))
        .required(requiredFieldError),
      specialty: Yup.string().required(requiredFieldError),
      global: Yup.boolean(),
      description: Yup.string()
        .min(5, f(messages.minCharacters))
        .max(150, f(messages.maxCharacters))
        .required(requiredFieldError),
      image: Yup.object()
        .nullable(true)
        .required(requiredFieldError)
    };

    if (isEdition) return Yup.object(rules);

    return Yup.object({
      ...rules
    });
  };

  const sections = () => {
    const auxSectionsList = [
      {
        name: 'title',
        title: {
          text: (
            <Typography className={classes.title}>
              {intl.formatMessage(messages.title)}
            </Typography>
          )
        },
        description: {
          text: intl.formatMessage(messages.titleDescription)
        },
        editable: true
      },
      {
        name: 'specialty',
        title: {
          text: (
            <Typography className={classes.title}>
              {intl.formatMessage(messages.specialty)}
            </Typography>
          )
        },
        description: {
          text: intl.formatMessage(messages.specialtyDescription)
        },
        editable: !isEdition
      },
      {
        name: 'global',
        editable: !isEdition
      },
      {
        name: 'description',
        title: {
          text: (
            <Typography className={classes.title}>
              {intl.formatMessage(messages.description)}
            </Typography>
          )
        },
        editable: true
      },
      {
        name: 'image',
        title: {
          text: (
            <Typography className={classes.title}>
              {intl.formatMessage(messages.image)}
            </Typography>
          )
        },
        description: {
          text: intl.formatMessage(messages.imageDecription)
        },
        editable: true
      }
    ];

    const sectionsList = auxSectionsList.map((item) => {
      if (item.editable) return item;

      return {};
    });

    return sectionsList;
  };

  const getFields = () => [
    {
      section: 'title',
      type: 'text',
      name: 'title',
      label: intl.formatMessage(messages.title),
      placeholder: intl.formatMessage(messages.title),
      breakpoints: { xs: 12, lg: 12 }
    },
    {
      section: 'specialty',
      type: 'select',
      name: 'specialty',
      label: intl.formatMessage(messages.specialty),
      placeholder: intl.formatMessage(messages.specialty),
      options: specialtyList,
      breakpoints: { xs: 12, lg: 12 }
    },
    {
      section: 'global',
      type: 'checkbox',
      name: 'global',
      label: intl.formatMessage(messages.globalDocument),
      breakpoints: { xs: 12, lg: 12 }
    },
    {
      section: 'description',
      type: 'textarea',
      name: 'description',
      label: intl.formatMessage(messages.description),
      placeholder: intl.formatMessage(messages.description),
      breakpoints: { xs: 12, lg: 12 }
    },
    {
      section: 'image',
      type: 'image',
      name: 'image',
      label: intl.formatMessage(messages.image),
      placeholder: intl.formatMessage(messages.image),
      icon: UploadIcon,
      multiple: false,
      breakpoints: { xs: 12, lg: 12 }
    }
  ];

  const handleSubmit = (values) => {
    const specialty_id = specialtyList.find(
      (item) => item.name === values.specialty
    );

    handleCloseModal();
    handleShowLoader(true);
    if (values.image.file) {
      uploadFile({
        file: values.image.file,
        onError: (error) => {
          handleShowLoader(false);
        },
        onSuccess: async (fileUrl) => {
          onSubmit(
            {
              title: values.title,
              speciality: specialty_id.label,
              global: values.global,
              image: fileUrl,
              description: values.description
            },
            item?._id
          );
        }
      });
    } else {
      onSubmit(
        {
          title: values.title,
          speciality: specialty_id.label,
          global: values.global,
          image: values.image.url,
          description: values.description
        },
        item._id
      );
    }
  };

  return (
    <div className={classes.contentForm}>
      <Form
        initialValues={getInitialValues(item)}
        validationRules={getValidationRules()}
        fields={getFields()}
        showSubmitButton={false}
        formikRef={formikRef}
        handleSubmit={handleSubmit}
        sections={sections()}
      />
      <Button
        fullWidth
        className={classes.button}
        onClick={() => formikRef.current.submitForm()}
      >
        {intl.formatMessage(messages.save)}
      </Button>
    </div>
  );
};

UploadVideos.propTypes = {};

export { UploadVideos };
