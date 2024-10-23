/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { get } from 'lodash';
import { Grid, IconButton } from '@material-ui/core';
import { messages } from './DocumentsWebMessages';
import { useStyles } from './DocumentsWebStyles';
import { ExpandMore, FileCopy } from '@material-ui/icons';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Rating from '@material-ui/lab/Rating';
import ResearchCard from 'components/Cards/ResearchCard/ResearchCard';
import useApiCalls from './useApiCalls';
import { useModal } from '@octopy/react-modal';
import { RateContentHeader } from 'components/RateContent/RateContentHeader/RateContentHeader';
import { RateContentBody } from 'components/RateContent/RateContentBody/RateContentBody';

const DocumentsWeb = ({
  match: {
    params: { documentId }
  }
}) => {
  const cardsNumber = 4;
  const intl = useIntl();
  const classes = useStyles();
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [
    getDocumentsList,
    getDocumentById,
    voteDocumentById,
    getDocument
  ] = useApiCalls();
  const { handleCloseModal, handleOpenModal } = useModal();
  const [rating, setRating] = useState(0);
  const [iterator, setIterator] = useState(1);

  const seeMore = () => {
    const itemsNumber = cardsNumber * (iterator + 1);

    if (iterator + 1 <= Math.ceil(originalData.length / cardsNumber)) {
      setData(originalData.slice(0, itemsNumber));
      setIterator(iterator + 1);
    }
  };

  const initData = async () => {
    const files = await getDocumentsList();

    if (files) {
      setOriginalData(files);
      setData(files.slice(0, cardsNumber));
    }
  };

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if (documentId) {
      handleOpenDocumentModal(documentId);
    }
  }, [documentId]);

  const handleOpenDocumentModal = async (documentId) => {
    const data = await getDocumentById(documentId);

    handleOpenModal({
      body: (
        <div className={classes.videoContainer}>
          <div className={classes.closeIconContainer}>
            <IconButton
              onClick={() => handleCloseModal()}
              className={classes.iconButton}
            >
              <ArrowBackIcon className={classes.iconClose} />
            </IconButton>
            <div className={classes.centerText}>
              {intl.formatMessage(messages.ratingText)}
              &nbsp;
              <Rating
                name="simple-controlled"
                defaultValue={rating}
                value={data.document_vote_average}
                className={classes.rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                  voteDocumentById(data._id, newValue);
                }}
              />
            </div>
          </div>
          <div className={classes.centerText}>
            <strong>{data.title}</strong>
          </div>
          <embed
            type="application/pdf"
            src={`${data.url}#toolbar=0`}
            width="960px"
            height="540px"
          />
        </div>
      )
    });
  };

  const openContent = async (item, contentType) => {
    try {
      const { title, _id } = item;

      if (!contentType) return;
      let response = '';

      if (contentType === 'pdf') {
        response = await getDocument({
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
              getLastContentList={initData}
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

  const renderCard = () => {
    const cards = [];

    data.map((item, index) => {
      cards.push(
        <Grid item xs={12} sm={12} md={3} lg={3} key={index}>
          <ResearchCard
            data={item}
            textLink={intl.formatMessage(messages.action)}
            onClick={() => openContent(item, 'pdf')}
          >
            <div className={classes.title}>{item.title}</div>
            <div className={classes.description}>{item.description}</div>
          </ResearchCard>
        </Grid>
      );
    });

    return cards;
  };

  return (
    <>
      <Grid className={classes.mainContainer}>
        <div className={classes.haderContainer}>
          <FileCopy className={classes.icon} />
          <div className={classes.docsStat}>{originalData.length}</div>
        </div>
      </Grid>
      <Grid container spacing={2} className={classes.container}>
        {renderCard()}
      </Grid>
      <div className={classes.footerContainer}>
        <div className={classes.expandContainer} onClick={seeMore}>
          <div>{intl.formatMessage(messages.more)}</div>
          <ExpandMore />
        </div>
      </div>
    </>
  );
};

DocumentsWeb.propTypes = {};

export { DocumentsWeb };
