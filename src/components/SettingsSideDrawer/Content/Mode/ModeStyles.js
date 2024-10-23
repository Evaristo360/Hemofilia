import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  item: {
    width: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.customShadows.z16,
    '&.light': {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.grey[700]
    },
    '&.dark': {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.grey[500]
    }
  },
  ripple: {
    backgroundColor: theme.palette.primary.main
  }
}));

export { useStyles };
