import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(5)
  },
  assistButton: {
    '&.active *': {
      color: '#EF1372'
    }
  },
  pagination: {
    marginTop: theme.spacing(2)
  }
}));

export { useStyles };
