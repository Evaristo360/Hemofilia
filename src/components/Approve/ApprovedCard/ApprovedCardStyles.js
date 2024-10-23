import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: `  1px 2px 4px 2px ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 2
  },
  boxInformation: {
    padding: theme.spacing(2),
    height: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  },
  title: {
    color: '#0099D7',
    letterSpacing: 3,
    textTransform: 'uppercase',
    fontSize: '16px'
  },
  description: { color: '#001964', fontWeight: 600 },
  doctor: { color: '#0099D7', fontWeight: 600, fontSize: '13px' },
  date: { fontSize: '13px' },
  hour: { fontSize: '13px' },
  boxButtons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  icon: {
    color: 'black'
  },
  grid: {
    height: 200,
    backgroundColor: 'red'
  }
}));

export { useStyles };
