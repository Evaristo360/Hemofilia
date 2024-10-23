import { makeStyles } from '@material-ui/core/styles';
import { hexToRgba } from 'providers/theme/helpers';

const useStyles = makeStyles((theme) => ({
  tabsWrapper: {
    backgroundColor: hexToRgba(theme.palette.text.primary, 0.05)
  },
  icon: {
    transition: theme.transitions.create('color'),
    color: theme.palette.primary.main
  },
  saveButton: {
    float: 'right',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      float: 'none',
      marginRight: 0,
      width: '100%'
    }
  }
}));

export { useStyles };
