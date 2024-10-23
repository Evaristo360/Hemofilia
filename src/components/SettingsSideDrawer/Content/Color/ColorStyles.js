import { makeStyles } from '@material-ui/core/styles';
import { getColors } from 'providers/theme/config/colors';
import { hexToRgba } from 'providers/theme/helpers';

const useStyles = makeStyles((theme) => {
  const colors = getColors(theme.palette.type);

  return {
    item: {
      width: '100%',
      height: 48,
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${hexToRgba(theme.palette.text.primary, 0.15)}`,
      transition: theme.transitions.create('border', {
        duration: theme.transitions.duration.standard
      }),
      '&.active': {
        border: `2px solid ${hexToRgba(theme.palette.primary.main, 0.7)}`,
        boxShadow: `inset 0 0 30px ${hexToRgba(
          theme.palette.primary.main,
          theme.mode === 'dark' ? 0.225 : 0.4
        )}`
      }
    },
    color: {
      height: 14,
      width: 14,
      borderRadius: theme.shape.borderRadius,
      transform: 'rotateZ(-45deg) scaleX(1.7)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.standard
      }),
      '&.active': {
        transform: 'rotateZ(0deg) scaleX(1.7)'
      }
    },
    ripple: {
      '&.purple': {
        backgroundColor: colors.purple.primary.main
      },
      '&.orange': {
        backgroundColor: colors.orange.primary.main
      },
      '&.blue': {
        backgroundColor: colors.blue.primary.main
      },
      '&.green': {
        backgroundColor: colors.green.primary.main
      },
      '&.yellow': {
        backgroundColor: colors.yellow.primary.main
      },
      '&.pink': {
        backgroundColor: colors.pink.primary.main
      }
    }
  };
});

export { useStyles };
