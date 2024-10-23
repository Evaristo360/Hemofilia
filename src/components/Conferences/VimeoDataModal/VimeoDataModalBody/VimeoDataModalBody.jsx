import React from 'react';
import { Form } from '@octopy/react-form';
import PropTypes from 'prop-types';
import { useForm } from './hooks/useForm';
import { WebinarDetails } from 'components/WebinarDetails/WebinarDetails';

const VimeoDataModalBody = ({ webinar, formikRef, setWebinars }) => {
  const form = useForm({ webinar, setWebinars });

  return (
    <>
      <WebinarDetails webinar={webinar} showBody={false} />

      <Form formikRef={formikRef} showSubmitButton={false} {...form} />
    </>
  );
};

VimeoDataModalBody.propTypes = {
  webinar: PropTypes.object.isRequired
};

export { VimeoDataModalBody };
