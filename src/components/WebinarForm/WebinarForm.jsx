/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { messages } from './WebinarFormMessages';
import { useStyles } from './WebinarFormStyles';
import { Alert, useModal } from '@octopy/react-modal';
import { useFormik } from 'formik';
import { useValidationSchema } from './hooks/useValidationSchema';
import { useFields } from './hooks/useFields';
import {
  renderDatePicker,
  renderTimePicker,
  renderImagePicker,
  renderRadioGroup,
  renderTextField
} from '@octopy/react-form';
import { mapValues } from './helpers';
import { uploadFile } from '@octopy/react-aws-utils';
import { useLoader } from '@octopy/react-loader';

const defaultInitialValues = {
  image: null,
  theme: '',
  date: null,
  startTime: null,
  endTime: null,
  description: '',
  comment: ''
};

const WebinarForm = ({
  initialValues = defaultInitialValues,
  formikRef,
  onSubmit,
  withComment = false
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const theme = useTheme();
  const { handleShowLoader } = useLoader();
  const { handleOpenModal } = useModal();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { imageFields, dataFields } = useFields({ withComment });

  const handleSubmit = (values) => {
    handleShowLoader(true);

    if (values.image.file) {
      uploadFile({
        file: values.image.file,
        onError: () => {
          handleOpenModal({
            configProps: {
              maxWidth: 'sm'
            },
            body: (
              <Alert message={intl.formatMessage(messages.uploadFileError)} />
            )
          });

          handleShowLoader(false);
        },
        onSuccess: (fileUrl) => {
          handleShowLoader(false);

          const mappedValues = mapValues(
            {
              ...values,
              imageUrl: fileUrl
            },
            withComment
          );

          onSubmit(mappedValues);
        }
      });
    } else {
      const mappedValues = mapValues(
        {
          ...values,
          imageUrl: values.image.url
        },
        withComment
      );

      onSubmit(mappedValues);
    }
  };

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      ...(withComment ? { comment: '' } : {})
    },
    validationSchema: useValidationSchema({ withComment, formikRef }),
    onSubmit: handleSubmit
  });

  useEffect(() => {
    const values = formik.values;

    if (values.date && values.startTime) {
      formik.setFieldValue(
        'date',
        new Date(
          `${formik.values.date.toDateString()} ${formik.values.startTime.toTimeString()}`
        )
      );
    }
  }, [formik.values.startTime]);

  useEffect(() => (formikRef.current = formik), [formik]);

  const fieldsMapper = (field, index) => (
    <Grid key={`field-${field.name}-${index}`} item {...field.breakpoints}>
      {['text', 'textarea'].includes(field.type) &&
        renderTextField({ index, formik, field })}

      {field.type === 'radioGroup' &&
        renderRadioGroup({ index, formik, field })}

      {field.type === 'image' && renderImagePicker({ index, formik, field })}

      {field.type === 'datePicker' &&
        renderDatePicker({ index, formik, field })}

      {field.type === 'timePicker' &&
        renderTimePicker({ index, formik, field })}
    </Grid>
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box mt={smDown ? 2 : 3} className={classes.container}>
        <Grid container>
          <Grid item lg={3} md={4} sm={12}>
            <Typography
              variant="subtitle2"
              color="primary"
              className={classes.imageDescription}
            >
              {intl.formatMessage(messages.imageDescription)}
            </Typography>
            {imageFields.map(fieldsMapper)}
          </Grid>
          <Grid
            className={classes.dataContainer}
            item
            lg={8}
            md={8}
            sm={12}
            container
            spacing={1}
          >
            {dataFields.map(fieldsMapper)}
          </Grid>
        </Grid>
      </Box>
    </MuiPickersUtilsProvider>
  );
};

export { WebinarForm };
