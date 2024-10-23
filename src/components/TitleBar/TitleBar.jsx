import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Typography, Grid, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons/';
import { Images } from '../../assets';
import { messages } from './TitleBarMessages';
import { useStyles } from './TitleBarStyles';

const TitleBar = ({
  typeLayout,
  title,
  arrowBack,
  icon,
  faqLayout,
  logoHemofilia,
  logos,
  path,
  appBaselayout
}) => {
  const intl = useIntl();
  const classes = useStyles({ arrowBack, icon, faqLayout });
  const history = useHistory();

  return (
    <Grid container className={classes.container}>
      {typeLayout === 'dashboardLayout' ? (
        <Grid container direction="column" className={classes.contentGrid}>
          <Grid className={classes.responsiveLogo}>
            <div className={classes.logo} />
          </Grid>
          <Grid container className={classes.contentTextArrow}>
            <Grid item lg={10} xs={arrowBack ? 6 : 12}>
              <Typography className={classes.titleDashboarLayout}>
                {title}
              </Typography>
            </Grid>
            {arrowBack && (
              <Grid item lg={2} xs={6} className={classes.contentIcon}>
                <IconButton onClick={() => history.push(`/${path}`)}>
                  <ArrowBack className={classes.arrowIcon} />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Grid>
      ) : (
        <>
          {typeLayout === 'introLayout' ? (
            <div className={classes.contentIntroLayout}>
              <div className={classes.contentText}>
                <Grid className={classes.responsiveLogo}>
                  <div className={classes.logo} />
                </Grid>
                <Grid className={classes.responsiveTextIntroLayout}>
                  <Typography className={classes.textInformation}>
                    {intl.formatMessage(messages.textInformationComplete)}
                  </Typography>
                </Grid>

                <Grid className={classes.responsiveIntroLayout}>
                  <Typography
                    component="div"
                    className={classes.textInformation}
                  >
                    {intl.formatMessage(messages.textInformation)}
                    <Typography>
                      {intl.formatMessage(messages.textInformationMore)}
                    </Typography>
                  </Typography>
                </Grid>
              </div>
            </div>
          ) : (
            <>
              {logoHemofilia && (
                <Grid className={classes.contentLogos}>
                  <Grid>
                    <div src={Images.logo} />
                  </Grid>
                </Grid>
              )}
              {logos && (
                <Grid className={classes.contentLogos}>
                  <Grid>
                    <div src={Images.logo} />
                  </Grid>
                  <Grid>
                    <img src={Images.novoNordiskLogo} alt="logo-novoNordisk" />
                  </Grid>
                </Grid>
              )}
              {appBaselayout && (
                <div className={classes.contentBaseLayoute}>
                  <Grid className={classes.contentTextBaseLayout}>
                    {faqLayout && (
                      <Grid className={classes.contentFaqs}>
                        <Grid className={classes.contentTitleFaqs}>
                          <Typography className={classes.titleFaqs}>
                            {intl.formatMessage(messages.have)}
                          </Typography>
                        </Grid>
                        <Grid className={classes.contentTitleFaqs}>
                          <Typography className={classes.titleFaqs}>
                            {intl.formatMessage(messages.some)}
                          </Typography>
                        </Grid>
                        <Grid className={classes.contentFaqsText}>
                          <Typography
                            component="div"
                            className={classes.textInformationFaqs}
                          >
                            {intl.formatMessage(messages.informationFaqs)}
                            <Grid className={classes.contentTitleFaqs}>
                              <Typography
                                className={classes.textInformationFaqs}
                              >
                                {intl.formatMessage(messages.contacFaqs)}
                              </Typography>
                            </Grid>
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                    <Grid className={classes.responsiveLogo}>
                      <div className={classes.logo} />
                    </Grid>
                    <Grid className={classes.contentTitleBaseLayout}>
                      <div className={classes.baseLayoutTitleWrapper}>
                        {arrowBack && (
                          <IconButton
                            edge="start"
                            className={classes.backButton}
                            onClick={() => history.push(`/${path}`)}
                          >
                            <ArrowBack className={classes.arrowIcon} />
                          </IconButton>
                        )}
                        <Typography className={classes.titleBaseLayout}>
                          {title}
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              )}
            </>
          )}
        </>
      )}
    </Grid>
  );
};

TitleBar.propTypes = {
  title: PropTypes.string,
  typeLayout: PropTypes.string,
  icon: PropTypes.node,
  logoHemofilia: PropTypes.node
};

export { TitleBar };
