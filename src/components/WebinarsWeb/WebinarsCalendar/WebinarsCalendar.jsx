import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { messages } from './WebinarsCalendarMessages';
import { useStyles } from './WebinarsCalendarStyles';
import { WebinarCard } from '../WebinarCard/WebinarCard';
import LikeIcon from '@material-ui/icons/FavoriteBorder';
import { usePagination } from 'components/Pagination/hooks/usePagination';
import { Pagination } from 'components/Pagination/Pagination';
import LiveIcon from '@material-ui/icons/PlayArrow';
import { useApi } from 'hooks';
import { mapWebinars } from './helpers';
import { LoadingWebinars } from '../LoadingWebinars/LoadingWebinars';
import { NoWebinarsYet } from '../NoWebinarsYet/NoWebinarsYet';

const WebinarsCalendar = () => {
  const history = useHistory();
  const intl = useIntl();
  const classes = useStyles();
  const [getApprovedWebinars] = useApi({
    endpoint: '/webinar/web/list-approved',
    method: 'get'
  });

  const [setLikeWebinar] = useApi({
    endpoint: '/webinar/web/set-like',
    method: 'post'
  });

  const [webinars, setWebinars] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await getApprovedWebinars();

        setWebinars(
          response?.payload ? mapWebinars(response.payload) : undefined
        );
      } catch {}
    })();
  }, []);

  const pagination = usePagination({
    scrollToTopAfterChangingPage: true
  });

  const handleLike = async (webinarToLike) => {
    const response = await setLikeWebinar({
      urlParams: webinarToLike.id,
      body: {
        like: !webinarToLike.like
      }
    });

    if (response?.headerResponse?.status === 200) {
      setWebinars((webinars) =>
        webinars.map((webinar) => ({
          ...webinar,
          like: webinar.id === webinarToLike.id ? !webinar.like : webinar.like
        }))
      );
    }
  };

  return (
    <div className={classes.container}>
      {webinars?.length > 0 ? (
        webinars
          .slice(
            (pagination.page - 1) * pagination.rowsPerPage,
            pagination.page * pagination.rowsPerPage
          )
          .map((webinar) => (
            <WebinarCard
              key={`webinar-${webinar.id}`}
              webinar={webinar}
              action={{
                label: intl.formatMessage(
                  messages[webinar.live ? 'enter' : 'like']
                ),
                icon: webinar.live ? <LiveIcon /> : <LikeIcon />,
                action: () =>
                  !webinar.live
                    ? handleLike(webinar)
                    : history.push(`/stream/${webinar.id}`),
                className: `${classes.actionButton} ${
                  webinar.like || webinar.live ? 'active' : ''
                }`
              }}
            />
          ))
      ) : webinars ? (
        <NoWebinarsYet />
      ) : (
        <LoadingWebinars />
      )}

      {webinars?.length > 4 && (
        <Pagination
          length={webinars.length}
          {...pagination}
          className={classes.pagination}
        />
      )}
    </div>
  );
};

export { WebinarsCalendar };
