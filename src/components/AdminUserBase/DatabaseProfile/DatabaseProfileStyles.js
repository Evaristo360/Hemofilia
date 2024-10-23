import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    // padding: theme.spacing(2),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5)
    }
  },
  rootCard: {
    backgroundColor: theme.palette.divider,
    borderRadius: 5,
    padding: theme.spacing(2),
    boxShadow: '0px 0px 4px #00000029'
  },
  rootCardBackground: {
    backgroundColor: theme.palette.info.dark,
    width: '281px',
    height: '100px',
    cursor: 'pointer',
    borderRadius: 5,
    padding: theme.spacing(1),
    boxShadow: '0px 0px 4px #00000029',
    [theme.breakpoints.down('xs')]: {
      width: '240px'
    }
  },
  rootCardProfile: {
    width: '281px',
    height: '100px',
    borderRadius: 5,
    padding: theme.spacing(1),
    boxShadow: '0px 0px 4px #00000029',
    [theme.breakpoints.down('xs')]: {
      width: '240px'
    }
  },
  titleCardProfile: {
    fontSize: '16.5px',
    letterSpacing: '3.2px',
    color: theme.palette.info.light,
    textTransform: 'uppercase',
    [theme.breakpoints.down('xs')]: {
      fontSize: '13px'
    }
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12)
  },
  titleSpecialty: {
    fontSize: '16px',
    letterSpacing: '3.2',
    textTransform: 'uppercase',
    color: theme.palette.info.light
  },
  name: {
    fontSize: '16px',
    fontWeight: 800,
    color: theme.palette.info.dark
  },
  telephoneNumber: {
    fontSize: '13px',
    fontWeight: 600,
    color: theme.palette.info.light
  },
  textInformation: {
    fontSize: '13px',
    color: theme.palette.common.black
  },
  lastIncome: {
    fontSize: '13px',
    fontWeight: 800,
    color: theme.palette.info.dark
  },
  responsiveButton: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  },
  button: {
    color: theme.palette.common.white,
    marginTop: theme.spacing(2),
    padding: theme.spacing(0.5),
    background: theme.palette.info.light,
    '&:hover': {
      backgroundColor: `${theme.palette.info.dark}!important`
    }
  },
  contentForm: {
    width: '824px',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  contentIcon: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  iconClose: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: theme.palette.common.black,
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(2.5),
      height: theme.spacing(2.5)
    }
  },
  commentModal: {
    fontSize: '25px',
    fontWeight: 800,
    color: theme.palette.info.dark,
    [theme.breakpoints.down('xs')]: {
      fontSize: '20px'
    }
  },
  commentInfoModal: {
    fontSize: '16px',
    color: theme.palette.info.dark,
    [theme.breakpoints.down('xs')]: {
      fontSize: '13px'
    }
  },
  contentText: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-start'
    }
  },
  contentComentaries: {
    marginTop: theme.spacing(2)
  },
  titleComentaries: {
    display: 'block',
    fontSize: '13px',
    color: theme.palette.common.black,
    fontWeight: 800
  },
  text: {
    display: 'block',
    fontSize: '13px',
    color: theme.palette.common.black
  },
  statisticsNumber: {
    fontSize: '17px',
    color: theme.palette.info.dark,
    fontWeight: 800,
    marginTop: theme.spacing(0.5)
  },
  iconQualified: {
    color: theme.palette.info.dark,
    width: theme.spacing(2.2),
    height: theme.spacing(2.2),
    marginTop: theme.spacing(0.4),
    display: 'flex',
    alignItems: 'center'
  },
  contentQualified: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  numberAuthorized: {
    fontSize: '17px',
    color: theme.palette.common.white,
    fontWeight: 800,
    marginTop: theme.spacing(0.5)
  }
}));

export { useStyles };
