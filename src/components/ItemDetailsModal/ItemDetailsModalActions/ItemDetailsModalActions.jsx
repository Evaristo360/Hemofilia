/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Box, Button, useTheme } from '@material-ui/core';
import { messages } from './ItemDetailsModalActionsMessages';
import { useStyles } from './ItemDetailsModalActionsStyles';
import {
  useModal,
  ConfirmationDelete,
  confirmationMessages
} from '@octopy/react-modal';
import { useDrawer } from 'components/Drawer';
import Typography from '@material-ui/core/esm/Typography';
import { TaskForm } from 'components/Tasks/TaskForm/TaskForm';
import { UserForm } from 'components/Users/UserForm/UserForm';
import { TagForm } from 'components/Tags/TagForm/TagForm';
import { useApi } from 'hooks';

const forms = {
  tasks: TaskForm,
  users: UserForm,
  tags: TagForm
};

const ItemDetailsModalActions = ({ section, item /* api item */ }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const classes = useStyles();
  const { handleOpenModal, handleCloseModal } = useModal();
  const { handleOpenDrawer } = useDrawer();

  const [deleteItem] = useApi({ endpoint: section, method: 'delete' });

  const handleDelete = () => {
    handleCloseModal();

    setTimeout(
      () =>
        handleOpenModal({
          title: formatMessage(confirmationMessages.confirmationDeleteTitle),
          body: formatMessage(
            confirmationMessages.confirmationDeleteDescription
          ),
          actionButtons: (
            <ConfirmationDelete
              handleDelete={() => {
                deleteItem({ urlParams: item._id });
                handleCloseModal();
              }}
            />
          )
        }),
      theme.transitions.duration.standard
    );
  };

  const handleEdit = () => {
    handleCloseModal();

    const Form = forms[section];

    setTimeout(
      () =>
        handleOpenDrawer({
          configProps: {
            anchor: 'right',
            transitionDuration: 1000
          },
          closeButton: true,
          title: (
            <Typography>{formatMessage(messages[`${section}Edit`])}</Typography>
          ),
          body: <Form item={item} />
        }),
      theme.transitions.duration.standard
    );
  };

  return (
    <Box px={1.5} pb={1}>
      {/* <Button className={classes.editButton} onClick={handleEdit}> */}
      <Button className={classes.editButton}>
        {formatMessage(messages.edit)}
      </Button>
      {/* <Button className={classes.deleteButton} onClick={handleDelete}> */}
      <Button className={classes.deleteButton}>
        {formatMessage(messages.delete)}
      </Button>
    </Box>
  );
};

ItemDetailsModalActions.propTypes = {
  section: PropTypes.oneOf(['tasks', 'tags', 'users']).isRequired,
  item: PropTypes.object.isRequired
};

export { ItemDetailsModalActions };
