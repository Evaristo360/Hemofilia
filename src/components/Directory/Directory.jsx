import React, { useEffect, useState, useRef } from 'react';
import { useIntl } from 'react-intl';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import { Form } from '@octopy/react-form';
import { messages } from './DirectoryMessages';
import { useStyles } from './DirectoryStyles';
import { useApi } from 'hooks';
import { get } from 'lodash';
import { useRootProvider } from 'components/RootProvider';
import { CardContact } from './CardContact';
import { DirectoryIcons } from 'assets';
import { SeeMore } from 'components/SeeMore';

const size = 4;

const Directory = () => {
  const {
    handleChangeDoctors,
    handleChangeSpecialitys,
    handleChangeStates,
    rootState
  } = useRootProvider();
  const { doctors, specialitys, states } = rootState;

  const [filtersLabel, setFiltersLabel] = useState('');

  const formikRef = useRef();

  const { formatMessage: f } = useIntl();
  const classes = useStyles();
  const { filterIcon } = DirectoryIcons;
  const [contacts, setContacts] = useState([]);
  const [state, setState] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [index, setIndex] = useState(1);

  const renderContacts = contacts.map((contact) => (
    <Grid item xs={12} sm={6} md={3} lg={3}>
      <CardContact
        image={contact.avatar}
        name={contact.name}
        speciality={contact.speciality}
        email={contact.email}
        phone={contact.phone}
        state={contact.state}
      />
    </Grid>
  ));

  const getInitialValues = () => ({ speciality: '', state: '' });

  const getFields = () => [
    {
      type: 'select',
      name: 'speciality',
      label: f(messages.specialityFilter),
      breakpoints: { xs: 12, sm: 6 },
      options: specialitys,
      getOptionLabel: (option) => `${option.name || ''}`
    },
    {
      type: 'select',
      name: 'state',
      label: f(messages.stateFilter),
      breakpoints: { xs: 12, sm: 6 },
      options: states,
      getOptionLabel: (option) => `${option.name || ''}`
    }
  ];

  const filterDoctors = () => {
    let contactFilters = doctors.slice();

    if (speciality) {
      contactFilters = doctors.filter(
        (doctor) => doctor.speciality === speciality
      );
    }

    if (state) {
      contactFilters = doctors.filter((doctor) => doctor.state === state);
    }

    return contactFilters;
  };

  const handleSubmit = (values) => {
    let label = '';

    label += values.speciality;
    label += values.speciality && values.state ? ' - ' : '';
    label += values.state;

    setFiltersLabel(label);
    setState(values.state);
    setSpeciality(values.speciality);
    setIndex(1);
  };

  const loadData = () => {
    let aux = filterDoctors();
    let takeElements = size * (index + 1);
    let elements = [];

    if (takeElements > aux.length) {
      elements = aux.slice(0, aux.length);
    } else {
      elements = aux.slice(0, takeElements);
    }

    setIndex(index + 1);
    setContacts(elements);
  };

  const [getDoctors] = useApi({
    endpoint: 'doctor/web/directory',
    method: 'get'
  });

  const getDoctorsList = async () => {
    const response = await getDoctors();

    const doctors = get(response, 'payload', []);

    handleChangeDoctors(doctors);
  };

  const [getStates] = useApi({
    endpoint: 'catalogue/state/list',
    method: 'get'
  });

  const getStatesList = async () => {
    const response = await getStates();

    const states = get(response, 'payload', []);

    handleChangeStates(states);
  };

  const [getSpecialitys] = useApi({
    endpoint: 'catalogue/speciality/list',
    method: 'get'
  });

  const getSpecialitysList = async () => {
    const response = await getSpecialitys();

    const specialitys = get(response, 'payload', []);

    handleChangeSpecialitys(specialitys);
  };

  useEffect(() => {
    getDoctorsList();
    getStatesList();
    getSpecialitysList();
  }, []);

  useEffect(() => {
    let filter = filterDoctors();

    setContacts(filter.slice(0, size));
  }, [state, speciality]);

  useEffect(() => {
    setContacts(filterDoctors().slice(0, size));
  }, [doctors]);

  return (
    <Container>
      <Grid
        container
        direction="row"
        spacing={2}
        className={classes.filterContainer}
      >
        <Grid item xs={12} sm={12} md={3} lg={2}>
          <Typography
            variant="h4"
            color="primary"
            className={classes.filterLabel}
          >
            <img
              src={filterIcon}
              alt="filter-icon"
              className={classes.filterIcon}
            />
            {f(messages.filtersLabel)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Form
            initialValues={getInitialValues()}
            fields={getFields()}
            showSubmitButton={false}
            withInputsBackground={false}
            inputProps={{
              variant: 'filled',
              fullWidth: true
            }}
            formikRef={formikRef}
            handleSubmit={handleSubmit}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={4}>
          <Button
            color="primary"
            size="large"
            onClick={() => formikRef.current.submitForm()}
          >
            {f(messages.searchLabel)}
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h5" color="primary" className={classes.filterLabel}>
        {filtersLabel}
      </Typography>

      <Grid container spacing={2}>
        {renderContacts}
      </Grid>

      <SeeMore handleSubmitValues={loadData}></SeeMore>
    </Container>
  );
};

export default Directory;
