import { makeStyles } from '@material-ui/core/styles';
import { hexToRgba } from 'providers/theme/helpers';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: ({ visible }) => ({
    position: 'fixed',
    [theme.direction === 'ltr' ? 'right' : 'left']: 0,
    zIndex: theme.zIndex.drawer + 2,
    width: visible ? 260 : 0,
    height: `calc(100% - ${theme.spacing(2)}px)`,
    margin: theme.spacing(1),
    [theme.direction === 'ltr' ? 'marginLeft' : 'marginRight']: 0,
    boxSizing: 'border-box',
    borderRadius: theme.spacing(1),
    transition: `width ${theme.transitions.duration.standard}ms !important`,
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      borderRadius: 0,
      height: '100%'
    }
  }),
  button: ({ visible }) => ({
    position: 'fixed',
    top: 'calc(100vh / 2)',
    [theme.direction === 'ltr' ? 'right' : 'left']: 0,
    transform: visible
      ? `translateX(${
          theme.direction === 'ltr' ? '-' : ''
        }260px) translateY(-50%) rotateZ(180deg)`
      : 'translateY(-50%) rotateZ(360deg)',
    transition: theme.transitions.create(
      ['transform', 'border-radius', 'box-shadow'],
      {
        duration: theme.transitions.duration.standard
      }
    ),
    zIndex: visible ? theme.zIndex.tooltip : theme.zIndex.appBar,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.background.paper
    },
    borderRadius: theme.shape.borderRadius * 2,
    [theme.direction === 'ltr'
      ? 'borderTopLeftRadius'
      : 'borderTopRightRadius']: visible ? 0 : theme.shape.borderRadius * 2,
    [theme.direction === 'ltr'
      ? 'borderBottomLeftRadius'
      : 'borderBottomRightRadius']: visible ? 0 : theme.shape.borderRadius * 2,
    [theme.direction === 'ltr' ? 'marginRight' : 'marginLeft']: theme.spacing(
      1
    ),
    '& svg': {
      color: theme.palette.text.primary
    },
    boxShadow: visible ? 'none' : theme.customShadows.z24,
    [theme.breakpoints.down('xs')]: {
      zIndex: theme.zIndex.appBar,
      transform: 'translateY(-50%)'
    }
  }),
  closeIcon: {
    padding: '3px'
  },
  header: {
    height: 79,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${hexToRgba(theme.palette.text.primary, 0.15)}`,
    '& svg': {
      color: hexToRgba(theme.palette.text.primary, 0.6)
    }
  },
  contentContainer: {
    paddingTop: theme.spacing(2),
    height: 'calc(100% - 79px)',
    overflowX: 'hidden',
    overflowY: 'auto'
  }
}));

export { useStyles };
