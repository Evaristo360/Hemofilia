import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    margin: '10px 0px',
    '& .MuiButton-label': {
      display: 'block'
    }
  },
  seeMoreIcon: {
    fontSize: theme.typography.pxToRem(30)
  }
}));

export { useStyles };
