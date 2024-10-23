import React from 'react';
import { useIntl } from 'react-intl';
import { Container, Tabs, Tab, Typography } from '@material-ui/core';
import { messages } from './WebinarsWebMessages';
import { useStyles } from './WebinarsWebStyles';
import { useState } from 'react';
import { WebinarsCalendar } from './WebinarsCalendar/WebinarsCalendar';
import { PendingWebinars } from './PendingWebinars/PendingWebinars';
import { MyWebinars } from './MyWebinars/MyWebinars';
import { Images } from 'assets';
import { LegacyWebinars } from './LegacyWebinars/LegacyWebinars';

export const tabs = {
  calendar: {
    component: WebinarsCalendar,
    icon: Images.calendarAlt,
    message: messages.calendar
  },
  pendingWebinars: {
    component: PendingWebinars,
    icon: Images.calendarCheck,
    message: messages.pendingWebinars
  },
  legacyWebinars: {
    component: LegacyWebinars,
    icon: Images.calendarCheck,
    message: messages.legacyWebinars
  },
  myWebinars: {
    component: MyWebinars,
    icon: Images.calendarPlus,
    message: messages.myWebinars
  }
};

const WebinarsWeb = () => {
  const intl = useIntl();
  const classes = useStyles();

  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  return (
    <>
      <div className={classes.tabsWrapper}>
        <Container>
          <Tabs
            value={currentTabIndex}
            onChange={(_, value) => setCurrentTabIndex(value)}
            aria-label="simple-tabs"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {Object.keys(tabs).map((name, index) => (
              <Tab
                label={
                  <Typography
                    variant="body1"
                    color={
                      index === currentTabIndex ? 'primary' : 'textSecondary'
                    }
                  >
                    {intl.formatMessage(tabs[name].message)}
                  </Typography>
                }
                icon={
                  <div
                    className={`${classes.icon} ${name} ${
                      index === currentTabIndex ? 'active' : ''
                    }`}
                  />
                }
                id={`simple-tab-${index}`}
                key={`simple-tab-${index}`}
                aria-controls={`simple-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </Container>
      </div>

      <Container>
        {Object.keys(tabs).map((name, index) => {
          const Component = tabs[name].component;

          return (
            <div
              role="tabpanel"
              hidden={currentTabIndex !== index}
              id={`simple-tabpanel-${index}`}
              key={`simple-tabpanel-${index}`}
              aria-labelledby={`simple-tab-${index}`}
            >
              {currentTabIndex === index && <Component />}
            </div>
          );
        })}
      </Container>
    </>
  );
};

export { WebinarsWeb };
