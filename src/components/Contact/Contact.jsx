import React from 'react';
import { useHistory } from 'react-router-dom';
import { LiveHelp, People, PermContactCalendar } from '@material-ui/icons';
import { Button, Grid } from '@material-ui/core';
import { useIntl } from 'react-intl';

import ContactCard from 'components/Cards/ContactCard/ContactCard';
import { useStyles } from './ContactStyle';

import { messages as contactMessages } from './ContactMessages';

const Contact = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const intl = useIntl();

  const dataContactDoctor = [
    {
      nameDoctor: 'Dra. Angélica Licona Sanabria',
      post: 'Proyectos, publicaciones, RWE',
      email: 'KGSN@novonordisk.com'
    },
    {
      nameDoctor: 'Dra. Daniela Gonzalez Herrera',
      post: 'Equipos multidisciplinarios en hemofilia',
      email: 'GHDN@novonordisk.com'
    },
    {
      nameDoctor: 'QFB. Patricia Cruz Puente',
      post: 'Laboratorio Diagnóstico de coagulación',
      email: 'PCPT@novonordisk.com'
    },
    {
      nameDoctor: 'Marilyn Gisselle Mendoza Baquedano',
      post: 'Otros trastornos raros de coagulación',
      email: 'VMGB@novonordisk.com'
    }
  ];

  return (
    <Grid container style={{ padding: '0 90px', height: '100%' }}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={6}
        className={`${classes.gridItem}`}
      >
        <ContactCard
          IconComponent={PermContactCalendar}
          title={intl.formatMessage(contactMessages.contactTitle)}
          description={dataContactDoctor.map((doctorData, index) => (
            <div
              className={
                index != dataContactDoctor.length - 1
                  ? classes.bottomBorder
                  : classes.addPadding
              }
            >
              <div>
                {intl.formatMessage(contactMessages.contactDescNameLabel)}{' '}
                {doctorData.nameDoctor}
              </div>
              <div>
                {intl.formatMessage(contactMessages.contactDescPositionLabel)}{' '}
                {doctorData.post}
              </div>
              <div>
                {intl.formatMessage(contactMessages.contactDescEmailLabel)}{' '}
                {doctorData.email}
              </div>
              {/* <div>
              {intl.formatMessage(contactMessages.contactDescPhoneLabel)}{' '}
              {intl.formatMessage(contactMessages.contactDescPhoneText)}
            </div> */}
              {}
            </div>
          ))}
          footer={
            <div>
              <div className={classes.scheduleTitle}>
                {intl.formatMessage(contactMessages.contactScheduleTitle)}
              </div>{' '}
              {intl.formatMessage(contactMessages.contactScheduleDescription)}
            </div>
          }
        />
      </Grid>
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={12}
        lg={6}
        className={classes.gridItem}
      >
        <Grid item lg={12} md={12} xs={12} className={`${classes.itemFirst}`}>
          <ContactCard
            IconComponent={People}
            title={intl.formatMessage(contactMessages.directoryTitle)}
            description={
              <div>
                {intl.formatMessage(contactMessages.directoryDescription)}
              </div>
            }
            footer={
              <>
                <Button
                  color="primary"
                  onClick={() => history.push('/directorio')}
                >
                  {intl.formatMessage(
                    contactMessages.directoryDirectoryButtonText
                  )}
                </Button>
                <Button
                  color="primary"
                  onClick={() => history.push('/webinarsWeb/create')}
                >
                  {intl.formatMessage(
                    contactMessages.directoryConferenceButtonText
                  )}
                </Button>
              </>
            }
          />
        </Grid>
        <Grid item lg={12} md={12} xs={12} className={`${classes.itemSecond}`}>
          <ContactCard
            IconComponent={LiveHelp}
            title={intl.formatMessage(contactMessages.faqsTitle)}
            description={
              <div>{intl.formatMessage(contactMessages.faqsDescription)}</div>
            }
            footer={
              <Button color="primary" onClick={() => history.push('/FAQS')}>
                {intl.formatMessage(contactMessages.faqsButtonText)}
              </Button>
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

Contact.propTypes = {};

export default Contact;
