import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rateContent: {
    fontSize: 16,
    cursor: 'pointer',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    }
  },
  stars: {
    display: 'flex',
    alignItems: 'center'
  },
  video: {
    margin: 'auto',
    display: 'block',
    width: theme.typography.pxToRem(960),
    height: theme.typography.pxToRem(540),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  center: {
    display: 'block',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center'
    }
  }
}));

export { useStyles };
