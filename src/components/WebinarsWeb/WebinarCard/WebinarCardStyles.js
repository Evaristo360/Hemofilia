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
  imageContainer: {
    height: 152,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  live: {
    backgroundColor: '#C80000',
    color: theme.palette.common.white,
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius * 0.5
  },
  duration: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    paddingTop: theme.spacing(0.25),
    paddingBottom: theme.spacing(0.25),
    borderTopLeftRadius: theme.shape.borderRadius
  },
  contentContainer: {
    display: 'flex',
    flexGrow: 1
  },
  avatarContainer: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(1.5)
  },
  bodyContainer: {
    flexGrow: 1,
    padding: theme.spacing(1),
    paddingLeft: 0
  },
  theme: {
    fontWeight: 'bold',
    lineHeight: theme.typography.body2.lineHeight
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: theme.spacing(1.5)
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
