import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'components/Header';
import { Loader, BasicLoader } from '@octopy/react-loader';
import { Modal } from '@octopy/react-modal';
import './BaseLayout.scss';
import { ErrorBoundary } from 'components/ErrorBoundary/ErrorBoundary';
import { useStyles } from './BaseLayoutStyles';
import { SideMenu, useSideMenu } from 'components/SideMenu';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { SettingsSideDrawer } from 'components/SettingsSideDrawer/SettingsSideDrawer';
import { Drawer } from 'components/Drawer';
import { TitleBar } from 'components/TitleBar';

function BaseLayout({
  appBarSpacer = true,
  hideTitleBar,
  children,
  title,
  arrowBack,
  typeLayout = 'BaseLayout',
  icon,
  logoHemofilia,
  faqLayout,
  logos,
  textFaqs,
  path,
  appBaselayout
}) {
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
      <Header />
      <SettingsSideDrawer />

      <div className={`base-layout ${classes.container}`}>
        <SideMenu />
        {appBarSpacer && <div className={classes.appBarSpacer} />}
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
          {!hideTitleBar && (
            <TitleBar
              typeLayout={typeLayout}
              title={title}
              arrowBack={arrowBack}
              icon={icon}
              logoHemofilia={logoHemofilia}
              logos={logos}
              textFaqs={textFaqs}
              faqLayout={faqLayout}
              path={path}
              appBaselayout={appBaselayout}
            />
          )}
          {children}
        </div>
        <Drawer />
      </div>
    </ErrorBoundary>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export { BaseLayout };
