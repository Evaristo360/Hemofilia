import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { VideosContext } from './VideosContext';

const VideosProvider = (props) => {
  const { children } = props;
  const [example, setExample] = useState(false);

  const contextValue = useMemo(
    () => ({
      example,
      handleChangeExample: setExample
    }),
    [example]
  );

  return (
    <VideosContext.Provider value={contextValue}>
      {children}
    </VideosContext.Provider>
  );
};

VideosProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { VideosProvider };
