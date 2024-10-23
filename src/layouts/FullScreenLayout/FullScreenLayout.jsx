import React from 'react';
import PropTypes from 'prop-types';
import './FullScreenLayout.scss';
import { ErrorBoundary } from 'components/ErrorBoundary/ErrorBoundary';
import { TitleBar } from 'components/TitleBar/TitleBar';
import { Modal } from '@octopy/react-modal';
import { Loader } from '@octopy/react-loader';

function FullScreenLayout({ children }) {
  return (
    <ErrorBoundary>
      <Modal />
      <Loader />
      <div className="full-screen-layout">{children}</div>
    </ErrorBoundary>
  );
}

FullScreenLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export { FullScreenLayout };
