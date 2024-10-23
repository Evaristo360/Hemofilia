import React from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

const GoBackButton = () => {
  const history = useHistory();

  return (
    <IconButton onClick={() => history && history.goBack()}>
      <ArrowBackIcon fontSize="large" style={{ color: '#fff' }} />
    </IconButton>
  );
};

export { GoBackButton };
