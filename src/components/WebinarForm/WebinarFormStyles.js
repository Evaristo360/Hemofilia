import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    '& .MuiFormControl-root': {
      marginBottom: theme.spacing(1),
      borderRadius: theme.spacing(0.5),
      '& div:first-of-type': {
        borderRadius: theme.spacing(0.5)
      },
      '& p.Mui-error': {
        position: 'absolute',
        bottom: -theme.spacing(1.5)
      }
    }
  },
  dataContainer: {
    marginTop: theme.spacing(2)
  },
  platformRadioIcon: {
    height: 22,
    marginTop: 6
  },
  imageDescription: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(0.5)
  },
  importantHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(0.5)
  }
}));

export { useStyles };
