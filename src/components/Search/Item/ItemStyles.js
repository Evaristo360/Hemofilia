import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      maxWidth: 300
    },
    textAlign: 'left',
    borderRadius: theme.shape.borderRadius * 2,
    [theme.breakpoints.only('xs')]: {
      width: '100%'
    }
  },
  card: {
    padding: theme.spacing(1.5),
    [theme.breakpoints.only('xs')]: {
      width: '100%'
    }
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  tag: {
    marginLeft: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(1)
  }
}));

export { useStyles };
