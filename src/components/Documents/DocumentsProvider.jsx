import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { DocumentsContext } from './DocumentsContext';

const DocumentsProvider = (props) => {
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
    <DocumentsContext.Provider value={contextValue}>
      {children}
    </DocumentsContext.Provider>
  );
};

DocumentsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { DocumentsProvider };
