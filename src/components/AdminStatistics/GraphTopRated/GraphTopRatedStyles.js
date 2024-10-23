import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardTopRated: {
    padding: theme.spacing(2),
    height: '350px',
    width: '100%',
    borderRadius: 5,
    boxShadow: '0px 0px 4px  #00000029',
    [theme.breakpoints.down('xs')]: {
      height: '400px'
    }
  },
  titleChart: {
    fontSize: '18px',
    alignItems: 'center',
    fontWeight: 800,
    color: theme.palette.info.dark
  }
}));

export { useStyles };
