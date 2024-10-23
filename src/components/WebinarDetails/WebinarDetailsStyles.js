import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  themeContainer: {
    marginBottom: theme.spacing(2),
    alignItems: 'center',
    width: 500,
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(3),
      display: 'flex'
    }
  },
  avatar: {
    width: 80,
    height: 80
  },
  theme: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    marginTop: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      marginTop: 0
    }
  },
  doctorName: {
    color: theme.palette.secondary.main,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2)
    }
  },
  propertyContainer: {
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  key: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
    [theme.breakpoints.up('sm')]: {
      lineHeight: theme.typography.body2.lineHeight,
      marginRight: theme.spacing(1),
      width: 120,
      minWidth: 120
    }
  },
  value: {
    alignSelf: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));

export { useStyles };
