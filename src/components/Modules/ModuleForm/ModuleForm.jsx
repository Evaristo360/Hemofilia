import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Box } from '@material-ui/core';
import { messages } from './ModuleFormMessages';
import { useStyles } from './ModuleFormStyles';
import { get, isEmpty, map, size } from 'lodash';
import { useApi } from 'hooks';
import * as Yup from 'yup';
import { Form, messages as formMessages } from '@octopy/react-form';
import * as formConfig from 'components/Form/config';
import { useDrawer } from 'components/Drawer';
import { useRootProvider } from 'components/RootProvider';

const ModuleForm = (props) => {
  const { item = {} } = props;
  const id = get(item, '_id', null);
  const isEdition = !!id;
  const classes = useStyles();
  const { formatMessage: f } = useIntl();
  const [tags, setTags] = useState([]);
  const [tasks, setTasks] = useState([]);
  const { handleCloseDrawer } = useDrawer();
  const { handleChangeModules, rootState } = useRootProvider();
  const { modules } = rootState;

  const [getTags] = useApi({
    endpoint: 'tags',
    method: 'get'
  });

  const getTagsList = async () => {
    const response = await getTags();

    const tags = get(response, 'payload.items', []);

    const enhancedTags = map(tags, ({ _id, name }) => ({
      _id,
      name
    }));

    setTags(enhancedTags);
  };

  const [getTasks] = useApi({
    endpoint: 'tasks',
    method: 'get'
  });

  const getTasksList = async () => {
    const response = await getTasks();

    const tasks = get(response, 'payload.items', []);

    const enhancedTasks = map(tasks, ({ _id, name }) => ({
      _id,
      name
    }));

    setTasks(enhancedTasks);
  };

  useEffect(() => {
    getTagsList();
    getTasksList();
  }, []);

  const getInitialValues = (initialValues) => ({
    name: get(initialValues, 'name', ''),
    tasks: isEdition ? get(initialValues, 'tasks', []) : [],
    tags: isEdition ? get(initialValues, 'tags', []) : []
  });

  const getFields = () => [
    {
      type: 'text',
      name: 'name',
      label: f(formMessages.nameLabel),
      placeholder: f(formMessages.namePlaceholder),
      breakpoints: { xs: 12 }
    },
    {
      type: 'multiselect',
      name: 'tasks',
      label: f(messages.tasksLabel),
      placeholder: f(messages.tasksPlaceholder),
      breakpoints: { xs: 12 },
      multiple: true,
      options: tasks,
      getOptionLabel: (option) => `${option.name || ''}`,
      getOptionSelected: (option, value) => option._id === value._id
    },
    {
      type: 'multiselect',
      name: 'tags',
      label: f(messages.tagsLabel),
      placeholder: f(messages.tagsPlaceholder),
      breakpoints: { xs: 12 },
      multiple: true,
      options: tags,
      getOptionLabel: (option) => `${option.name || ''}`,
      getOptionSelected: (option, value) => option._id === value._id
    }
  ];

  const requiredFieldError = f(formMessages.requiredFieldError);

  const getValidationRules = () =>
    Yup.object({
      name: Yup.string().required(requiredFieldError),
      tasks: Yup.array()
        .min(1, f(messages.pickOne))
        .of(
          Yup.object().shape({
            _id: Yup.string().required(),
            name: Yup.string().required()
          })
        )
        .required(f(messages.pickOne)),
      tags: Yup.array()
        .min(1, f(messages.pickOne))
        .of(
          Yup.object().shape({
            _id: Yup.string().required(),
            name: Yup.string().required()
          })
        )
        .required(f(messages.pickOne))
    });

  const [updateModule] = useApi({
    endpoint: 'module',
    method: 'patch'
  });

  const handleEdit = async (data) => {
    try {
      const response = await updateModule({
        urlParams: id,
        body: { ...data }
      });
      const updatedModule = get(response, 'payload', {});
      const updatedModuleCopy = {
        ...updatedModule,
        taksNumber: size(updatedModule.tasks) || 0
      };

      const newModules = modules.map((module) =>
        module._id === updatedModuleCopy._id
          ? // eslint-disable-next-line no-param-reassign
            (module = updatedModuleCopy)
          : module
      );

      handleChangeModules(newModules);
      handleCloseDrawer();
    } catch (error) {
      throw new Error(error);
    }
  };

  const [createModule] = useApi({
    endpoint: 'modules',
    method: 'post'
  });

  const handleCreate = async (data) => {
    try {
      const response = await createModule({
        body: data
      });
      const createdModule = get(response, 'payload', {});
      const createdModuleCopy = {
        ...createdModule,
        taksNumber: size(createdModule.tasks) || 0
      };

      const newModule = [...modules, createdModuleCopy];

      handleChangeModules(newModule);
      handleCloseDrawer();
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSubmit = (formData) => {
    const data = {
      ...formData,
      tasks: formData.tasks.map((t) => t._id),
      tags: formData.tags.map((t) => t._id)
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

ModuleForm.propTypes = {};

export { ModuleForm };
