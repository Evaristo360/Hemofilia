import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      height: '90vh'
    }
  },
  errorDetails: {
    width: '100%',
    position: 'absolute',
    bottom: theme.spacing(10),
    textAlign: 'center',
    '& button': {
      textTransform: 'inherit'
    },
    '& .title': {
      fontWeight: 'bold',
      fontSize: theme.typography.h4.fontSize
    },
    '& .description': {
      marginBottom: theme.spacing(1.5),
      fontSize: theme.typography.body1.fontSize
    },
    [theme.breakpoints.down('xs')]: {
      '& .title': {
        fontSize: theme.typography.h5.fontSize
      },
      '& .description': {
        marginBottom: theme.spacing(1.5),
        fontSize: theme.typography.body1.fontSize
      }
    }
  }
}));

export { useStyles };
