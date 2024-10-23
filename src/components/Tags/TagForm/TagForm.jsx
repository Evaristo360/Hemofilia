import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { useStyles } from './TagFormStyles';
import { Form, messages as formMessages } from '@octopy/react-form';
import * as formConfig from 'components/Form/config';
import * as Yup from 'yup';
import { useApi } from 'hooks';
import { useRootProvider } from 'components/RootProvider';
import { useDrawer } from 'components/Drawer';

const TagForm = (props) => {
  const { item = {} } = props;
  const id = get(item, '_id', null);
  const isEdition = !!id;
  const classes = useStyles();
  const { formatMessage: f } = useIntl();
  const { handleCloseDrawer } = useDrawer();
  const { handleChangeTags, rootState } = useRootProvider();
  const { tags } = rootState;

  const getInitialValues = (initialValues) => ({
    name: initialValues.name
  });

  const getFields = () => [
    {
      type: 'text',
      name: 'name',
      label: f(formMessages.nameLabel),
      placeholder: f(formMessages.namePlaceholder),
      breakpoints: { xs: 12 }
    }
  ];

  const requiredFieldError = f(formMessages.requiredFieldError);

  const getValidationRules = () =>
    Yup.object({
      name: Yup.string().required(requiredFieldError)
    });

  const [updateTag] = useApi({
    endpoint: 'tags',
    method: 'patch'
  });

  const handleEdit = async (data) => {
    try {
      const response = await updateTag({
        urlParams: id,
        body: data
      });
      const updatedTag = get(response, 'payload', {});
      const newTags = tags.map(
        // eslint-disable-next-line no-param-reassign
        (t) => (t._id === updatedTag._id ? (t = updatedTag) : t)
      );

      handleChangeTags(newTags);
      handleCloseDrawer();
    } catch (error) {
      throw new Error(error);
    }
  };

  const [createTag] = useApi({
    endpoint: 'tags',
    method: 'post'
  });

  const handleCreate = async (data) => {
    try {
      const response = await createTag({
        body: data
      });

      const newTag = get(response, 'payload', {});
      const newTags = [...tags, newTag];

      handleChangeTags(newTags);
      handleCloseDrawer();
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSubmit = (formData) => {
    if (isEdition) {
      handleEdit(formData);
    } else {
      handleCreate(formData);
    }
  };

  return (
    <Box className={classes.containerForm}>
      <Form
        initialValues={getInitialValues(item)}
        validationRules={getValidationRules()}
        fields={getFields()}
        buttonSubmitLabel={'Enviar'}
        handleSubmit={handleSubmit}
        withInputsBorder
        inputProps={formConfig.inputProps}
        buttonSubmitProps={formConfig.buttonSubmitProps}
        disableSubmitOnFormInvalid
      />
    </Box>
  );
};

TagForm.propTypes = {};

export { TagForm };
