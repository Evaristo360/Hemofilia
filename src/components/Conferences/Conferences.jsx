import React, { useRef, useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Typography, Box, Grid, Button, Container } from '@material-ui/core';
import { messages } from './ConferencesMessages';
import { useStyles } from './ConferencesStyles';
import { Table } from '@octopy/react-table';
import { useModal } from '@octopy/react-modal';
import { useApi } from 'hooks';
import { getActions, mapWebinars } from './helpers';

const Conferences = ({ history }) => {
  const intl = useIntl();
  const classes = useStyles();
  const modal = useModal();
  const vimeoDataModalFormikRef = useRef();
  const webinarDetailsModalFormikRef = useRef();
  const [getWebinars] = useApi({
    endpoint: '/webinar/dashboard/list',
    method: 'get'
  });
  const [getCsvUrl] = useApi({
    endpoint: '/export/dashboard/webinar',
    method: 'get'
  });

  const [webinars, setWebinars] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getWebinars();

        setWebinars(
          response?.payload ? mapWebinars(response.payload, intl) : undefined
        );
      } catch {}
    })();
  }, []);

  const tableHead = [
    { key: 'theme', label: intl.formatMessage(messages.titleTable) },
    { key: 'doctorName', label: intl.formatMessage(messages.presenterTable) },
    {
      key: 'doctorSpeciality',
      label: intl.formatMessage(messages.especialtyTable)
    },
    { key: 'date', label: intl.formatMessage(messages.dateTable) },
    { key: 'duration', label: intl.formatMessage(messages.durationTable) },
    { key: 'status', label: intl.formatMessage(messages.estatusTable) },
    { key: '', label: '' }
  ];

  const filters = [
    {
      key: 'doctorSpeciality',
      value: intl.formatMessage(messages.especialtyTable)
    },
    { key: 'status', value: intl.formatMessage(messages.estatusTable) },
    { key: 'doctorName', value: intl.formatMessage(messages.presenterTable) }
  ];

  const configProps = {
    filters,
    actions: (item) => {
      const neededDataToGetActions = {
        modal,
        intl,
        history,
        vimeoDataModalFormikRef,
        webinarDetailsModalFormikRef,
        setWebinars
      };

      const actions = getActions(item, neededDataToGetActions);

      return {
        customs: actions
      };
    },
    selectedOptions: {
      checkboxHidden: true
    }
  };

  const downloadCsv = async () => {
    try {
      const {
        payload: { url }
      } = await getCsvUrl();

      const a = document.createElement('a');

      a.setAttribute('href', url);
      a.setAttribute('download', '');
      a.setAttribute('target', '_blank');
      a.click();
    } catch {}
  };

  return (
    <div>
      <Box className={classes.body}>
        <Container>
          <Grid container className={classes.boxUpdate}>
            <Grid item xs={12} sm={12} md={12} lg={4} className={classes.grid}>
              <Box className={classes.boxImage} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4}>
              <Typography className={classes.description}>
                {intl.formatMessage(messages.description)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={4}
              className={classes.boxButtonUpdate}
            >
              <Button
                className={classes.button}
                color="secondary"
                variant="contained"
                component="span"
                onClick={() => history.push('/admin/webinars/create')}
              >
                {intl.formatMessage(messages.buttonUpload)}
              </Button>
            </Grid>
          </Grid>

          <Box className={classes.exportButtonContainer}>
            <Button
              className={classes.exportButton}
              color="secondary"
              onClick={downloadCsv}
            >
              {intl.formatMessage(messages.exportCsv)}
            </Button>
          </Box>
        </Container>

        <Grid className={classes.tableWrapper}>
          <Table
            data={webinars}
            columns={tableHead}
            configProps={configProps}
          />
        </Grid>
      </Box>
    </div>
  );
};

Conferences.propTypes = {};

export { Conferences };
