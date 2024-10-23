import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useModal } from '@octopy/react-modal';
import { useRootProvider } from 'components/RootProvider';
import { useStyles } from './TasksStyles';
import { useApi } from 'hooks';
import { Table } from '@octopy/react-table';
import { get, map } from 'lodash';
import { messages } from './TasksMessages';
import { useIntl } from 'react-intl';
import { useDrawer } from 'components/Drawer';
import { TaskForm } from './TaskForm/TaskForm';

const tableHead = [
  { key: 'name', label: 'Nombre' },
  { key: 'total_time', label: 'Tiempo Total' },
  { key: 'back_time', label: 'Back development (hrs)' },
  { key: 'front_time', label: 'Front development (hrs)' },
  { key: 'description', label: 'Descripción' },
  { key: 'days_develop', label: 'Días de desarollo' },
  { key: 'tagList', label: 'Tags' },
  { key: '', label: '' }
];

const filters = [
  { key: 'name', value: 'Nombre' },
  { key: 'total_time', value: 'Tiempo Total' },
  { key: 'days_develop', value: 'Días de desarollo' },
  { key: 'tagList', value: 'Tag' }
];

const Tasks = () => {
  const classes = useStyles();
  const { formatMessage: f } = useIntl();
  const { handleCloseModal } = useModal();
  const { handleChangeTasks, rootState } = useRootProvider();
  const { tasks } = rootState;
  const { handleOpenDrawer } = useDrawer();

  const [deleteTag] = useApi({
    endpoint: 'tasks',
    method: 'delete'
  });

  const handleDelete = async ({ _id }) => {
    try {
      await deleteTag({
        urlParams: _id
      });
      const updatedTags = tasks.filter((t) => t._id !== _id);

      handleChangeTasks(updatedTags);
      handleCloseModal();
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleOpenEdition = (item) => {
    handleOpenDrawer({
      configProps: {
        anchor: 'right',
        transitionDuration: 1000
      },
      closeButton: true,
      title: <Typography>{f(messages.updateTitle)}</Typography>,
      body: <TaskForm item={item} />
    });
  };

  const handleOpenCreate = () => {
    handleOpenDrawer({
      configProps: {
        anchor: 'right',
        transitionDuration: 1000
      },
      closeButton: true,
      title: <Typography>{f(messages.createTitle)}</Typography>,
      body: <TaskForm />
    });
  };

  const configProps = {
    filters,
    actions: {
      deleteAction: {
        onClick: (item) => handleDelete(item)
      },
      edit: {
        onClick: (item) => handleOpenEdition(item)
      }
    },
    topTable: {
      addTitle: f(messages.addTaskTitle),
      handleAdd: handleOpenCreate
    }
  };

  const [getTasks] = useApi({
    endpoint: 'tasks',
    method: 'get'
  });

  const getTagsAsString = (tags) => tags.map((tag) => tag.name).join(', ');

  const getTasksList = async () => {
    const response = await getTasks();

    const tasks = get(response, 'payload.items', []);

    const enhancedTasks = map(tasks, (task) => ({
      ...task,
      tagList: getTagsAsString(task.tags)
    }));

    handleChangeTasks(enhancedTasks);
  };

  useEffect(() => {
    getTasksList();
  }, []);

  return (
    <Box className={classes.container}>
      <Table data={tasks} columns={tableHead} configProps={configProps} />
    </Box>
  );
};

Tasks.propTypes = {};

export default Tasks;
