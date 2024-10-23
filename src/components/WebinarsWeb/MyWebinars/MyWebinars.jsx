import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './MyWebinarsStyles';
import { MyWebinarCard } from './MyWebinarCard';
import { AddWebinarCard } from '../AddWebinarCard';
import { usePagination } from 'components/Pagination/hooks/usePagination';
import { Pagination } from 'components/Pagination/Pagination';
import { useApi } from 'hooks/useApi';
import { mapWebinars } from './helpers';
import { NoWebinarsYet } from '../NoWebinarsYet/NoWebinarsYet';

const MyWebinars = () => {
  const classes = useStyles();
  const [getMyWebinars] = useApi({
    endpoint: '/webinar/web/list-request',
    method: 'get'
  });

  const [webinars, setWebinars] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await getMyWebinars();

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
    <>
      <Box pt={2} pb={1}>
        <AddWebinarCard />
      </Box>
      <div className={classes.webinarsContainer}>
        {webinars?.length > 0 &&
          webinars
            .slice(
              (pagination.page - 1) * pagination.rowsPerPage,
              pagination.page * pagination.rowsPerPage
            )
            .map((webinar) => (
              <MyWebinarCard
                key={`webinar-${webinar.id}`}
                webinar={webinar}
                setWebinars={setWebinars}
              />
            ))}

        {webinars?.length > 4 && (
          <Pagination
            length={webinars.length}
            {...pagination}
            className={classes.pagination}
          />
        )}
      </div>
    </>
  );
};

export { MyWebinars };
