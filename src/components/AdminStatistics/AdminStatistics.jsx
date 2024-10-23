import React, { useEffect, useRef, useState } from 'react';
import { get, map, size, isNumber } from 'lodash';
import { useIntl } from 'react-intl';
import {
  Typography,
  Grid,
  Card,
  Container,
  useMediaQuery,
  Divider,
  IconButton,
  Hidden
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { PieChart } from '@octopy/react-charts';
import { useModal } from '@octopy/react-modal';
import { InfoCard } from 'components/InfoCard';
import { GraphUserInteractions } from './GraphUserInteractions/GraphUserInteractions';
import { GraphMostVisited } from './GraphMostVisited/GraphMostVisited';
import { GraphTopRated } from './GraphTopRated/GraphTopRated';
import { useRootProvider } from 'components/RootProvider';
import { pieColors, specialtyImage, cardIcons } from './utils';
import { messages } from './AdminStatisticsMessages';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './AdminStatisticsStyles';
import { useApi } from 'hooks';
import AdminFilters from './AdminFilters';

const AdminStatistics = () => {
  const { formatMessage: f } = useIntl();
  const classes = useStyles();
  const formikRef = useRef();
  const {
    rootState,
    handleChangeStatistics,
    handleChangeSpecialitys,
    handleChangeMostVisited,
    handleChangeTopRated,
    handleChangeUserInteractions,
    handleChangePercentageDoctorsBySpeciality
  } = useRootProvider();
  const { statistics, specialitys } = rootState;
  const {
    staticData = [],
    percentageDoctorsBySpeciality = [],
    topRated = [],
    userInteractions = [],
    mostSee = []
  } = statistics;
  const { handleCloseModal, handleOpenModal } = useModal();
  const [totalUsersBySpecialty, setTotalUsersBySpecialty] = useState(0);
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs', 'lg'));

  const account = get(rootState, 'session.user', {});
  const user = {
    name: get(account, 'name', ''),
    role: get(account, 'role', 'administrador'),
    image: null
  };

  const [getGraphs, , loading] = useApi({
    endpoint: 'home/dashboard/list-graphs',
    method: 'get'
  });

  const getInitialValues = (filters) => {
    const date = new Date();
    const specialityId = specialitys[0];

    if (size(filters) > 0) {
      return {
        month: get(filters, 'month.name', filters.month),
        category: get(filters, 'category.name', filters.category),
        speciality_id: get(filters, 'speciality_id.name', filters.speciality_id)
      };
    }

    return {
      month: date.getMonth() + 1,
      category: 'video',
      speciality_id: get(specialityId, '_id', '')
    };
  };

  const getGraphsList = async (filters) => {
    const response = await getGraphs({
      queryString: getInitialValues(filters)
    });
    const mostSeenResponse = get(response, 'payload.most_visited', []);
    const topRatedResponse = get(response, 'payload.most_voted', []);
    const userInteractionsResponse = get(
      response,
      'payload.user_interactions',
      []
    );

    handleChangeMostVisited(mostSeenResponse);
    handleChangeTopRated(topRatedResponse);
    handleChangeUserInteractions(userInteractionsResponse);
  };

  const [getStaticContent] = useApi({
    endpoint: 'home/dashboard/list-indicators',
    method: 'get'
  });

  const getCardsAndPie = async () => {
    const response = await getStaticContent();

    const enhancedStatic = [];
    const documents = {
      name: 'Documentos',
      total: get(response, 'payload.documents', 0),
      Icon: cardIcons['documentos'],
      specialties: get(
        response,
        'payload.approved_documents_per_speciality',
        []
      )
    };
    const videos = {
      name: 'Videos',
      total: get(response, 'payload.videos', 0),
      Icon: cardIcons['videos'],
      specialties: get(response, 'payload.approved_videos_per_speciality', [])
    };
    const doctors = {
      name: 'Doctores',
      total: get(response, 'payload.doctors', 0),
      Icon: cardIcons['doctores'],
      specialties: get(response, 'payload.doctors_per_speciality', [])
    };
    const average = {
      name: 'Promedio de estrellas',
      total: get(response, 'payload.average', 0),
      Icon: cardIcons['promedio'],
      specialties: get(response, 'payload.average_per_speciality', [])
    };

    enhancedStatic.push(documents);
    enhancedStatic.push(videos);
    enhancedStatic.push(doctors);
    enhancedStatic.push(average);

    handleChangeStatistics(enhancedStatic);

    const doctorsPerSpeciality = get(
      response,
      'payload.doctors_percent_per_speciality',
      []
    );
    const enhancedDoctors = map(doctorsPerSpeciality, (item) => {
      const label = get(item, 'name', '');
      const value = get(item, 'percentage', 0);

      return {
        label: label ? label : 'Sin titulo',
        value: value ? value : 0
      };
    });

    setTotalUsersBySpecialty(
      doctorsPerSpeciality.reduce((prev, current) => {
        const count = get(current, 'count', 0);

        if (isNumber(count)) return prev + count;

        return prev;
      }, 0)
    );
    handleChangePercentageDoctorsBySpeciality(enhancedDoctors);
  };

  const [getSpecialties] = useApi({
    endpoint: 'catalogue/speciality/list',
    method: 'get'
  });

  const getSpecialtiesList = async () => {
    const response = await getSpecialties();

    const data = get(response, 'payload', []);

    handleChangeSpecialitys(data);
  };

  useEffect(() => {
    getCardsAndPie();
    if (size(specialitys) < 2) {
      getSpecialtiesList();
    }

    if (size(specialitys) > 0) getGraphsList();
  }, [specialitys]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.contentText}>
          <div className={classes.responsiveLogo} />
          <Typography className={classes.welcomeTitle}>
            {f(messages.welcome)}
          </Typography>
          <Typography className={classes.userName}>
            {get(user, 'name', '')}
          </Typography>
          <Hidden mdUp>
            <Grid>
              <Typography className={classes.sessionText}>
                {f(messages.session)} &nbsp;
              </Typography>
              <Typography className={classes.roleText}>
                {get(user, 'role', '')}
              </Typography>
            </Grid>
          </Hidden>

          <Hidden smDown>
            <Grid className={classes.contentRole}>
              <Typography className={classes.sessionText}>
                {f(messages.session)} &nbsp;
              </Typography>
              <Typography className={classes.roleText}>
                {get(user, 'role', '')}
              </Typography>
            </Grid>
          </Hidden>
          <Typography className={classes.textStadistics} data-aos="zoom-in">
            {f(messages.estadistics)}
          </Typography>
        </div>
      </div>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          justify="space-between"
          className={classes.contentCards}
        >
          {staticData.map(({ name = '', total = 0, Icon = null, ...item }) => (
            <Grid item lg={3} md={4} sm={6}>
              <InfoCard
                image={<Icon className={classes.iconCard} />}
                title={name}
                number={total || 0}
                onClick={() =>
                  handleOpenModal({
                    title: (
                      <Grid className={classes.contentTitleModal}>
                        <Typography className={classes.textModalCards}>
                          {name}
                        </Typography>
                        <Grid>
                          <IconButton onClick={() => handleCloseModal()}>
                            <Close className={classes.iconClose} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ),
                    body: (
                      <Grid
                        container
                        direction="row"
                        spacing={2}
                        className={classes.modalBodyContent}
                      >
                        {item.specialties.map((item) => (
                          <Grid item>
                            <InfoCard
                              moreInfoCard
                              modalCards
                              specialty={item.name}
                              numberSpecialty={get(item, 'count', 0)}
                              image={
                                specialtyImage[
                                  get(item, 'name', '').toLowerCase()
                                ]
                              }
                              qualified={name === 'Promedio de estrellas'}
                              numberQualified={get(item, 'document_average', 0)}
                              numberDoc={get(item, 'video_average', 0)}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    ),
                    configProps: {
                      maxWidth: 'lg'
                    }
                  })
                }
              />
            </Grid>
          ))}

          <Grid item xs={12} className={classes.formContainer}>
            <AdminFilters
              handleSubmit={(values) => getGraphsList(values)}
              formikRef={formikRef}
              initialValues={getInitialValues()}
            />
          </Grid>
        </Grid>
      </Container>
      <Container
        style={{
          height: xs ? null : '320px',
          width: '100%'
        }}
        maxWidth="lg"
      >
        <Card className={classes.cardTable}>
          <GraphUserInteractions data={userInteractions} loading={loading} />
        </Card>
        <Grid
          container
          spacing={2}
          style={{ marginTop: 25, paddingBottom: 50 }}
        >
          <Grid item lg={4} xs={12}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Card className={classes.cardPieChart}>
                  <Typography className={classes.titlesCardsText}>
                    {f(messages.titlePie)}
                  </Typography>
                  <Grid className={classes.contentTotalPieChart}>
                    <Typography className={classes.total}>
                      {f(messages.total)}
                    </Typography>
                    <Typography className={classes.numberTotal}>
                      {totalUsersBySpecialty}
                    </Typography>
                  </Grid>
                  <Grid className={classes.divider}>
                    <Divider />
                  </Grid>
                  <div className={classes.contentPieChart}>
                    <PieChart
                      type="pie"
                      colors={pieColors}
                      values={
                        totalUsersBySpecialty > 0
                          ? percentageDoctorsBySpeciality
                          : []
                      }
                      options={{ legend: { position: 'bottom' } }}
                    />
                  </div>
                </Card>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <GraphMostVisited data={mostSee} loading={loading} />
              </Grid>
              <Grid item xs={12}>
                <GraphTopRated data={topRated} loading={loading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export { AdminStatistics };
