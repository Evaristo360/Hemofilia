import { makeStyles } from '@material-ui/core/styles';
import { hexToRgba } from 'providers/theme/helpers';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    paddingTop: 0,
    width: 400,
    maxWidth: '100vw'
  },
  notification: {
    backgroundColor: hexToRgba(theme.palette.text.primary, 0.025),
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
    boxShadow: theme.shadows[8],
    display: 'flex',
    padding: theme.spacing(1),
    width: '100%',
    textAlign: 'left',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
}));

export { useStyles };
