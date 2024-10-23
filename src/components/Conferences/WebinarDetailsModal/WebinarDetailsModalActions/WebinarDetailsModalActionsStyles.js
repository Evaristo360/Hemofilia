import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  editButton: {
    marginRight: theme.spacing(3),
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.info.dark
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginRight: 0
    }
  },
  aproveButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: theme.spacing(1),
      marginRight: 0
    }
  },
  rejectButton: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: theme.spacing(1)
    }
  }
}));

export { useStyles };
