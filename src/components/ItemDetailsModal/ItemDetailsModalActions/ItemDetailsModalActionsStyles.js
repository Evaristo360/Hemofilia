import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  editButton: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.info.dark
    }
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  }
}));

export { useStyles };
