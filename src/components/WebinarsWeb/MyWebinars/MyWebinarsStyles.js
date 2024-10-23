import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  webinarsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(5)
  },
  pagination: {
    marginTop: theme.spacing(2)
  }
}));

export { useStyles };
