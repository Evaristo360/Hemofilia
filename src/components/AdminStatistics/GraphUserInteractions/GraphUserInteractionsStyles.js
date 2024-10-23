import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  titleChart: {
    fontSize: '18px',
    fontWeight: 800,
    color: theme.palette.text.secondary,
    paddingBottom: theme.spacing(3)
  }
}));

export { useStyles };
