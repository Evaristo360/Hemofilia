import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  loadingText: {
    marginLeft: theme.spacing(1),
    fontWeight: 'bold'
  }
}));

export { useStyles };
