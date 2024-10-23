import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(2)
    }
  },
  link: {
    display: 'flex',
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  drawerTitle: {
    fontSize: '1.5rem'
  }
}));

export { useStyles };
