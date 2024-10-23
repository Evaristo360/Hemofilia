import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  propertyContainer: {
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  key: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
