import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: ({ expanded }) => ({
    position: 'absolute',
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
    opacity: expanded ? 1 : 0,
    transition: theme.transitions.create(
      'opacity',
      theme.transitions.duration.shorter
    ),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  })
}));

export { useStyles };
