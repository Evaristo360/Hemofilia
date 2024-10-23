import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Typography, Box, Grid, Button, IconButton } from '@material-ui/core';
import { messages } from './VideosMessages';
import { useStyles } from './VideosStyles';
import { tableHead, filters } from './utils';
import PublishIcon from '@material-ui/icons/Publish';
import { Table } from '@octopy/react-table';
import { useModal } from '@octopy/react-modal';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Close } from '@material-ui/icons';
import { UploadVideos } from './UploadVideos/UploadVideos';
import { uploadFile } from '@octopy/react-aws-utils';
import { useLoader } from '@octopy/react-loader';
import useApiCalls from './useApiCalls';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArchiveIcon from '@material-ui/icons/Archive';

const Videos = () => {
  const intl = useIntl();
  const classes = useStyles();
  const { handleShowLoader } = useLoader();
  const { handleCloseModal, handleOpenModal } = useModal();
  const [videos, setVideos] = useState([]);
  const [specialty, setSpecialty] = useState([]);
  const [
    getVideosList,
    getVideoById,
    getSpecialtyList,
    createVideo,
    changeStatusVideoById,
    deleteVideoById,
    updateVideoById,
    getVideosCSV
  ] = useApiCalls();

  useEffect(() => {
    getVideosList(setVideos);
    getSpecialtyList(setSpecialty);
  }, []);

  const handleOpenEdition = (item) => {
    handleOpenModal({
      closeButton: true,
      title: (
        <Grid className={classes.contentForm}>
          <Grid className={classes.contentIcon}>
            <IconButton onClick={() => handleCloseModal()}>
              <Close className={classes.iconClose} />
            </IconButton>
          </Grid>
          <Typography className={classes.titleModal}>
            {intl.formatMessage(messages.titleEditModal)}
          </Typography>
        </Grid>
      ),
      body: (
        <UploadVideos
          item={item}
          specialtyList={specialty}
          onSubmit={(values, id) => handleOnSubmit(values, null, id)}
        />
      )
    });
  };

  const actionFunctions = {
    view: {
      text: intl.formatMessage(messages.view),
      icon: VisibilityIcon,
      onClick: async (item) => {
        const data = await getVideoById(item._id);

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
              </div>
              <div className={classes.centerText}>
                <strong>{item.title}</strong>
              </div>
              <video
                controlsList="nodownload"
                controls
                className={classes.video}
              >
                <source src={data.url} type="video/mp4" />
                <track kind="captions" />
                Your browser does not support the video tag.
              </video>
            </div>
          )
        });
      }
    },
    edit: {
      text: intl.formatMessage(messages.menuEditLabel),
      icon: EditIcon,
      onClick: async (item) => {
        const data = await getVideoById(item._id);

        handleOpenEdition(data);
      }
    },
    publish: {
      text: intl.formatMessage(messages.toPublish),
      icon: PublishIcon,
      onClick: async (item) => {
        handleOpenModal({
          title: (
            <Grid className={classes.contentForm}>
              <Grid className={classes.contentIcon}>
                <IconButton onClick={() => handleCloseModal()}>
                  <Close className={classes.iconClose} />
                </IconButton>
              </Grid>
              <Typography className={classes.titleModal}>
                {intl.formatMessage(messages.confirmPublishTitle)}
              </Typography>
            </Grid>
          ),
          body: (
            <div className={classes.confirmContainer}>
              <p className={classes.centerText}>
                ¿{intl.formatMessage(messages.confirmPublishText)}
                <strong>&nbsp;{item.title}</strong>?
              </p>
              <Box
                className={classes.confirmButtonsContainer}
                justifyContent="flex-end"
              >
                <Button
                  className={classes.confirmButton}
                  onClick={handleCloseModal}
                  variant="outlined"
                  color="default"
                >
                  {intl.formatMessage(messages.confirmButtonNo)}
                </Button>
                <Button
                  className={classes.confirmButton}
                  variant="contained"
                  color="primary"
                  onClick={async () => {
                    await changeStatusVideoById(item._id, 'publicado');
                    handleCloseModal(item);
                    await getVideosList(setVideos);
                  }}
                >
                  {intl.formatMessage(messages.confirmButtonYes)}
                </Button>
              </Box>
            </div>
          )
        });
      }
    },
    disable: {
      text: intl.formatMessage(messages.toArchive),
      icon: ArchiveIcon,
      onClick: async (item) => {
        handleOpenModal({
          title: (
            <Grid className={classes.contentForm}>
              <Grid className={classes.contentIcon}>
                <IconButton onClick={() => handleCloseModal()}>
                  <Close className={classes.iconClose} />
                </IconButton>
              </Grid>
              <Typography className={classes.titleModal}>
                {intl.formatMessage(messages.confirmTitle)}
              </Typography>
            </Grid>
          ),
          body: (
            <div className={classes.confirmContainer}>
              <p className={classes.centerText}>
                ¿{intl.formatMessage(messages.confirmText)}
                <strong>&nbsp;{item.title}</strong>?
              </p>
              <Box
                className={classes.confirmButtonsContainer}
                justifyContent="flex-end"
              >
                <Button
                  className={classes.confirmButton}
                  onClick={handleCloseModal}
                  variant="outlined"
                  color="default"
                >
                  {intl.formatMessage(messages.confirmButtonNo)}
                </Button>
                <Button
                  className={classes.confirmButton}
                  variant="contained"
                  color="primary"
                  onClick={async () => {
                    await changeStatusVideoById(item._id, 'archivado');
                    handleCloseModal(item);
                    await getVideosList(setVideos);
                  }}
                >
                  {intl.formatMessage(messages.confirmButtonYes)}
                </Button>
              </Box>
            </div>
          )
        });
      }
    },
    delete: {
      text: intl.formatMessage(messages.menuDeleteLabel),
      icon: DeleteOutlineIcon,
      onClick: async (item) => {
        handleOpenModal({
          title: (
            <Grid className={classes.contentForm}>
              <Grid className={classes.contentIcon}>
                <IconButton onClick={() => handleCloseModal()}>
                  <Close className={classes.iconClose} />
                </IconButton>
              </Grid>
              <Typography className={classes.titleModal}>
                {intl.formatMessage(messages.modalDeleteTitle)}
              </Typography>
            </Grid>
          ),
          body: (
            <div className={classes.confirmContainer}>
              <p className={classes.centerText}>
                ¿{intl.formatMessage(messages.modalDeleteQuestion)}
                <strong>&nbsp;{item.title}</strong>?
              </p>
              <Box
                className={classes.confirmButtonsContainer}
                justifyContent="flex-end"
              >
                <Button
                  className={classes.confirmButton}
                  onClick={handleCloseModal}
                  variant="outlined"
                  color="default"
                >
                  {intl.formatMessage(messages.confirmButtonNo)}
                </Button>
                <Button
                  className={classes.confirmButton}
                  variant="contained"
                  color="primary"
                  onClick={async () => {
                    await deleteVideoById(item._id);
                    handleCloseModal(item);
                    await getVideosList(setVideos);
                  }}
                >
                  {intl.formatMessage(messages.confirmButtonYes)}
                </Button>
              </Box>
            </div>
          )
        });
      }
    }
  };

  const configProps = {
    filters,
    actions: (item) => {
      switch (item.status) {
        case 'archivado':
          return {
            customs: [actionFunctions.view]
          };
        case 'publicado':
          return {
            customs: [
              actionFunctions.view,
              actionFunctions.edit,
              actionFunctions.disable
            ]
          };
        case 'en revisión':
          return {
            customs: [
              actionFunctions.view,
              actionFunctions.edit,
              actionFunctions.publish,
              actionFunctions.disable,
              actionFunctions.delete
            ]
          };
        default:
          break;
      }
    },
    selectedOptions: {
      checkboxHidden: true
    }
  };

  const handleOpenCreate = (event) => {
    const file = event.target.files[0];

    if (file.name) {
      handleOpenModal({
        closeButton: true,
        title: (
          <Grid className={classes.contentForm}>
            <Grid className={classes.contentIcon}>
              <IconButton onClick={() => handleCloseModal()}>
                <Close className={classes.iconClose} />
              </IconButton>
            </Grid>
            <Typography className={classes.titleModal}>
              {intl.formatMessage(messages.titleModal)}
            </Typography>
          </Grid>
        ),
        body: (
          <>
            <UploadVideos
              specialtyList={specialty}
              onSubmit={(values) => handleOnSubmit(values, file)}
            />
          </>
        )
      });
    }
  };

  const handleOnSubmit = async (data, file, id = null) => {
    handleShowLoader(true);

    if (file) {
      uploadFile({
        file,
        onError: (error) => {
          handleShowLoader(false);
        },
        onSuccess: async (fileUrl) => {
          await createVideo(data, fileUrl, setVideos);
          handleShowLoader(false);
        }
      });
    } else {
      await updateVideoById(id, data, setVideos);
      handleShowLoader(false);
    }
  };

  const downloadCsv = async () => {
    await getVideosCSV();
  };

  return (
    <div>
      <Box className={classes.bodyVideos}>
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
            <input
              type="file"
              accept="video/*"
              style={{ display: 'none' }}
              id="videoFile"
              onChange={(e) => {
                if (e.target.files.length) handleOpenCreate(e);
              }}
            />
            <label htmlFor="videoFile">
              <Button
                className={classes.button}
                variant="contained"
                component="span"
                endIcon={<PublishIcon />}
              >
                {intl.formatMessage(messages.buttonUpload)}
              </Button>
            </label>
          </Grid>
        </Grid>
        <Box>
          <Box className={classes.exportButtonContainer}>
            <Typography className={classes.totalFiles}>
              {videos.length} {intl.formatMessage(messages.totalFiles)}
            </Typography>
            <Button color="secondary" onClick={downloadCsv}>
              {intl.formatMessage(messages.exportCsv)}
            </Button>
          </Box>
        </Box>

        <Grid>
          <Table data={videos} columns={tableHead} configProps={configProps} />
        </Grid>
      </Box>
    </div>
  );
};

Videos.propTypes = {};

export { Videos };
