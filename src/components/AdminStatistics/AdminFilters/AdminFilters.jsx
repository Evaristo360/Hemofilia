import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';
import { Form } from '@octopy/react-form';
import { useIntl } from 'react-intl';
import { messages } from './AdminFiltersMessages';
import { getMonths, monthsMessages } from 'utils/dates';
import { useRootProvider } from 'components/RootProvider';
import { size, map, get } from 'lodash';

const AdminFilters = ({ handleSubmit, formikRef, initialValues }) => {
  const { formatMessage: f } = useIntl();
  const { rootState } = useRootProvider();
  const { specialitys } = rootState;

  const [specialtiesOptions, setSpecialtiesOptions] = useState([]);

  useEffect(() => {
    if (size(specialitys) > 0) {
      const enhancedData = map(specialitys, (item) => ({
        label: get(item, 'name', ''),
        name: get(item, '_id', '')
      }));

      setSpecialtiesOptions(enhancedData);
    }

    return () => setSpecialtiesOptions([]);
  }, [specialitys]);

  const getFields = () => [
    {
      type: 'select',
      name: 'category',
      label: f(messages.content),
      placeholder: f(messages.content),
      options: [
        {
          name: 'documento',
          label: 'Documentos'
        },
        {
          name: 'video',
          label: 'Videos'
        }
      ],
      breakpoints: { xs: 6, sm: 4 },
      getOptionLabel: (option) => `${option.label || ''}`,
      getOptionSelected: (option, value) => option.name === value.name
    },
    {
      type: 'select',
      name: 'month',
      label: f(messages.month),
      placeholder: f(messages.month),
      options: getMonths(f),
      breakpoints: { xs: 6, sm: 4 },
      getOptionLabel: (option) => `${option.label || ''}`,
      getOptionSelected: (option, value) => option.name === value.name
    },
    {
      type: 'select',
      name: 'speciality_id',
      label: f(messages.specialty),
      placeholder: f(messages.specialty),
      options: specialtiesOptions,
      breakpoints: { xs: 12, sm: 4 },
      getOptionLabel: (option) => `${option.label || ''}`,
      getOptionSelected: (option, value) => option.name === value.name
    }
  ];

  const getInitialValues = ({ month, category, speciality_id }) => ({
    month: { name: month, label: f(monthsMessages[month - 1]) },
    category: { name: category, label: 'Videos' },
    speciality_id: { name: speciality_id, label: specialtiesOptions[0].label }
  });

  if (size(specialtiesOptions) < 1) return null;

  return (
    <Grid container direction="row" alignItems="center" spacing={2}>
      <Grid item xs={12} sm={10} md={8}>
        <Form
          initialValues={getInitialValues(initialValues)}
          fields={getFields()}
          formikRef={formikRef}
          withInputsBorder
          showSubmitButton={false}
          handleSubmit={handleSubmit}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button
          color="primary"
          onClick={() => formikRef.current.submitForm()}
          fullWidth
        >
          {f(messages.formButtonLabel)}
        </Button>
      </Grid>
    </Grid>
  );
};

AdminFilters.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  formikRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

export default AdminFilters;
