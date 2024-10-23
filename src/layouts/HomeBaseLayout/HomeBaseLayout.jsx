import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'components/Header';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Loader, BasicLoader } from '@octopy/react-loader';
import { Modal } from '@octopy/react-modal';
import './HomeBaseLayout.scss';
import { ErrorBoundary } from 'components/ErrorBoundary/ErrorBoundary';
import { useStyles } from './HomeBaseLayoutStyles';
import { SideMenu, useSideMenu } from 'components/SideMenu';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { SettingsSideDrawer } from 'components/SettingsSideDrawer/SettingsSideDrawer';
import { Drawer } from 'components/Drawer';

function HomeBaseLayout({ children }) {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const { mini } = useSideMenu();

  const classes = useStyles({ mini });

  return (
    <ErrorBoundary>
      <Loader>
        <BasicLoader />
      </Loader>
      <Modal />
      <SettingsSideDrawer />
      <Header />
      <div className={`base-layout ${classes.container}`}>
        <SideMenu />
        <div className={classes.appBarSpacer} />
        <div
          style={{
            [theme.direction === 'ltr' ? 'marginLeft' : 'marginRight']: mdUp
              ? theme.mixins.getSideMenu(mini).width
              : 0,
            transition: theme.transitions.create('margin', {
              duration: theme.transitions.duration.standard
            })
          }}
        >
          {children}
        </div>
        <Drawer />
      </div>
    </ErrorBoundary>
  );
}

HomeBaseLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export { HomeBaseLayout };
