import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  containerForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: theme.typography.pxToRem(450),
    // padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2)
    }
  }
}));

export { useStyles };
