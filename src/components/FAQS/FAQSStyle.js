import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: '0 90px',
    '& .MuiPaper-elevation1': {
      boxShadow: '0px 3px 6px #00000029'
    }
  },
  heading: {
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export { useStyles };
