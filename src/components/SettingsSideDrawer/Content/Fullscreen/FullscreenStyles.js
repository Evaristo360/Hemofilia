import { makeStyles } from '@material-ui/core/styles';
import { hexToRgba } from 'providers/theme/helpers';

const useStyles = makeStyles((theme) => ({
  button: ({ active }) => ({
    borderColor: active ? theme.palette.primary.main : null,
    backgroundColor: active ? hexToRgba(theme.palette.primary.main, 0.1) : null,
    color: active ? theme.palette.primary.main : null,
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  })
}));

export { useStyles };
