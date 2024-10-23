import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold'
  }
}));

export { useStyles };
