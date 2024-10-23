import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  itemsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  }
}));

export { useStyles };
