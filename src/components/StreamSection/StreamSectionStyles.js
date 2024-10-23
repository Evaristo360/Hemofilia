import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(4),
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1)
    }
  },
  title: {
    marginLeft: theme.spacing(1),
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.subtitle1.fontSize
    }
  },
  streamContainer: {
    flexGrow: 1,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  player: {
    backgroundColor: '#00000020',
    borderRadius: theme.shape.borderRadius * 0.5
  },
  videoContainer: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      flexGrow: 0,
      width: '100%',
      height: '40vh'
    },
    [theme.breakpoints.down('xs')]: {
      height: '30vh'
    }
  },
  chatContainer: {
    width: 325,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '60vh'
    }
  },
  reduceStreamContainer: {
    width: '50%'
  },
  personalChat: {
    width: '0%',
    transition: theme.transitions.create(['width', 'transform'], {
      duration: theme.transitions.duration.complex
    })
  },
  reducePersonalChat: {
    width: '25%'
  },
  fullHeight: { height: '100%' },
  iframe: {
    backgroundColor: '#000'
  }
}));

export { useStyles };
