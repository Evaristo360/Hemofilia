import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Typography, Box, Grid, Button, IconButton } from '@material-ui/core';
import { messages } from './DocumentsMessages';
import { useStyles } from './DocumentsStyles';
import PublishIcon from '@material-ui/icons/Publish';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Table } from '@octopy/react-table';
import { useModal } from '@octopy/react-modal';
import { Close } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import useApiCalls from './useApiCalls';
import { UploadVideos } from '../Videos/UploadVideos';
import { tableHead, filters } from './utils';
import { useLoader } from '@octopy/react-loader';
import { uploadFile } from '@octopy/react-aws-utils';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArchiveIcon from '@material-ui/icons/Archive';

const Documents = (props) => {
  const intl = useIntl();
  const classes = useStyles();
  const { handleShowLoader } = useLoader();
  const { handleCloseModal, handleOpenModal } = useModal();
  const [documents, setDocuments] = useState([]);
  const [specialty, setSpecialty] = useState([]);
  const [
    getDocumentsList,
    getSpecialtyList,
    getDocumentById,
    createDocument,
    changeStatusDocumentById,
    deleteDocumentById,
    updateDocumentById,
    getDocumentsCSV
  ] = useApiCalls();

  useEffect(() => {
    getDocumentsList(setDocuments);
    getSpecialtyList(setSpecialty);
  }, []);

  const actionFunctions = {
    view: {
      text: intl.formatMessage(messages.view),
      icon: VisibilityIcon,
      onClick: async (item) => {
        const data = await getDocumentById(item._id);

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
              <embed
                type="application/pdf"
                src={`${data.url}#toolbar=0`}
                width="960px"
                height="540px"
              />
            </div>
          )
        });
      }
    },
    edit: {
      text: intl.formatMessage(messages.menuEditLabel),
      icon: EditIcon,
      onClick: async (item) => {
        const data = await getDocumentById(item._id);

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
                    await changeStatusDocumentById(item._id, 'publicado');
                    handleCloseModal(item);
                    await getDocumentsList(setDocuments);
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
                    await changeStatusDocumentById(item._id, 'archivado');
                    handleCloseModal(item);
                    await getDocumentsList(setDocuments);
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
                    await deleteDocumentById(item._id);
                    handleCloseModal(item);
                    await getDocumentsList(setDocuments);
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

  const handleOpenCreate = (event) => {
    const file = event.target.files[0];

    if (file.name) {
      handleOpenModal({
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
          await createDocument(data, fileUrl, setDocuments);
        }
      });
    } else {
      await updateDocumentById(id, data, setDocuments);
    }

    handleShowLoader(false);
  };

  const downloadCsv = async () => {
    await getDocumentsCSV();
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
              accept=".pdf"
              style={{ display: 'none' }}
              id="documentFile"
              onChange={(e) => {
                if (e.target.files.length) handleOpenCreate(e);
              }}
            />
            <label htmlFor="documentFile">
              <Button
                color="secondary"
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
              {documents.length} {intl.formatMessage(messages.totalFiles)}
            </Typography>
            <Button color="secondary" onClick={downloadCsv}>
              {intl.formatMessage(messages.exportCsv)}
            </Button>
          </Box>
        </Box>
        <Grid>
          <Table
            data={documents}
            columns={tableHead}
            configProps={configProps}
          />
        </Grid>
      </Box>
    </div>
  );
};

Documents.propTypes = {};

export { Documents };
