import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const menuItemWithStyles = (Component) =>
  withStyles((theme) => ({
    root: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      color: theme.palette.primary.main
    }
  }))(Component);

const useStyles = makeStyles((theme) => ({
  iconStyle: { margin: '5px 5px -8px 0px' }
}));

export { menuItemWithStyles, useStyles };
