import { makeStyles } from '@material-ui/core/styles';
import { Images } from '../../assets';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${Images.logoMedicine})`,
    backgroundSize: '100% 100%',
    height: '500px ',
    width: '100% ',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    overflowX: 'hidden',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      backgroundPosition: 'center 85px',
      [theme.breakpoints.down('sm')]: {
        backgroundPosition: 'center 90px',
        [theme.breakpoints.down('xs')]: {
          backgroundImage: 'none'
        }
      }
    }
  },
  contentText: {
    height: '550px ',
    width: '100%',
    background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, ${
      theme.palette.type === 'light' ? 'rgba(183,195,234,1)' : '#0d1b4a'
    } 100%)`,
    alignContent: 'center',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '2vh',
    [theme.breakpoints.down('xs')]: {
      paddingTop: 0
    }
  },
  responsiveLogo: {
    width: 355,
    height: 59,
    maskImage: `url("${Images.logo}")`,
    maskSize: '100%',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.text.primary
        : theme.palette.primary.main,
    [theme.breakpoints.down('xs')]: {
      width: 240,
      height: 240
    }
  },
  welcomeTitle: {
    fontSize: '40px',
    color: theme.palette.info.dark,
    fontWeight: 800,
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(-6),
      fontSize: '30px'
    }
  },
  userName: {
    color: theme.palette.info.dark,
    fontSize: '40px',
    fontWeight: 800,
    [theme.breakpoints.down('xs')]: {
      fontSize: '30px'
    }
  },

  sessionText: {
    fontSize: '25px',
    color: theme.palette.info.dark,
    [theme.breakpoints.down('xs')]: {
      fontSize: '20px',
      marginTop: theme.spacing(2)
    }
  },
  contentRole: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2)
    }
  },
  roleText: {
    fontSize: '25px',
    color: theme.palette.info.light,
    fontWeight: 800,
    textTransform: 'capitalize',
    [theme.breakpoints.down('xs')]: {
      fontSize: '20px'
    }
  },
  textStadistics: {
    textAlign: 'center',
    fontSize: '20px',
    opacity: 0.5,
    color: theme.palette.info.dark,
    marginTop: theme.spacing(9),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(8),
      [theme.breakpoints.down('xs')]: {
        fontSize: '18px',
        marginTop: theme.spacing(3)
      }
    }
  },
  contentCards: {
    marginTop: theme.spacing(-4),
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },
  iconCard: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    color: theme.palette.info.dark,
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(2.5),
      height: theme.spacing(2.5)
    }
  },
  textModalCards: {
    fontSize: '79px',
    color: theme.palette.info.dark,
    fontWeight: 800,
    [theme.breakpoints.down('xs')]: {
      fontSize: '23px',
      paddingTop: 5
    }
  },
  contentTitleModal: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  iconClose: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    cursor: 'pointer',
    color: theme.palette.info.dark,
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(2),
      height: theme.spacing(2)
    }
  },
  cardTable: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    paddingBottom: 20,
    height: 'auto',
    width: '100%',
    borderRadius: 5,
    boxShadow: '0px 0px 4px  #00000029'
  },
  cardPieChart: {
    padding: theme.spacing(2),
    borderRadius: 5,
    boxShadow: '0px 0px 5px  #00000029'
  },
  contentTotalPieChart: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  total: {
    fontSize: '15px',
    color: theme.palette.grey[700],
    paddingTop: theme.spacing(1)
  },
  numberTotal: {
    fontSize: '15px',
    color: theme.palette.info.dark,
    paddingTop: theme.spacing(1),
    fontWeight: 800
  },
  divider: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  contentPieChart: {
    width: '100%',
    height: '390px'
  },
  conferencesCard: {
    boxShadow: '0px 0px 4px  #00000029',
    borderRadius: 5,
    padding: theme.spacing(2)
  },
  titlesCardsText: {
    fontSize: '18px',
    color: theme.palette.info.dark,
    fontWeight: 800,
    paddingBottom: theme.spacing(0.5)
  },
  numberConferences: {
    color: theme.palette.info.dark,
    paddingTop: theme.spacing(1.5),
    fontSize: '25px',
    fontWeight: 800,
    marginTop: '-2vh'
  },
  text: {
    fontSize: '12px',
    textTransform: 'uppercase',
    color: theme.palette.info.dark,
    fontWeight: 800
  },
  modalBodyContent: {
    paddingBottom: 40
  },
  formContainer: {
    marginTop: 20
  }
}));

export { useStyles };
