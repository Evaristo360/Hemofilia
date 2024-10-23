import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { BarChart } from '@octopy/react-charts';
import { Typography, Card, useMediaQuery } from '@material-ui/core';
import { messages } from './GraphMostVisitedMessages';
import { useStyles } from './GraphMostVisitedStyles';
import { useTheme } from '@material-ui/core/styles';
import { map, size, get } from 'lodash';

const GraphMostVisited = ({ data, loading }) => {
  const { formatMessage: f } = useIntl();
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const [dataGraphic, setDataGraphic] = useState([]);

  useEffect(() => {
    if (size(data) > 0) {
      const enhancedData = map(data, (item) => {
        const title = get(item, 'title', '');

        return {
          label: title ? title : f(messages.noTitle),
          value: get(item, 'views', 0)
        };
      });

      setDataGraphic(enhancedData);
    }

    return () => setDataGraphic([]);
  }, [data]);

  if (loading) return null;

  return (
    <Card className={classes.cardVisitGraph}>
      <Typography className={classes.titleChart}>
        {f(messages.mostVisited)}
      </Typography>
      <div style={{ height: '260px', width: '100%' }}>
        <BarChart
          showTotal
          values={dataGraphic}
          maxValuesInSight={5}
          color={'#0099D7'}
          barWidth={xs ? 10 : 50}
        />
      </div>
    </Card>
  );
};

GraphMostVisited.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export { GraphMostVisited };
