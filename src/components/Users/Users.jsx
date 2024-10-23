import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Box, Typography } from '@material-ui/core';
import { messages } from './UsersMessages';
import { useStyles } from './UsersStyles';
import { Table } from '@octopy/react-table';
import { useApi } from 'hooks';
import { get } from 'lodash';
import { useRootProvider } from 'components/RootProvider';
import { useModal } from '@octopy/react-modal';
import { useDrawer } from 'components/Drawer';
import { UserForm } from './UserForm';
import moment from 'moment';

const tableHead = [
  { key: 'name', label: 'Nombre' },
  { key: 'email', label: 'Correo' },
  { key: 'created_at', label: 'Fecha de creación' },
  { key: '', label: '' }
];

const filters = [
  { key: 'name', value: 'Nombre' },
  { key: 'email', value: 'Correo' }
];

const Users = () => {
  const { formatMessage: f } = useIntl();
  const classes = useStyles();
  const { handleCloseModal } = useModal();
  const { handleChangeUsers, rootState } = useRootProvider();
  const { handleOpenDrawer } = useDrawer();
  const { users } = rootState;

  const [deleteUser] = useApi({
    endpoint: 'admin/dashboard/delete',
    method: 'delete'
  });

  const handleDelete = async ({ _id }) => {
    try {
      await deleteUser({
        urlParams: _id
      });
      const updatedUsers = users.filter((u) => u._id !== _id);

      handleChangeUsers(updatedUsers);
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
      body: <UserForm item={item} />
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
      body: <UserForm />
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
      addTitle: f(messages.addUserTitle),
      handleAdd: handleOpenCreate
    },
    selectedOptions: {
      checkboxHidden: true
    }
  };

  const [getUsers] = useApi({
    endpoint: 'admin/dashboard/list',
    method: 'get'
  });

  const getUserList = async () => {
    const response = await getUsers();
    const headerResponse = get(response, 'headerResponse', []);
    const users = get(response, 'payload', []);

    if (headerResponse.status == 200) {
      users.map(
        (item) =>
          // eslint-disable-next-line no-param-reassign
          (item.created_at = moment(item.created_at).format('DD/MM/YYYY'))
      );

      handleChangeUsers(users);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <Box className={classes.container}>
      <Table data={users} columns={tableHead} configProps={configProps} />
    </Box>
  );
};

export default Users;
