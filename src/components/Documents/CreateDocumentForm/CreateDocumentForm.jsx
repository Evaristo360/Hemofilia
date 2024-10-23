import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import {
  Typography,
  Grid,
  Box,
  IconButton,
  TextField,
  Button,
  MenuItem
} from '@material-ui/core';
import { messages } from './CreateDocumentFormMessages';
import { useStyles } from './CreateDocumentFormStyles';
import CloseIcon from '@material-ui/icons/Close';
import { useModal } from '@octopy/react-modal';
import { useFormik } from 'formik';
import * as yup from 'yup';

const CreateDocumentForm = () => {
  const intl = useIntl();
  const classes = useStyles();
  const { handleCloseModal, handleOpenModal } = useModal();
  const validationSchema = yup.object({
    title: yup
      .string(intl.formatMessage(messages.title))
      .required(intl.formatMessage(messages.required)),
    specialty: yup
      .string(intl.formatMessage(messages.titleDescription))
      .required(intl.formatMessage(messages.required)),
    document: yup
      .string(intl.formatMessage(messages.titleDescription))
      .required(intl.formatMessage(messages.required))
  });

  const elementDocument = document.querySelector('files');

  if (elementDocument) {
    elementDocument.addEventListener('change', () => {
      // console.log('documento listo :D');
    });

    // console.log('hola', elementDocument);
  }
  // elementDocument.addEventListener('change', () => {
  //   console.log('documento listo :D');
  // });

  const formik = useFormik({
    initialValues: {
      title: '',
      specialty: '',
      document: ''
    },
    validationSchema,
    onSubmit: (values) => {}
  });

  const specialtyList = [
    {
      name: 'Hema',
      value: 'Hematologia'
    },
    {
      name: 'Cardeo',
      value: 'Cardeologia'
    }
  ];

  return (
    <div>
      <Box>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={() => handleCloseModal()}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="center" p={1}>
          <Typography color="primary" className={classes.titleModal}>
            {intl.formatMessage(messages.titleModal)}
          </Typography>
        </Box>
        <Box p={2} className={classes.boxEdit}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Typography className={classes.titleField}>
                  {intl.formatMessage(messages.title)}
                </Typography>
                <Typography className={classes.descriptionField}>
                  {intl.formatMessage(messages.titleModal)}
                </Typography>
                <TextField
                  id="title"
                  name="title"
                  placeholder={intl.formatMessage(messages.title)}
                  fullWidth
                  value={formik.values.title}
                  onChange={(e, value) => formik.handleChange(e, value)}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Typography className={classes.titleField}>
                  {intl.formatMessage(messages.specialty)}
                </Typography>
                <Typography className={classes.descriptionField}>
                  {intl.formatMessage(messages.specialtyDescription)}
                </Typography>
                <TextField
                  id="specialty"
                  name="specialty"
                  placeholder="Especialidad"
                  fullWidth
                  select
                  color="secondary"
                  value={formik.values.specialty}
                  onChange={(e, value) => formik.handleChange(e, value)}
                  error={
                    formik.touched.specialty && Boolean(formik.errors.specialty)
                  }
                  helperText={
                    formik.touched.specialty && formik.errors.specialty
                  }
                >
                  {specialtyList.map((item) => (
                    <MenuItem key={item.name} value={item.value}>
                      {item.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Typography className={classes.titleField}>
                  {intl.formatMessage(messages.document)}
                </Typography>
                <Typography className={classes.descriptionField}>
                  {intl.formatMessage(messages.titleModal)}
                </Typography>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  name="files"
                  id="files"
                />
                <label htmlFor="files">
                  <Button
                    fullWidth
                    size="large"
                    color="secondary"
                    variant="contained"
                    component="span"
                  >
                    {intl.formatMessage(messages.toChoose)}
                  </Button>
                </label>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={3}
                className={classes.boxSave}
              >
                <Button type="submit" size="large" color="secondary">
                  {intl.formatMessage(messages.save)}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </div>
  );
};

CreateDocumentForm.propTypes = {};

export { CreateDocumentForm };
