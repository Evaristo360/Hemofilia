/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { renderTextField } from '@octopy/react-form';
import { useForm } from './hooks/useForm';
import { WebinarDetails } from 'components/WebinarDetails/WebinarDetails';

const WebinarDetailsModalBody = ({ webinar, formikRef, setWebinars }) => {
  const { formik, fields } = useForm({ setWebinars, webinar });

  useEffect(() => {
    formikRef.current = formik;
  }, []);

  return (
    <>
      <WebinarDetails webinar={webinar} />

      <Box py={2}>
        {fields.map((field, index) =>
          renderTextField({ index, field, formik })
        )}
      </Box>
    </>
  );
};

WebinarDetailsModalBody.propTypes = {
  webinar: PropTypes.object.isRequired
};

export { WebinarDetailsModalBody };
