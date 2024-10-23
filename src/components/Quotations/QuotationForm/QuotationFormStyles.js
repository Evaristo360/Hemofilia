import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  containerForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: theme.typography.pxToRem(450),
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: theme.typography.pxToRem(280)
    }
  }
}));

export { useStyles };
