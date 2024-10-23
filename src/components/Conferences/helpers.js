import React from 'react';
import { formatDate, formatTime, msToTime } from 'utils/dates';
import { Box, Button, Typography } from '@material-ui/core';
import { responseMapper } from 'utils/responseMapper';
import { ConfirmationDelete } from '@octopy/react-modal';
import {
  WebinarDetailsModalBody,
  WebinarDetailsModalActions
} from './WebinarDetailsModal';
import { VimeoDataModalBody, VimeoDataModalActions } from './VimeoDataModal';
import { messages } from './ConferencesMessages';
import { WebinarDetails } from 'components/WebinarDetails/WebinarDetails';
import { CancelWebinarModalBody } from './CancelWebinarModal/CancelWebinarModalBody/CancelWebinarModalBody';
import { CancelWebinarModalActions } from './CancelWebinarModal/CancelWebinarModalActions/CancelWebinarModalActions';

const webinarsTemplate = {
  id: '_id',
  publicId: 'public_id',
  theme: 'subject',
  imageUrl: 'picture',
  startDate: 'start_date',
  endDate: 'end_date',
  status: 'status',
  description: 'description',
  doctorName: 'doctor_name',
  doctorSpeciality: 'doctor_speciality',
  eventId: 'event_id'
};

export const mapWebinars = (webinars, intl) => {
  const mappedWebinars = responseMapper({
    template: webinarsTemplate,
    data: webinars
  }).map((webinar) => ({
    ...webinar,
    startDate: new Date(webinar.startDate),
    endDate: new Date(webinar.endDate),
    date: `${formatDate(new Date(webinar.startDate), intl)}, ${formatTime(
      new Date(webinar.startDate),
      intl
    )}`,
    duration: msToTime(
      new Date(webinar.endDate) - new Date(webinar.startDate),
      intl
    )
  }));

  return mappedWebinars;
};

export const getActions = (
  webinar,
  {
    modal,
    intl,
    setWebinars,
    webinarDetailsModalFormikRef,
    vimeoDataModalFormikRef,
    history
  }
) => {
  const { handleOpenModal, handleCloseModal } = modal;

  const isOld = webinar.startDate < new Date();

  const openConfirmationModal = ({ title, onAccept }) => {
    handleOpenModal({
      body: title,
      actionButtons: (
        <ConfirmationDelete
          handleDelete={() => {
            handleCloseModal();
            onAccept();
          }}
        />
      ),
      configProps: {
        maxWidth: 'xs'
      }
    });
  };

  const openCancelWebinarModal = async () => {
    handleOpenModal({
      title: (
        <Typography color="primary" variant="title">
          {intl.formatMessage(messages.cancelWebinar)}
        </Typography>
      ),
      body: (
        <CancelWebinarModalBody
          webinar={webinar}
          formikRef={webinarDetailsModalFormikRef}
          setWebinars={setWebinars}
        />
      ),
      actionButtons: (
        <CancelWebinarModalActions formikRef={webinarDetailsModalFormikRef} />
      ),
      configProps: {
        maxWidth: 'sm'
      }
    });
  };

  const openReviewModal = () =>
    handleOpenModal({
      title: (
        <Typography color="primary" variant="title">
          {intl.formatMessage(messages.reviewWebinar)}
        </Typography>
      ),
      body: (
        <WebinarDetailsModalBody
          webinar={webinar}
          formikRef={webinarDetailsModalFormikRef}
          setWebinars={setWebinars}
        />
      ),
      actionButtons: (
        <WebinarDetailsModalActions formikRef={webinarDetailsModalFormikRef} />
      ),
      configProps: {
        maxWidth: 'sm'
      }
    });

  const openVimeoModal = () =>
    handleOpenModal({
      title: (
        <Typography color="primary" variant="title">
          {intl.formatMessage(messages.assignVimeo)}
        </Typography>
      ),
      body: (
        <VimeoDataModalBody
          webinar={webinar}
          setWebinars={setWebinars}
          formikRef={vimeoDataModalFormikRef}
        />
      ),
      actionButtons: (
        <VimeoDataModalActions
          webinar={webinar}
          formikRef={vimeoDataModalFormikRef}
        />
      ),
      configProps: {
        maxWidth: 'xs'
      }
    });

  const openViewModal = () =>
    handleOpenModal({
      title: (
        <Typography color="primary" variant="title">
          {intl.formatMessage(messages.viewWebinar)}
        </Typography>
      ),
      body: <WebinarDetails webinar={webinar} />,
      actionButtons: (
        <Box pr={1} pb={1}>
          <Button color="primary" onClick={handleCloseModal}>
            {intl.formatMessage(messages.close)}
          </Button>
        </Box>
      ),
      configProps: {
        maxWidth: 'sm'
      }
    });

  const goToEditWebinar = () =>
    history.push(`/admin/webinars/edit/${webinar.id}`);

  if (isOld) {
    return [
      {
        text: intl.formatMessage(messages.view),
        onClick: openViewModal
      }
    ];
  }

  switch (webinar.status) {
    case 'pendiente':
      return [
        {
          text: intl.formatMessage(messages.view),
          onClick: openViewModal
        },
        {
          text: intl.formatMessage(messages.review),
          onClick: openReviewModal
        },
        {
          text: intl.formatMessage(messages.edit),
          onClick: goToEditWebinar
        }
      ];
    case 'aprobada':
      return [
        {
          text: intl.formatMessage(messages.view),
          onClick: openViewModal
        },
        {
          text: intl.formatMessage(messages.vimeo),
          onClick: openVimeoModal
        },
        {
          text: intl.formatMessage(messages.edit),
          onClick: goToEditWebinar
        },
        {
          text: intl.formatMessage(messages.cancel),
          onClick: openCancelWebinarModal
        }
      ];
    case 'rechazada':
      return [
        {
          text: intl.formatMessage(messages.view),
          onClick: openViewModal
        },
        {
          text: intl.formatMessage(messages.edit),
          onClick: goToEditWebinar
        }
      ];
    default:
      return [
        {
          text: intl.formatMessage(messages.view),
          onClick: openViewModal
        }
      ];
  }
};
