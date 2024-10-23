import { makeStyles } from '@material-ui/core/styles';
import { hexToRgba } from 'providers/theme/helpers';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    width: 291,
    maxWidth: '100%',
    cursor: 'pointer',
    '&:hover': {
      '& $topContainer, & $bottomContainer': {
        backgroundColor: theme.palette.primary[900]
      },
      '& $icon': {
        color: theme.palette.primary[900]
      }
    },
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginRight: 'auto',
      marginLeft: 'auto'
    }
  },
  topContainer: {
    height: 127,
    display: 'flex',
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.primary[700],
    transition: theme.transitions.create('background-color')
  },
  iconContainer: {
    height: 80,
    width: 80,
    borderRadius: '100%',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: 50,
    transition: theme.transitions.create('color')
  },
  bodyContainer: {
    marginLeft: theme.spacing(1.5)
  },
  title: {
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold'
  },
  subtitle: {
    color: hexToRgba(theme.palette.primary.contrastText, 0.5)
  },
  bottomContainer: {
    height: 42,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary[700],
    marginTop: 1,
    transition: theme.transitions.create('background-color')
  },
  addButton: {
    backgroundColor: hexToRgba(theme.palette.primary.contrastText, 0.05),
    pointerEvents: 'none',
    padding: 3
  },
  addButtonIcon: {
    color: theme.palette.primary.contrastText,
    fontSize: 30
  }
}));

export { useStyles };
