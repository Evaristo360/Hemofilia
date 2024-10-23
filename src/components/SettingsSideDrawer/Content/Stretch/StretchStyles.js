import { makeStyles } from '@material-ui/core/styles';
import { hexToRgba } from 'providers/theme/helpers';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    padding: theme.spacing(1.5),
    backgroundColor: hexToRgba(
      theme.palette.text.primary,
      theme.palette.mode === 'light' ? 0.1 : 0.05
    ),
    borderRadius: theme.shape.borderRadius
  },
  stretch: {
    width: theme.stretch ? '100%' : '55%',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.standard
    })
  },
  arrow: {
    fontSize: 15,
    transform: theme.stretch ? 'rotateY(180deg)' : 'none',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.standard
    })
  },
  ripple: {
    backgroundColor: hexToRgba(theme.palette.primary.main, 0.5)
  }
}));

export { useStyles };
