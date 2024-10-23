import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bar: {
    boxShadow: theme.customShadows.z8
  },
  barSearchIcon: {
    pointerEvents: 'none',
    marginRight: theme.spacing(1),
    [theme.breakpoints.only('xs')]: {
      marginRight: theme.spacing(1)
    }
  },
  searchButton: {
    marginLeft: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

export { useStyles };
