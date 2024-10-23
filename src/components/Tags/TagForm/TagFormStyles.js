import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  containerForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1)
    }
  }
}));

export { useStyles };
