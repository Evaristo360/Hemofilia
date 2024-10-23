import { useIntl } from 'react-intl';
import { messages } from '../MyWebinarCardMessages';
import DeleteIcon from '@material-ui/icons/DeleteOutlineRounded';
import EditIcon from '@material-ui/icons/EditOutlined';
import { useHistory } from 'react-router-dom';
import { useApi } from 'hooks';
import { useModal, ConfirmationDelete } from '@octopy/react-modal';

export const useActions = (webinar, setWebinars) => {
  const intl = useIntl();
  const history = useHistory();
  const { handleOpenModal, handleCloseModal } = useModal();
  const [undoWebinar] = useApi({
    endpoint: 'webinar/web/delete',
    method: 'delete'
  });
  const [archiveWebinar] = useApi({
    endpoint: '/webinar/web/file-away',
    method: 'put'
  });
  const [cancelWebinar] = useApi({
    endpoint: '/webinar/web/cancel',
    method: 'post'
  });

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

  const handleUndoWebinar = async () => {
    try {
      const {
        headerResponse: { status }
      } = await undoWebinar({ urlParams: webinar.id });

      if (status !== 200) {
        throw new Error();
      }

      setWebinars((webinars) => webinars.filter(({ id }) => id !== webinar.id));
    } catch (e) {
      console.log(e);
    }
  };

  const handleArchiveWebinar = async () => {
    try {
      const {
        headerResponse: { status }
      } = await archiveWebinar({ urlParams: webinar.id });

      if (status !== 200) {
        throw new Error();
      }

      setWebinars((webinars) => webinars.filter(({ id }) => id !== webinar.id));
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancelWebinar = async () => {
    try {
      const {
        headerResponse: { status }
      } = await cancelWebinar({ urlParams: webinar.id });

      if (status !== 200) {
        throw new Error();
      }

      const webinarToCancel = webinar;

      setWebinars((webinars) =>
        webinars.map((webinar) =>
          webinar.id === webinarToCancel.id
            ? { ...webinar, status: 'cancelada' }
            : webinar
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  switch (webinar.status) {
    case 'aprobada':
      return [
        {
          label: intl.formatMessage(messages.cancel),
          icon: <DeleteIcon />,
          action: () =>
            openConfirmationModal({
              title: intl.formatMessage(messages.sureToCancel),
              onAccept: handleCancelWebinar
            })
        }
      ];
    case 'pendiente':
      return [
        {
          label: intl.formatMessage(messages.undo),
          icon: <DeleteIcon />,
          action: () =>
            openConfirmationModal({
              title: intl.formatMessage(messages.sureToUndo),
              onAccept: handleUndoWebinar
            })
        },
        {
          label: intl.formatMessage(messages.edit),
          icon: <EditIcon />,
          action: () => history.push(`/webinarsWeb/edit/${webinar.id}`)
        }
      ];
    case 'rechazada':
      return [
        {
          label: intl.formatMessage(messages.archive),
          icon: <DeleteIcon />,
          action: () =>
            openConfirmationModal({
              title: intl.formatMessage(messages.sureToArchive),
              onAccept: handleArchiveWebinar
            })
        },
        {
          label: intl.formatMessage(messages.edit),
          icon: <EditIcon />,
          action: () => history.push(`/webinarsWeb/edit/${webinar.id}`)
        }
      ];
    case 'cancelada':
      return [
        {
          label: intl.formatMessage(messages.archive),
          icon: <DeleteIcon />,
          action: () =>
            openConfirmationModal({
              title: intl.formatMessage(messages.sureToArchive),
              onAccept: handleArchiveWebinar
            })
        }
      ];
    default:
      return [];
  }
};
