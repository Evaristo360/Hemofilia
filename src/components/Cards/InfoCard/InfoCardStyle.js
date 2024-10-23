import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: theme.spacing(2)
  },
  icon: {
    gridRow: '1 / 3',
    color: '#001964',
    fontSize: theme.typography.pxToRem(68),
    marginRight: theme.spacing(1)
  },
  title: {
    color: '#001964',
    textTransform: 'uppercase',
    fontSize: theme.typography.pxToRem(14)
  },
  stat: {
    color: '#001964',
    fontSize: theme.typography.pxToRem(45),
    fontWeight: 'bold'
  }
}));

export { useStyles };
