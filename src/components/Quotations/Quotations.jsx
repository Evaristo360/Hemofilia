import React, { useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useModal } from '@octopy/react-modal';
import { useRootProvider } from 'components/RootProvider';
import { useApi } from 'hooks';
import { Table } from '@octopy/react-table';
import { get, map, size } from 'lodash';
import { useIntl } from 'react-intl';
import { useDrawer } from 'components/Drawer';
import { QuotationForm } from './QuotationForm/QuotationForm';
import { messages } from './QuotationsMessages';
import { useStyles } from './QuotationsStyles';

const tableHead = [
  { key: 'project_name', label: 'Nombre de proyecto' },
  { key: 'modulesNumber', label: 'Número de módulos' },
  { key: '', label: '' }
];

const filters = [
  { key: 'project_name', value: 'Nombre de proyecto' },
  { key: 'modulesNumber', value: 'Número de módulos' },
  { key: 'tagList', value: 'Tag' }
];

const Quotations = () => {
  const classes = useStyles();
  const { formatMessage: f } = useIntl();
  const { handleCloseModal } = useModal();
  const { handleChangeQuotations, rootState } = useRootProvider();
  const { quotations } = rootState;
  const { handleOpenDrawer } = useDrawer();

  const [deleteQuotation] = useApi({
    endpoint: 'quotations',
    method: 'delete'
  });

  const handleDelete = async ({ _id }) => {
    try {
      await deleteQuotation({
        urlParams: _id
      });

      const updatedQuotations = quotations.filter((t) => t._id !== _id);

      handleChangeQuotations(updatedQuotations);
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
      body: <QuotationForm item={item} />
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
      body: <QuotationForm />
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

  const [getQuotations] = useApi({
    endpoint: 'quotations',
    method: 'get'
  });

  // const getTagsAsString = (tags) => tags.map((tag) => tag.name).join(', ');

  const getQuotationsList = async () => {
    const response = await getQuotations();

    const quotations = get(response, 'payload.items', []);

    const enhancedQuotations = map(quotations, (quotation) => ({
      ...quotation,
      modulesNumber: size(quotation.modules) || 0
    }));

    handleChangeQuotations(enhancedQuotations);
  };

  useEffect(() => {
    getQuotationsList();
  }, []);

  return (
    <Box className={classes.container}>
      <Table data={quotations} columns={tableHead} configProps={configProps} />
    </Box>
  );
};

export default Quotations;
