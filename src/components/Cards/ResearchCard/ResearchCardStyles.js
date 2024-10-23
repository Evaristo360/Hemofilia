import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: '2fr 0.5fr 0.5fr',
    gridAutoRows: 'minmax(100px, auto)'
  },
  image: {
    width: '100%',
    padding: 0,
    height: '200px',
    margin: '0 0 20px 0',
    objectFit: 'cover'
  },
  content: {
    margin: `0 ${theme.spacing(2)}px`
  },
  footerContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: `0 ${theme.spacing(2)}px`
  },
  rateContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    color: '#0099D7',
    fontSize: theme.typography.pxToRem(30),
    marginRight: theme.spacing(0.5)
  },
  rate: {
    color: '#AEA99F',
    fontSize: theme.typography.pxToRem(13)
  },
  link: {
    textDecoration: 'underline',
    color: '#001964',
    fontSize: 13,
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '0 5px'
  }
}));

export { useStyles };
