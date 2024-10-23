import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Box } from '@material-ui/core';
import { messages } from './QuotationMessages';
import { useStyles } from './QuotationFormStyles';
import { get, isEmpty, map, size } from 'lodash';
import { useApi } from 'hooks';
import * as Yup from 'yup';
import { Form, messages as formMessages } from '@octopy/react-form';
import * as formConfig from 'components/Form/config';
import { useDrawer } from 'components/Drawer';
import { useRootProvider } from 'components/RootProvider';

const QuotationForm = (props) => {
  const { item = {} } = props;
  const id = get(item, '_id', null);
  const isEdition = !!id;
  const classes = useStyles();
  const { formatMessage: f } = useIntl();
  const { handleCloseDrawer } = useDrawer();
  const [modules, setModules] = useState([]);
  const { handleChangeQuotations, rootState } = useRootProvider();
  const { quotations } = rootState;

  const [getModules] = useApi({
    endpoint: 'modules',
    method: 'get'
  });

  const getModulesList = async () => {
    const response = await getModules();

    const modules = get(response, 'payload.items', []);
    const enhancedModules = map(modules, ({ _id, name }) => ({
      _id,
      name
    }));

    setModules(enhancedModules);
  };

  useEffect(() => {
    getModulesList();
  }, []);

  const getInitialValues = (initialValues) => ({
    project_name: get(initialValues, 'project_name', ''),
    modules: isEdition ? get(initialValues, 'modules', []) : []
  });

  const getFields = () => [
    {
      type: 'text',
      name: 'project_name',
      label: f(messages.projectNameLabel),
      placeholder: f(messages.projectNamePlaceholder),
      breakpoints: { xs: 12 }
    },
    {
      type: 'multiselect',
      name: 'modules',
      label: f(messages.modulesLabel),
      placeholder: f(messages.modulesPlaceholder),
      breakpoints: { xs: 12 },
      multiple: true,
      options: modules,
      getOptionLabel: (option) => `${option.name || ''}`,
      getOptionSelected: (option, value) => option._id === value._id
    }
  ];

  const requiredFieldError = f(formMessages.requiredFieldError);

  const getValidationRules = () =>
    Yup.object({
      project_name: Yup.string().required(requiredFieldError),
      modules: Yup.array()
        .min(1, f(messages.pickOne))
        .of(
          Yup.object().shape({
            _id: Yup.string().required(),
            name: Yup.string().required()
          })
        )
        .required(f(messages.pickOne))
    });

  const [updateQuotations] = useApi({
    endpoint: 'quotations',
    method: 'patch'
  });

  const handleEdit = async (data) => {
    try {
      const response = await updateQuotations({
        urlParams: id,
        body: { ...data }
      });
      const updatedQuotation = get(response, 'payload', {});
      const updatedQuotationCopy = {
        ...updatedQuotation,
        modulesNumber: size(updatedQuotation.modules) || 0
      };

      const newQuotations = quotations.map((quotation) =>
        quotation._id === updatedQuotationCopy._id
          ? // eslint-disable-next-line no-param-reassign
            (quotation = updatedQuotationCopy)
          : quotation
      );

      handleChangeQuotations(newQuotations);
      handleCloseDrawer();
    } catch (error) {
      throw new Error(error);
    }
  };

  const [createQuotation] = useApi({
    endpoint: 'quotations',
    method: 'post'
  });

  const handleCreate = async (data) => {
    try {
      const response = await createQuotation({
        body: data
      });
      const createdQuotation = get(response, 'payload', {});
      const createdQuotationCopy = {
        ...createdQuotation,
        modulesNumber: size(createdQuotation.modules) || 0
      };

      const newQuotations = [...quotations, createdQuotationCopy];

      handleChangeQuotations(newQuotations);
      handleCloseDrawer();
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSubmit = (formData) => {
    const data = {
      ...formData,
      modules: formData.modules.map((t) => t._id)
    };

    if (isEdition) {
      handleEdit(data);
    } else {
      handleCreate(data);
    }
  };

  if (isEdition && isEmpty(item)) return null;

  return (
    <Box className={classes.containerForm}>
      <Form
        initialValues={getInitialValues(item)}
        validationRules={getValidationRules()}
        fields={getFields()}
        buttonSubmitLabel={f(messages.submitLabel)}
        handleSubmit={handleSubmit}
        withInputsBorder
        inputProps={formConfig.inputProps}
        buttonSubmitProps={formConfig.buttonSubmitProps}
      />
    </Box>
  );
};

QuotationForm.propTypes = {};

export { QuotationForm };
