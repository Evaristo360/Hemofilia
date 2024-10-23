import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  contentForm: {
    width: '600px',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  contentIcon: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  iconClose: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: theme.palette.common.black,
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(2.5),
      height: theme.spacing(2.5)
    }
  },
  titleModal: {
    fontWeight: 800,
    fontSize: '25px',
    color: theme.palette.info.dark,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px'
    }
  },
  title: {
    color: theme.palette.info.dark,
    fontSize: '18px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '15px'
    }
  },
  button: {
    color: theme.palette.common.white,
    marginTop: theme.spacing(2),
    padding: theme.spacing(0.5),
    background: theme.palette.info.light,
    '&:hover': {
      backgroundColor: `${theme.palette.info.dark}!important`
    }
  }
}));

export { useStyles };
