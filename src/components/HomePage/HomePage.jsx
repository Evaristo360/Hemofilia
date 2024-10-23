import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Container, Grid, Typography } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import { messages } from './HomePageMessages';
import InfoCard from 'components/Cards/InfoCard/InfoCard';
import { useStyles } from './HomePageStyles';
import { Link } from 'react-router-dom';
import { get, size } from 'lodash';
import { useApi } from 'hooks';
import { useRootProvider } from 'components/RootProvider';
import { HomeCard } from './HomeCard';
import { useModal } from '@octopy/react-modal';
import { RateContentHeader, RateContentBody } from 'components/RateContent';

const HomePage = () => {
  const [webinarsNumber, setWebinarsNumber] = useState([]);
  const classes = useStyles();
  const { formatMessage: f } = useIntl();
  const { handleOpenModal } = useModal();
  const {
    rootState,
    handleChangeLastDocuments,
    handleChangeLastVideos
  } = useRootProvider();
  const {
    lastContent: { lastDocuments, lastVideos }
  } = rootState;

  const [getLastContent] = useApi({
    endpoint: 'home/web/list',
    method: 'get'
  });

  const getLastContentList = async () => {
    try {
      const response = await getLastContent();

      const docs = get(response, ['payload', 'lastDocuments'], []);
      const videos = get(response, ['payload', 'lastVideos'], []);
      const total = get(response, 'payload.webinarApprovedTotal', 0);

      setWebinarsNumber(total);
      handleChangeLastDocuments(docs);
      handleChangeLastVideos(videos);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getLastContentList();
  }, []);

  const [getDocument] = useApi({
    endpoint: 'document/web/get',
    method: 'get'
  });

  const [getVideo] = useApi({
    endpoint: 'video/web/get',
    method: 'get'
  });

  const openContent = async (item, contentType) => {
    try {
      const { title, _id } = item;

      if (!contentType) return;
      let response = '';

      if (contentType === 'pdf') {
        response = await getDocument({
          urlParams: _id
        });
      } else if (contentType === 'video') {
        response = await getVideo({
          urlParams: _id
        });
      }

      const vote = get(response, ['payload', 'doctor_voted'], 0);

      const url = get(response, ['payload', 'url'], null);

      if (url) {
        handleOpenModal({
          title: (
            <RateContentHeader
              title={title}
              contentId={_id}
              score={vote}
              contentType={contentType}
              getLastContentList={getLastContentList}
            />
          ),
          body: (
            <RateContentBody
              title={title}
              contentType={contentType}
              src={url}
            />
          ),
          configProps: {
            fullScreen: true,
            maxWidth: false
          }
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid
          item
          xs={12}
          sm={6}
          md={5}
          lg={3}
          className={classes.seminarsContainer}
        >
          <Link className={classes.link} to="/webinarsWeb">
            <InfoCard
              IconComponent={FileCopy}
              title={f(messages.approvedSeminars)}
              stat={webinarsNumber}
            />
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h1" className={classes.sectionTitle}>
            {f(messages.lastDocuments)}
          </Typography>
        </Grid>
        <Grid
          container
          spacing={size(lastDocuments) > 0 ? 2 : 0}
          className={classes.cardsContainer}
        >
          {lastDocuments.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={`last-videos-${index}`}
            >
              <HomeCard
                key={item._id}
                img={item.image}
                caption={item.speciality}
                title={item.title}
                description={item.description}
                stars={item.vote_average}
              >
                <Typography
                  variant="button"
                  className={classes.cardActionLabel}
                  onClick={() => openContent(item, 'pdf')}
                >
                  {f(messages.read)}
                </Typography>
              </HomeCard>
            </Grid>
          ))}
          {size(lastDocuments) < 1 && (
            <Grid item xs={12}>
              <Typography variant="body2">{f(messages.noDocuments)}</Typography>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h1" className={classes.sectionTitle}>
            {f(messages.lastVideosAdded)}
          </Typography>
        </Grid>
        <Grid
          container
          spacing={size(lastVideos) > 0 ? 2 : 0}
          className={classes.cardsContainer}
        >
          {lastVideos.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={`last-videos-${index}`}
            >
              <HomeCard
                key={item._id}
                img={item.image}
                caption={item.speciality}
                title={item.title}
                description={item.description}
                stars={item.vote_average}
              >
                <Typography
                  variant="button"
                  className={classes.cardActionLabel}
                  onClick={() => openContent(item, 'video')}
                >
                  {f(messages.watchVideo)}
                </Typography>
              </HomeCard>
            </Grid>
          ))}
          {size(lastDocuments) < 1 && (
            <Grid item xs={12}>
              <Typography variant="body2">{f(messages.noVideos)}</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
