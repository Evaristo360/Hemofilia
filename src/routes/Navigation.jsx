/* eslint-disable react/jsx-props-no-spreading */
import { get, map, filter } from 'lodash';
import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { messages } from './NavigationMessages';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation
} from 'react-router-dom';
import { useAuth } from '@octopy/react-auth';
import { routes as _routes } from './routes';
import { Helmet } from 'react-helmet';
import { metas } from './metas';
import './Navigation.scss';

function Navigation() {
  return (
    <Router>
      <AnimatedRouter />
    </Router>
  );
}

function AnimatedRouter() {
  const { formatMessage } = useIntl();
  const { auth } = useAuth();
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState('fadeIn');

  // useEffect(() => {
  //   if (!auth) {
  //     setTransistionStage('fadeIn');
  //     setDisplayLocation(location);
  //   } else if (location !== displayLocation) setTransistionStage('fadeOut');
  // }, [location, auth]);

  const AnimationWrapper = ({ children }) => (
    <div
      className={`${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === 'fadeOut') {
          setTransistionStage('fadeIn');
          setDisplayLocation(location);
        }
      }}
    >
      {children}
    </div>
  );

  const role = get(auth, 'user.role', 'public');

  let routes = _routes[role];

  if (role === 'super-admin') {
    routes = [...routes, ..._routes['admin']];
  }

  return (
    <Switch /*location={displayLocation}*/>
      {role !== 'public' &&
        map(
          ['/login/:email?', '/register', '/password-recovery/:tokenPassword?'],
          (path, index) => (
            <Route
              key={`public-route-${index}`}
              path={path}
              exact={true}
              render={() => <Redirect to="/" />}
            />
          )
        )}
      {map(routes, (route, index) => (
        <Route
          key={`${role}-route-${index}`}
          path={route.path}
          exact={route.exact}
          render={(props) => (
            <>
              <Helmet>
                <title>{formatMessage(messages[route.titleMessage])}</title>
                {get(metas, route.path, []).map((meta, index) => (
                  <meta key={`meta-${index}`} {...meta} />
                ))}
              </Helmet>
              <route.layout>
                <AnimationWrapper>
                  <route.component {...props} />
                </AnimationWrapper>
              </route.layout>
            </>
          )}
        />
      ))}
    </Switch>
  );
}

export { Navigation };
