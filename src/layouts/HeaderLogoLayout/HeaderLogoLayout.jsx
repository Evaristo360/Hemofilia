import React from 'react';
import PropTypes from 'prop-types';
import { Loader, BasicLoader } from '@octopy/react-loader';
import { Modal } from '@octopy/react-modal';
import { useStyles } from './HeaderLogoLayoutStyles';
import { Container } from '@material-ui/core';

const HeaderLogoLayout = (props) => {
  const classes = useStyles();
  const { children } = props;

  return (
    <>
      <Loader>
        <BasicLoader />
      </Loader>
      <Modal />
      <div className={classes.container}>
        <div className={classes.background} />
        <Container className={classes.imagesContainer}>
          <div className={classes.logo} />
          <div className={classes.companyLogo} />
        </Container>
        {children}
      </div>
    </>
  );
};

HeaderLogoLayout.defaultProps = {
  showBackButton: false
};

HeaderLogoLayout.propTypes = {
  children: PropTypes.node.isRequired,
  showBackButton: PropTypes.bool
};

export { HeaderLogoLayout };
