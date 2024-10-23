import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '147px',
    boxShadow: `  2px 4px 4px 3px ${theme.palette.divider}`
  },
  description: {
    letterSpacing: 4,
    fontSize: '16px'
  },
  cardArea: {
    height: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  },
  icon: {
    backgroundColor: theme.palette.primary[500],
    color: 'white',
    height: '30px',
    width: '30px',
    borderRadius: 19
  },
  total: {
    fontWeight: 600,
    fontSize: '25px',
    color: theme.palette.primary[500]
  }
}));

export { useStyles };
