import { responseMapper } from 'utils/responseMapper';

const notificationTemplate = {
  id: '_id',
  title: 'title',
  description: 'description',
  contentId: 'content_id',
  contentType: 'content_type',
  imageUrl: 'picture',
  publicId: 'public_id'
};

export const mapNotifications = (notifications) => {
  const mappedNotifications = responseMapper({
    data: notifications,
    template: notificationTemplate
  });

  return mappedNotifications;
};

export const getOnClick = (notification, { history }) => {
  switch (notification.contentType) {
    case 'webinar':
      return () => history.push(`/stream/${notification.contentId}`);
    case 'video':
      return () => history.push(`/videosWeb/${notification.contentId}`);
    case 'documento':
      return () => history.push(`/documentsWeb/${notification.contentId}`);
    default:
      return undefined;
  }
};
