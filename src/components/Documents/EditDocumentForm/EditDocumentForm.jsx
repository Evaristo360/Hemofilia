import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import {
  Typography,
  MenuItem,
  Box,
  Grid,
  Button,
  IconButton,
  TextField
} from '@material-ui/core';
import { messages } from './EditDocumentFormMessages';
import { useStyles } from './EditDocumentFormStyles';
import CloseIcon from '@material-ui/icons/Close';
import { useModal } from '@octopy/react-modal';
import { useFormik } from 'formik';
import * as yup from 'yup';

const EditDocumentForm = () => {
  const intl = useIntl();
  const classes = useStyles();
  const { handleCloseModal, handleOpenModal } = useModal();
  const validationSchema = yup.object({
    title: yup
      .string(intl.formatMessage(messages.title))
      .required(intl.formatMessage(messages.required)),
    specialty: yup
      .string(intl.formatMessage(messages.titleDescription))
      .required(intl.formatMessage(messages.required))
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      specialty: ''
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
      <Box className={classes.boxForm}>
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
              <Grid item lg={4}>
                <Typography className={classes.titleField}>
                  {intl.formatMessage(messages.title)}
                </Typography>
                <Typography className={classes.descriptionField}>
                  {intl.formatMessage(messages.titleModal)}
                </Typography>
                <TextField
                  id="title"
                  name="title"
                  placeholder="titulo"
                  fullWidth
                  value={formik.values.title}
                  onChange={(e, value) => formik.handleChange(e, value)}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item lg={4}>
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
              <Grid item lg={4} className={classes.boxSave}>
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

EditDocumentForm.propTypes = {};

export { EditDocumentForm };
