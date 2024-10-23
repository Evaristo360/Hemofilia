import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useModal } from '@octopy/react-modal';
import { useRootProvider } from 'components/RootProvider';
import { useStyles } from './ModulesStyles';
import { useApi } from 'hooks';
import { Table } from '@octopy/react-table';
import { get, map, size } from 'lodash';
import { messages } from './ModulesMessages';
import { useIntl } from 'react-intl';
import { useDrawer } from 'components/Drawer';
import { ModuleForm } from './ModuleForm/ModuleForm';

const tableHead = [
  { key: 'name', label: 'Nombre' },
  // { key: 'total_time', label: 'Tiempo Total' },
  // { key: 'days_count', label: 'Días de desarrollo' },
  // { key: 'status', label: 'Estado' },
  { key: 'taksNumber', label: 'Número de tareas' },
  { key: '', label: '' }
];

const filters = [
  { key: 'name', value: 'Nombre' }
  // { key: 'total_time', value: 'Tiempo Total' },
  // { key: 'days_develop', value: 'Días de desarollo' },
  // { key: 'tagList', value: 'Tag' }
];

const Modules = () => {
  const classes = useStyles();
  const { formatMessage: f } = useIntl();
  const { handleCloseModal } = useModal();
  const { handleChangeModules, rootState } = useRootProvider();
  const { modules } = rootState;
  const { handleOpenDrawer } = useDrawer();

  const [deleteModule] = useApi({
    endpoint: 'modules',
    method: 'delete'
  });

  const handleDelete = async ({ _id }) => {
    try {
      await deleteModule({
        urlParams: _id
      });
      const updatedModule = modules.filter((t) => t._id !== _id);

      handleChangeModules(updatedModule);
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
      body: <ModuleForm item={item} />
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
      body: <ModuleForm />
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

  const [getModules] = useApi({
    endpoint: 'modules',
    method: 'get'
  });

  // const getTagsAsString = (tags) => tags.map((tag) => tag.name).join(', ');

  const getModulesList = async () => {
    const response = await getModules();

    const modules = get(response, 'payload.items', []);

    const enhancedModules = map(modules, (module) => ({
      ...module,
      taksNumber: size(module.tasks) || 0
    }));

    handleChangeModules(enhancedModules);
  };

  useEffect(() => {
    getModulesList();
  }, []);

  return (
    <Box className={classes.container}>
      <Table data={modules} columns={tableHead} configProps={configProps} />
    </Box>
  );
};

Modules.propTypes = {};

export default Modules;
