import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  containerForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: theme.typography.pxToRem(400),
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
      width: theme.typography.pxToRem(280)
    },
    '& p.Mui-error': {
      position: 'initial!important'
    }
  }
}));

export { useStyles };
