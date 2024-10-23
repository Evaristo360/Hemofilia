import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Typography,
  ButtonBase,
  CircularProgress
} from '@material-ui/core';
import { useStyles } from './NotificationsStyles';
import { useApi } from 'hooks';
import { getOnClick, mapNotifications } from './helpers';
import { useDrawer } from 'components/Drawer';
import { useRootProvider } from 'components/RootProvider';
import { useHistory } from 'react-router-dom';

const Notifications = () => {
  const history = useHistory();
  const classes = useStyles();
  const [getNotifications] = useApi({
    endpoint: 'home/web/list-notifications',
    method: 'get'
  });
  const { handleCloseDrawer } = useDrawer();
  const {
    handleChangeNotifications,
    rootState: { notifications }
  } = useRootProvider();

  useEffect(() => {
    if (notifications?.length) {
      return;
    }

    (async () => {
      try {
        const {
          headerResponse: { status },
          payload: notifications
        } = await getNotifications();

        if (status === 200) {
          handleChangeNotifications(mapNotifications(notifications));
        } else {
          throw new Error();
        }
      } catch (e) {
        handleCloseDrawer();
      }
    })();
  }, []);

  return (
    <div className={classes.container}>
      {notifications ? (
        notifications.map((notification) => (
          <ButtonBase
            className={classes.notification}
            onClick={() => {
              getOnClick(notification, { history })();
              handleCloseDrawer();
            }}
          >
            <Box pt={0.5} pr={1}>
              <Avatar src={notification.imageUrl} />
            </Box>
            <Box>
              <Typography color="primary" variant="subtitle1">
                {notification.title}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {notification.description}
              </Typography>
            </Box>
          </ButtonBase>
        ))
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export { Notifications };
