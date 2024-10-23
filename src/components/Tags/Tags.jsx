import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './TagsStyles';
import { Table } from '@octopy/react-table';
import { useRootProvider } from 'components/RootProvider';
import { get, map } from 'lodash';
import { useApi } from 'hooks';
import { useModal } from '@octopy/react-modal';
import { Box, Typography } from '@material-ui/core';
import { TagForm } from './TagForm';
import { messages } from './TagsMessages';
import { useDrawer } from 'components/Drawer';
import { useIntl } from 'react-intl';

const tableHead = [
  // prettier-ignore
  { key: 'name', label: 'Tag' },
  { key: '', label: '' }
];

const filters = [{ key: 'name', value: 'Tag' }];

const Tags = () => {
  const classes = useStyles();
  const { formatMessage: f } = useIntl();
  const { handleCloseModal } = useModal();
  const { handleChangeTags, rootState } = useRootProvider();
  const { tags } = rootState;
  const { handleOpenDrawer } = useDrawer();

  const [deleteTag] = useApi({
    endpoint: 'tags',
    method: 'delete'
  });

  const handleDelete = async ({ _id }) => {
    try {
      await deleteTag({
        urlParams: _id
      });
      const updatedTags = tags.filter((t) => t._id !== _id);

      handleChangeTags(updatedTags);
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
      body: <TagForm item={item} />
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
      body: <TagForm />
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
      addTitle: 'Agregar Tag',
      handleAdd: handleOpenCreate
    }
  };

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

    handleChangeTags(enhancedTags);
  };

  useEffect(() => {
    getTagsList();
  }, []);

  return (
    <Box className={classes.container}>
      <Table data={tags} columns={tableHead} configProps={configProps} />
    </Box>
  );
};

Tags.propTypes = {};

export default Tags;
