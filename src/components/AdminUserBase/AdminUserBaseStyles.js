import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  responsiveCards: {
    [theme.breakpoints.down('md', 'sm', 'xs')]: {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  contentButton: {
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    display: 'flex',
    justifyContent: 'flex-end'
  },
  arrowIcon: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    color: theme.palette.info.dark,
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      [theme.breakpoints.down('xs')]: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5)
      }
    }
  },
  contentIcon: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    bottom: '8rem',
    [theme.breakpoints.down('sm')]: {
      bottom: '11rem'
    }
  }
}));

export { useStyles };
