import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BarChart } from '@octopy/react-charts';
import { useIntl } from 'react-intl';
import { Typography } from '@material-ui/core';
import { messages } from './GraphUserInteractionsMessages';
import { useStyles } from './GraphUserInteractionsStyles';
import { useState } from 'react';
import { map, size, get } from 'lodash';

const GraphUserInteractions = ({ data, loading }) => {
  const { formatMessage: f } = useIntl();
  const classes = useStyles();
  const [dataGraphic, setDataGraphic] = useState([]);

  useEffect(() => {
    if (size(data) > 0) {
      const enhancedData = map(data, (item) => {
        const title = get(item, 'date', '');

        return {
          label: title ? title : f(messages.noDate),
          value: get(item, 'count', 0)
        };
      });

      setDataGraphic(enhancedData);
    }

    return () => setDataGraphic([]);
  }, [data]);

  if (loading) return null;

  return (
    <>
      <Typography className={classes.titleChart}>
        {f(messages.userInteractions)}
      </Typography>
      <div style={{ height: '410px', width: '100%' }}>
        <BarChart
          showTotal
          values={dataGraphic}
          maxValuesInSight={12}
          color={'#0099D7'}
          barWidth={9}
        />
      </div>
    </>
  );
};

GraphUserInteractions.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export { GraphUserInteractions };
