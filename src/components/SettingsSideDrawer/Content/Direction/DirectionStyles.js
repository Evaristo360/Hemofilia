import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  item: {
    width: '100%',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.customShadows.z24,
    flexDirection: 'column',
    '&.left': {
      alignItems: 'flex-start'
    },
    '&.right': {
      alignItems: 'flex-end'
    },
    '& div': {
      borderRadius: theme.shape.borderRadius * 0.5,
      '&.ltr': {
        backgroundColor:
          theme.direction === 'ltr'
            ? theme.palette.primary.main
            : theme.palette.text.secondary
      },
      '&.rtl': {
        backgroundColor:
          theme.direction === 'rtl'
            ? theme.palette.primary.main
            : theme.palette.text.secondary
      }
    }
  },
  firstBox: {
    height: 22,
    width: '80%',
    opacity: 0.8,
    marginBottom: theme.spacing(0.5)
  },
  secondBox: {
    height: 17,
    width: '60%',
    opacity: 0.5,
    marginBottom: theme.spacing(0.5)
  },
  thirdBox: {
    height: 12,
    width: '40%',
    opacity: 0.2
  },
  ripple: {
    backgroundColor: theme.palette.primary.main
  }
}));

export { useStyles };
