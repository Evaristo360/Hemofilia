/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Table } from '@octopy/react-table';
import { Grid, Button, IconButton, Container } from '@material-ui/core';
import { Visibility, ExitToApp, ArrowBack } from '@material-ui/icons';
import { InfoCard } from 'components/InfoCard';
import { DatabaseProfile } from './DatabaseProfile';
import { tableHead, filters } from './utils';
import { messages } from './AdminUserBaseMessages';
import { useStyles } from './AdminUserBaseStyles';
import { useApi } from 'hooks';
import { get } from 'lodash';
import { Images } from '../../assets';
import moment from 'moment';

const AdminUserBase = () => {
  const intl = useIntl();
  const classes = useStyles();
  const [sucess, setsucess] = useState(false);
  const [indicators, setIndicators] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [getDoctors] = useApi({
    endpoint: 'doctor/dashboard/list',
    method: 'get'
  });

  const getDoctorList = async () => {
    const response = await getDoctors();

    const doctorsResponse = get(response, 'payload.doctors', []);
    const indicatorsResponse = get(response, 'payload.indicators', []);

    indicatorsResponse.map((item, index) => {
      switch (index) {
        case 0:
          item.image = `${Images.hematologia}`;
          break;
        case 1:
          item.image = `${Images.fisReh}`;
          break;
        case 2:
          item.image = `${Images.psicologia}`;
          break;
        case 3:
          item.image = `${Images.ortopedia}`;
          break;
        case 4:
          item.image = `${Images.trabajoSocial}`;
          break;
        case 5:
          item.image = `${Images.estomaOdonto}`;
          break;
        case 6:
          item.image = `${Images.enfermeria}`;
          break;
      }
    });

    doctorsResponse.map((item) => {
      item.enabled = item.enabled ? 'Activo' : 'Deshabilitado';
      item.last_login = moment(item.last_login).format('DD/MM/YYYY');
    });

    setIndicators(indicatorsResponse);
    setDoctors(doctorsResponse);
  };

  useEffect(() => {
    getDoctorList();
  }, [sucess]);

  const [getCSV] = useApi({
    endpoint: '/export/dashboard/doctor',
    method: 'get'
  });

  const downloadCSV = async () => {
    try {
      const {
        payload: { url }
      } = await getCSV();

      const a = document.createElement('a');

      a.setAttribute('href', url);
      a.setAttribute('download', '');
      a.setAttribute('target', '_blank');
      a.click();
    } catch {}
  };

  const handleExample = (value, item) => {
    switch (value) {
      default:
        setsucess(
          <>
            <Grid className={classes.contentIcon}>
              <IconButton onClick={() => setsucess(false)}>
                <ArrowBack className={classes.arrowIcon} />
              </IconButton>
            </Grid>
            <DatabaseProfile item={item._id} />
          </>
        );
        break;
    }
  };

  const configProps = {
    filters,
    actions: {
      customs: {
        text: intl.formatMessage(messages.see),
        onClick: (item) => {
          handleExample('sucess', item);
        },
        icon: Visibility
      }
    },
    selectedOptions: {
      checkboxHidden: true
    }
  };

  return (
    <Container>
      {sucess ? (
        <>{sucess}</>
      ) : (
        <>
          <Grid
            container
            direction="row"
            spacing={2}
            className={classes.responsiveCards}
          >
            {indicators.map((item) => (
              <Grid item>
                <InfoCard
                  moreInfoCard
                  specialty={item.name}
                  numberSpecialty={item.doctor_count}
                  image={item.image}
                />
              </Grid>
            ))}
          </Grid>

          <Grid className={classes.contentButton}>
            <Button
              endIcon={<ExitToApp />}
              color="secondary"
              onClick={downloadCSV}
            >
              {intl.formatMessage(messages.export)}
            </Button>
          </Grid>

          <Grid>
            <Table
              data={doctors}
              columns={tableHead}
              configProps={configProps}
            />
          </Grid>
        </>
      )}
    </Container>
  );
};

AdminUserBase.propTypes = {};

export { AdminUserBase };
