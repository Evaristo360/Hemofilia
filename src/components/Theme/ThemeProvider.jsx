import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  createMuiTheme,
  ThemeProvider as MUIThemeProvider
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getItem } from 'utils/persistentStorage';
import { config } from 'providers/config';
import { availableSkins } from 'providers/theme';
import { ThemeContext } from './ThemeContext';
import * as themeConfig from 'providers/theme/config';

const ThemeProvider = (props) => {
  const { children, defaultTheme } = props;
  const { siteConfig } = config;
  const { LIGHT, DARK } = availableSkins;
  const [theme, setTheme] = useState(defaultTheme || siteConfig.defaultTheme);
  const [direction, setDirection] = useState(getItem('direction') ?? 'ltr');
  const [color, setColor] = useState(getItem('color') ?? 'blue');
  const [stretch, setStretch] = useState(getItem('stretch') ?? false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const browserTheme = prefersDarkMode ? DARK : LIGHT;
  const mandatoryAppTheme = siteConfig.allowBrowserTheme ? browserTheme : theme;

  useEffect(() => {
    const activeTheme = getItem('theme');

    setTheme(activeTheme || defaultTheme);
  }, [defaultTheme]);

  const contextValue = useMemo(
    () => ({
      theme,
      availableSkins,
      handleChangeTheme: setTheme,
      handleChangeDirection: setDirection,
      handleChangeColor: setColor,
      handleChangeStretch: setStretch
    }),
    [theme]
  );

  const materialTheme = useMemo(() => {
    const palette = {
      ...themeConfig[mandatoryAppTheme].palette,
      ...themeConfig.getColors(mandatoryAppTheme)[color],
      color,
      type: mandatoryAppTheme
    };

    const skin = {
      shadows: themeConfig.getShadows(palette),
      customShadows: themeConfig.getCustomShadows(palette),
      ...themeConfig[mandatoryAppTheme],
      ...themeConfig.common,
      palette,
      direction,
      stretch
    };

    return createMuiTheme({
      ...skin,
      overrides: themeConfig.getOverrides(skin),
      props: themeConfig.getProps(skin)
    });
  }, [mandatoryAppTheme, direction, color, stretch]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MUIThemeProvider theme={materialTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  defaultTheme: PropTypes.string,
  children: PropTypes.node.isRequired
};

export { ThemeProvider };
