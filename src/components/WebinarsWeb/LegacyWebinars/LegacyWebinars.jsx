import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from './LegacyWebinarsStyles';
import { WebinarCard } from '../WebinarCard/WebinarCard';
import { usePagination } from 'components/Pagination/hooks/usePagination';
import { Pagination } from 'components/Pagination';
import { useApi } from 'hooks';
import { mapWebinars } from './helpers';
import { LoadingWebinars } from 'components/WebinarsWeb/LoadingWebinars/LoadingWebinars';
import { NoWebinarsYet } from '../NoWebinarsYet/NoWebinarsYet';
import { useIntl } from 'react-intl';
import { messages } from './WebinarsCalendarMessages';
import PlayIcon from '@material-ui/icons/PlayArrowRounded';

const LegacyWebinars = () => {
  const intl = useIntl();
  const history = useHistory();
  const classes = useStyles();
  const [getLegacyWebinars] = useApi({
    endpoint: '/webinar/web/list-legacy',
    method: 'get'
  });

  const [webinars, setWebinars] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await getLegacyWebinars();

        setWebinars(
          response?.payload ? mapWebinars(response.payload) : undefined
        );
      } catch {}
    })();
  }, []);

  const pagination = usePagination({
    scrollToTopAfterChangingPage: true
  });

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
                label: intl.formatMessage(messages.play),
                icon: <PlayIcon />,
                action: () => history.push(`/stream/${webinar.id}`)
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

export { LegacyWebinars };
