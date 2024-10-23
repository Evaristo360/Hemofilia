import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    boxShadow: '0px 3px 6px #00000029'
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  avatarSelected: {
    backgroundColor: theme.palette.primary.main.concat('60'),
    '&.MuiIconButton-root:hover': {
      backgroundColor: theme.palette.primary.main.concat('60')
    }
  }
}));

export { useStyles };
