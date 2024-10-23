import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SideMenuContext } from './SideMenuContext';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { getItem } from 'utils/persistentStorage';

const defaultMini = getItem('mini_menu') ?? true;

const SideMenuProvider = (props) => {
  const { children } = props;
  const [visible, setVisible] = useState(false);
  const [mini, setMini] = useState(defaultMini);
  const [expanded, setExpanded] = useState(!defaultMini);
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (smallScreen) {
      setMini(false);
      setExpanded(true);
    } else {
      const defaultMini = getItem('mini_menu') ?? true;

      setMini(defaultMini);
      setExpanded(!defaultMini);
    }
  }, [smallScreen]);

  const contextValue = useMemo(
    () => ({
      visible,
      setVisible,
      mini,
      setMini,
      expanded,
      setExpanded
    }),
    [visible, mini, expanded]
  );

  return (
    <SideMenuContext.Provider value={contextValue}>
      {children}
    </SideMenuContext.Provider>
  );
};

SideMenuProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { SideMenuProvider };
