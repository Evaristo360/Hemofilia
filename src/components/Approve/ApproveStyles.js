import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  boxHeader: {
    height: '270px',
    background: `linear-gradient(176deg, rgba(255, 255, 255,1) 0%, rgba(255, 255, 255,1) 35%, rgba(183,195,234,1) 66%, rgba(183,195,234,1) 100%)`,
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8)
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between'
  },
  boxArrow: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: theme.spacing(6),
    position: 'relative',
    bottom: '82px'
  },
  arrow: {
    width: '45px',
    height: '45px',
    color: theme.palette.primary[800]
  },
  boxApproved: {
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    },
    width: '100%'
  },
  boxRejected: {
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    },
    width: '100%',
    backgroundColor: '#EBEDF3'
  },
  boxLogo: {
    paddingTop: theme.spacing(5)
  },
  boxTitlePage: {
    height: '86px'
  },
  titlePage: {
    height: '100%',
    fontSize: 79,
    color: '#FFFFFF',
    fontWeight: 600
  },
  subtitleApproved: {
    fontSize: '25px',
    fontWeight: 600,
    color: theme.palette.primary[800],
    paddingBottom: theme.spacing(3)
  },
  body: {
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(8),
    height: '250px',
    [theme.breakpoints.down('md')]: {
      height: '800px',
      marginBottom: theme.spacing(3),
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4)
    },
    [theme.breakpoints.down('xs')]: {
      height: 'auto',
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    }
  },
  cardInformation: {
    width: '100%',
    boxShadow: `  1px 2px 4px 2px ${theme.palette.divider}`,
    height: 'auto',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  grid: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  boxImage: {
    width: '100%',
    height: '90%'
  },
  title: {
    color: theme.palette.secondary[500],
    letterSpacing: 3,
    textTransform: 'uppercase',
    fontSize: '16px'
  },
  description: { color: theme.palette.primary[800], fontWeight: 600 },
  doctor: {
    color: theme.palette.secondary[500],
    fontWeight: 600,
    fontSize: '13px'
  },
  date: { fontSize: '13px' },
  hour: { fontSize: '13px' },
  textField: {
    borderRadius: 0
  },
  buttonApprove: {
    borderRadius: 3,
    backgroundColor: theme.palette.secondary[500],
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px',
      marginRight: 10
    }
  },
  buttonReject: {
    borderRadius: 3,
    backgroundColor: theme.palette.common.black,
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px'
    }
  },
  notificationReject: {
    textAlign: 'right',
    fontSize: '25px',
    fontWeight: 600,
    paddingBottom: theme.spacing(2)
  }
}));

export { useStyles };
