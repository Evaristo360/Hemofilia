import { makeStyles } from '@material-ui/core/styles';
import { hexToRgba } from 'providers/theme/helpers';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(0.5),
      paddingLeft: theme.spacing(0.5),
      flexGrow: 1
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      display: 'contents'
    }
  },
  container: {
    width: 291,
    maxWidth: '100%',
    boxShadow: theme.customShadows.z12,
    border: `1px solid ${hexToRgba(theme.palette.text.primary, 0.1)}`,
    borderRadius: theme.shape.borderRadius * 0.5,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  bodyContainer: {
    padding: theme.spacing(1.5),
    flexGrow: 1
  },
  theme: {
    fontWeight: 'bold',
    lineHeight: theme.typography.body2.lineHeight,
    marginBottom: theme.spacing(0.5)
  },
  status: {
    display: 'inline-block',
    marginTop: theme.spacing(0.5),
    padding: theme.spacing(0.25),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.common.white,
    '&.aprobada': {
      backgroundColor: '#78D88F'
    },
    '&.pendiente': {
      backgroundColor: '#98CFFF'
    },
    '&.rechazada': {
      backgroundColor: '#FF9898'
    },
    '&.cancelada': {
      backgroundColor: '#FCD99C'
    }
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionButton: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    textTransform: 'none',
    '&.hidden': {
      visibility: 'hidden'
    }
  }
}));

export { useStyles };
