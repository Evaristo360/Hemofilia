import { makeStyles } from '@material-ui/core/styles';
import { Images } from 'assets';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    '& .fadeIn': {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  },
  background: {
    background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, ${
      theme.palette.type === 'light' ? 'rgba(183,195,234,1)' : '#0d1b4a'
    } 100%)`,
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    height: 305
  },
  imagesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  logo: {
    width: 325,
    height: 59,
    maskImage: `url("${Images.logo}")`,
    maskSize: '100%',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.text.primary
        : theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      width: 250,
      height: 42
    },
    [theme.breakpoints.down('xs')]: {
      width: 220,
      height: 37
    }
  },
  companyLogo: {
    width: 125,
    height: 87,
    maskImage: `url("${Images.companyLogoblue}")`,
    maskSize: '100%',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.text.primary
        : theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      width: 100
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
}));

export { useStyles };
