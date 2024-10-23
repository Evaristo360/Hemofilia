import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Typography, Box, Grid, IconButton, Button } from '@material-ui/core';
import { messages } from './ApproveMessages';
import { useStyles } from './ApproveStyles';
import { ApprovedCard } from './ApprovedCard';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Images } from 'assets';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { ApproveForm } from './ApproveForm/ApproveForm';
import { useModal } from '@octopy/react-modal';
import CloseIcon from '@material-ui/icons/Close';

const Approve = () => {
  const intl = useIntl();
  const classes = useStyles();
  const { handleOpenModal, handleCloseModal } = useModal();
  const formikRef = useRef();
  const [cardData, setCardData] = useState({});
  const toBeApprovedList = [
    {
      title: 'Hematologia',
      description: 'Sistema imnume en pacientes hemofilicos',
      doctor: 'Dr. Christopher Reyes Santos',
      date: '30/03/2022',
      hour: '17:00-18:30'
    },
    {
      title: 'Dermatologia',
      description: 'Sistema imnume en pacientes hemofilicos',
      doctor: 'Dr. Christopher Reyes Santos',
      date: '30/03/2022',
      hour: '17:00-18:30'
    },
    {
      title: 'Cardeologia',
      description: 'Sistema imnume en pacientes hemofilicos',
      doctor: 'Dr. Christopher Reyes Santos',
      date: '30/03/2022',
      hour: '17:00-18:30'
    },
    {
      title: 'Neurologia',
      description: 'Sistema imnume en pacientes hemofilicos',
      doctor: 'Dr. Christian Cedillo',
      date: '30/03/2022',
      hour: '17:00-18:30'
    }
  ];

  const rejectedList = [
    {
      title: 'Hematologia',
      description: 'Sistema imnume en pacientes hemofilicos',
      doctor: 'Dr. Christopher Reyes Santos',
      date: '30/03/2022',
      hour: '17:00-18:30',
      edit: true
    },
    {
      title: 'Hematologia',
      description: 'Sistema imnume en pacientes hemofilicos',
      doctor: 'Dr. Christopher Reyes Santos',
      date: '30/03/2022',
      hour: '17:00-18:30',
      edit: true
    }
  ];

  return (
    <div>
      {/* {Object.keys(cardData).length === 0 ? (
        <>
          <Grid className={classes.boxArrow}>
            <Link to="/Conferences">
              <IconButton>
                <ArrowBackIcon className={classes.arrow} />
              </IconButton>
            </Link>
          </Grid>

          <Box className={classes.boxApproved}>
            <Typography className={classes.subtitleApproved}>
              {intl.formatMessage(messages.subtitleApproved)}
            </Typography>
            <Grid container spacing={3}>
              {toBeApprovedList.map((item) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={3}
                  onClick={() => setCardData(item)}
                >
                  <ApprovedCard item={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box className={classes.boxRejected}>
            <Typography className={classes.subtitleApproved}>
              {intl.formatMessage(messages.subtitleRejected)}
            </Typography>
            <Grid container spacing={3}>
              {rejectedList.map((item) => (
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  <ApprovedCard item={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      ) : ( 
        <>*/}
      <Grid className={classes.boxArrow}>
        <Link to="/webinars">
          <IconButton>
            <ArrowBackIcon className={classes.arrow} />
          </IconButton>
        </Link>
      </Grid>
      <Grid className={classes.body}>
        <Grid container spacing={1} className={classes.cardInformation}>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Grid>
              <img
                src="https://www.elhospital.com/documenta/imagenes/143569/EHg.jpg"
                className={classes.boxImage}
                alt="logo"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <VisibilityIcon />
            <Typography className={classes.title}>{cardData.title}</Typography>
            <Typography className={classes.description}>
              {cardData.description}
            </Typography>
            <Typography className={classes.doctor}>
              {cardData.doctor}
            </Typography>
            <Typography className={classes.date}>{cardData.date}</Typography>
            <Typography className={classes.hour}>{cardData.hour}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <ApproveForm
              handleSubmit={(values) => console.log(values)}
              formikRef={formikRef}
            />
            <Box display="flex" justifyContent="space-around">
              <Button
                className={classes.buttonApprove}
                onClick={() =>
                  handleOpenModal({
                    body: (
                      <>
                        <Box display="flex" justifyContent="flex-end">
                          <IconButton onClick={() => handleCloseModal()}>
                            <CloseIcon />
                          </IconButton>
                        </Box>

                        <Box
                          p={3}
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Typography
                            color="primary"
                            className={classes.notificationReject}
                          >
                            {intl.formatMessage(messages.notificationReject)}
                          </Typography>
                          <Button
                            color="primary"
                            onClick={() => handleCloseModal()}
                          >
                            {intl.formatMessage(messages.ok)}
                          </Button>
                        </Box>
                      </>
                    )
                  })
                }
              >
                {intl.formatMessage(messages.buttonApprove)}
              </Button>
              <Button
                className={classes.buttonReject}
                onClick={() =>
                  handleOpenModal({
                    body: (
                      <>
                        <Box display="flex" justifyContent="flex-end">
                          <IconButton onClick={() => handleCloseModal()}>
                            <CloseIcon />
                          </IconButton>
                        </Box>

                        <Box
                          p={3}
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Typography
                            color="primary"
                            className={classes.notificationReject}
                          >
                            {intl.formatMessage(messages.notificationReject)}
                          </Typography>
                          <Button
                            color="primary"
                            onClick={() => handleCloseModal()}
                          >
                            {intl.formatMessage(messages.ok)}
                          </Button>
                        </Box>
                      </>
                    )
                  })
                }
              >
                {intl.formatMessage(messages.buttonReject)}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {/* </> 
      )}*/}
    </div>
  );
};

Approve.propTypes = {};

export { Approve };
