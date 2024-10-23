export const getColors = (mode) => ({
  blue: {
    primary: {
      50: '#e3ecff',
      100: '#b3c6ff',
      200: '#829ffc',
      300: '#5179fb',
      400: '#2654fa',
      500: '#153ae2',
      600: '#0d2eb0',
      700: '#05207e',
      800: '#00134d',
      900: '#00061d',
      ...(mode === 'light'
        ? {
            main: '#001964',
            light: '#05207e',
            dark: '#00061d'
          }
        : {
            main: '#2654fa',
            light: '#5179fb',
            dark: '#153ae2'
          }),
      contrastText: '#fff'
    },
    secondary: {
      50: '#d8fbff',
      100: '#abeaff',
      200: '#7bdbff',
      300: '#48ccff',
      400: '#1abdff',
      500: '#00a3e6',
      600: '#007fb4',
      700: '#005b82',
      800: '#003751',
      900: '#001421',
      main: '#00a3e6',
      light: '#1abdff',
      dark: '#007fb4',
      contrastText: '#fff'
    }
  },
  purple: {
    primary: {
      50: '#f4e3ff',
      100: '#d6b2ff',
      200: '#b97fff',
      300: '#9c4cff',
      400: '#801aff',
      500: '#6700e6',
      600: '#5000b4',
      700: '#390082',
      800: '#220050',
      900: '#0d0020',
      main: '#6700e6',
      light: '#9d4cff',
      dark: '#390082',
      contrastText: '#fff'
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#fff'
    }
  },
  pink: {
    primary: {
      50: '#ffe2ff',
      100: '#ffb1f5',
      200: '#ff7fea',
      300: '#ff4ce2',
      400: '#ff1ad8',
      500: '#e600bf',
      600: '#b40094',
      700: '#81006b',
      800: '#4f0042',
      900: '#1f0019',
      main: '#e600bf',
      light: '#ff4ce2',
      dark: '#81006b',
      contrastText: '#fff'
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#fff'
    }
  },
  yellow: {
    primary: {
      50: '#fffada',
      100: '#fff1ad',
      200: '#ffe77d',
      300: '#ffde4b',
      400: '#ffd41a',
      500: '#e6bb00',
      600: '#b39100',
      700: '#806800',
      800: '#4e3e00',
      900: '#1c1500',
      main: '#e6bb00',
      light: '#ffde4b',
      dark: '#806800',
      contrastText: '#000'
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#fff'
    }
  },
  green: {
    primary: {
      50: '#dcffe8',
      100: '#aeffc5',
      200: '#7dffa2',
      300: '#4aff7e',
      400: '#1aff5a',
      500: '#00e641',
      600: '#00b331',
      700: '#008022',
      800: '#004e12',
      900: '#001c00',
      main: '#00e641',
      light: '#4aff7e',
      dark: '#008022',
      contrastText: '#000'
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#fff'
    }
  },
  orange: {
    primary: {
      50: '#ffeddb',
      100: '#ffceae',
      200: '#ffae7e',
      300: '#ff8e4c',
      400: '#ff6e1a',
      500: '#e65500',
      600: '#b44100',
      700: '#812e00',
      800: '#4f1a00',
      900: '#210600',
      main: '#e65500',
      light: '#ff8e4c',
      dark: '#812e00',
      contrastText: '#000'
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#fff'
    }
  }
});
