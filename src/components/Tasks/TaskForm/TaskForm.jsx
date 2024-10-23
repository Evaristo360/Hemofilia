import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Box } from '@material-ui/core';
import { messages } from './TaskFormMessages';
import { useStyles } from './TaskFormStyles';
import { get, isEmpty, map } from 'lodash';
import { useApi } from 'hooks';
import * as Yup from 'yup';
import { Form, messages as formMessages } from '@octopy/react-form';
import * as formConfig from 'components/Form/config';
import { useDrawer } from 'components/Drawer';
import { useRootProvider } from 'components/RootProvider';

const TaskForm = (props) => {
  const { item = {} } = props;
  const id = get(item, '_id', null);
  const isEdition = !!id;
  const classes = useStyles();
  const { formatMessage: f } = useIntl();
  const [tags, setTags] = useState([]);
  const { handleCloseDrawer } = useDrawer();
  const { handleChangeTasks, rootState } = useRootProvider();
  const { tasks } = rootState;

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

  useEffect(() => {
    getTagsList();
  }, []);

  const getInitialValues = (initialValues) => ({
    total_time: get(initialValues, 'total_time', ''),
    back_develop: get(initialValues, 'back_develop', ''),
    front_develop: get(initialValues, 'front_develop', ''),
    back_time: get(initialValues, 'back_time', ''),
    front_time: get(initialValues, 'front_time', ''),
    description: get(initialValues, 'description', ''),
    name: get(initialValues, 'name', ''),
    days_develop: get(initialValues, 'days_develop', ''),
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
      type: 'number',
      name: 'back_time',
      label: f(messages.backTimeLabel),
      placeholder: f(messages.backTimePlaceholder),
      breakpoints: { sm: 6, xs: 12 }
    },
    {
      type: 'number',
      name: 'front_time',
      label: f(messages.frontTimeLabel),
      placeholder: f(messages.frontTimePlaceholder),
      breakpoints: { sm: 6, xs: 12 }
    },
    {
      type: 'number',
      name: 'total_time',
      label: f(messages.totalTimeLabel),
      placeholder: f(messages.totalTimePlaceholder),
      breakpoints: { xs: 12 }
    },
    {
      type: 'text',
      name: 'back_develop',
      label: f(messages.backDevelopLabel),
      placeholder: f(messages.backDevelopPlaceholder),
      breakpoints: { sm: 6, xs: 12 }
    },
    {
      type: 'text',
      name: 'front_develop',
      label: f(messages.frontDevelopLabel),
      placeholder: f(messages.frontDevelopPlaceholder),
      breakpoints: { sm: 6, xs: 12 }
    },
    {
      type: 'text',
      name: 'description',
      label: f(messages.descriptionLabel),
      placeholder: f(messages.descriptionPlaceholder),
      breakpoints: { xs: 12 }
    },
    {
      type: 'number',
      name: 'days_develop',
      label: f(messages.developmentDaysLabel),
      placeholder: f(messages.developmentDaysPlaceholder),
      breakpoints: { xs: 12 }
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
      total_time: Yup.string().required(requiredFieldError),
      back_develop: Yup.string().required(requiredFieldError),
      front_develop: Yup.string().required(requiredFieldError),
      back_time: Yup.string().required(requiredFieldError),
      front_time: Yup.string().required(requiredFieldError),
      description: Yup.string().required(requiredFieldError),
      name: Yup.string().required(requiredFieldError),
      days_develop: Yup.string().required(requiredFieldError),
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

  const [updateTask] = useApi({
    endpoint: 'tasks',
    method: 'patch'
  });

  const getTagsAsString = (tags) => tags.map((tag) => tag.name).join(', ');

  const handleEdit = async (data) => {
    try {
      const response = await updateTask({
        urlParams: id,
        body: { ...data }
      });
      const updatedTask = get(response, 'payload', {});
      const updatedTaskCopy = {
        ...updatedTask,
        tagList: getTagsAsString(updatedTask.tags)
      };

      const newTasks = tasks.map((task) =>
        // eslint-disable-next-line no-param-reassign
        task._id === updatedTaskCopy._id ? (task = updatedTaskCopy) : task
      );

      handleChangeTasks(newTasks);
      handleCloseDrawer();
    } catch (error) {
      throw new Error(error);
    }
  };

  const [createTask] = useApi({
    endpoint: 'tasks',
    method: 'post'
  });

  const handleCreate = async (data) => {
    try {
      const response = await createTask({
        body: data
      });
      const createdTask = get(response, 'payload', {});
      const createdTaskCopy = {
        ...createdTask,
        tagList: getTagsAsString(createdTask.tags)
      };

      const newTasks = [...tasks, createdTaskCopy];

      handleChangeTasks(newTasks);
      handleCloseDrawer();
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSubmit = (formData) => {
    const data = {
      ...formData,
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

TaskForm.propTypes = {};

export { TaskForm };
