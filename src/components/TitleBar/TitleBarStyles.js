import { makeStyles } from '@material-ui/core/styles';
import { Images } from '../../assets';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '305px',
    width: '100% !important',
    background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, ${
      theme.palette.type === 'light' ? 'rgba(183,195,234,1)' : '#0d1b4a'
    } 100%)`,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      // height: 'auto'
    }
  },
  contentGrid: {
    marginTop: 30,
    marginRight: 70,
    marginLeft: 70,
    [theme.breakpoints.down('xs')]: {
      marginRight: 15,
      marginLeft: 15
    }
  },
  contentTextArrow: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '75%',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  },
  responsiveLogo: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: '90%'
    }
  },
  logo: {
    width: 355,
    height: 59,
    maxWidth: '95%',
    maskImage: `url("${Images.logo}")`,
    maskSize: '100%',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.text.primary
        : theme.palette.primary.main
  },
  titleDashboarLayout: ({ arrowBack }) => ({
    fontSize: '79px',
    color: theme.palette.common.white,
    fontWeight: 800,
    [theme.breakpoints.down('md')]: {
      fontSize: '60px',
      [theme.breakpoints.down('sm')]: {
        fontSize: arrowBack ? '55px' : '60px'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: arrowBack ? '40px' : '45px'
      }
    }
  }),
  contentIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '0.5rem',
    [theme.breakpoints.down('xs')]: {
      marginBottom: 0
    }
  },
  arrowIcon: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    color: theme.palette.info.dark,
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      [theme.breakpoints.down('xs')]: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5)
      }
    }
  },
  icon: {
    position: 'relative',
    width: '100%',
    marginTop: '-3.3rem',
    height: 'auto'
  },

  ///
  contentIntroLayout: {
    backgroundImage: `url(${Images.grupoInvertido})`,
    backgroundSize: '100% 60%',
    width: '100% ',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    overflowX: 'hidden',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      backgroundAttachment: 'hidden',
      backgroundSize: '100% 63%',
      [theme.breakpoints.down('sm')]: {
        backgroundSize: '100% 62%'
      },
      [theme.breakpoints.down('xs')]: {
        backgroundSize: '100% 95%'
      }
    }
  },
  contentText: {
    width: '100% ',
    marginTop: theme.spacing(5.5),
    paddingLeft: theme.spacing(12),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1)
    }
  },
  responsiveTextIntroLayout: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
      textAlign: 'center',
      display: 'flex'
    }
  },
  responsiveIntroLayout: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  textInformation: {
    fontSize: '14.5px',
    color: theme.palette.info.dark,
    paddingTop: theme.spacing(2.5)
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  contentBaseLayoute: ({ icon, faqLayout }) => ({
    position: 'relative',
    backgroundImage: faqLayout ? `url(${Images.faqsIcon})` : `url(${icon})`,
    backgroundSize: faqLayout ? '20% 60%' : '27% 60%',
    backgroundPosition: '93% 0%',
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    overflowX: 'hidden',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      backgroundPosition: faqLayout ? '97% -5%' : '90% 5%',
      backgroundSize: faqLayout ? '20% 60%' : '30% 60%',
      [theme.breakpoints.down('sm')]: {
        backgroundPosition: faqLayout ? '95% 10%' : '90% -2%',
        backgroundSize: faqLayout ? '26% 60%' : '40% 60%'
      },
      [theme.breakpoints.down('xs')]: {
        backgroundPosition: faqLayout ? 'center 70%' : 'center 67%',
        backgroundSize: faqLayout ? '36% 60%' : '60% 60%',
        backgroundAttachment: 'inherit'
      }
    }
  }),
  contentTextBaseLayout: {
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(3.5),
    marginLeft: theme.spacing(3.5),
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      marginRight: 10,
      marginLeft: 10
    }
  },
  baseLayoutTitleWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  contentTitleBaseLayout: {
    height: '60%',
    display: 'flex',
    alignItems: 'flex-end'
  },
  titleBaseLayout: {
    fontSize: '79px',
    color: theme.palette.common.white,
    fontWeight: 800,
    [theme.breakpoints.down('xs')]: {
      fontSize: '45px'
    }
  },
  contentFaqs: {
    position: 'absolute',
    width: '63%',
    [theme.breakpoints.down('md')]: {
      width: '60%',
      marginTop: '-4rem',
      paddingTop: theme.spacing(4.5),
      [theme.breakpoints.down('sm')]: {
        marginTop: 0,
        [theme.breakpoints.down('xs')]: {
          display: 'none'
        }
      }
    }
  },
  contentTitleFaqs: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  titleFaqs: {
    fontSize: '36px',
    color: theme.palette.info.dark,
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px'
    }
  },
  contentLogos: {
    justifyContent: 'space-between',
    display: 'flex',
    width: '100%',
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(16)
  },
  contentFaqsText: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: 15,
    [theme.breakpoints.down('md')]: {
      // paddingTop: 10
      [theme.breakpoints.down('sm')]: {
        paddingTop: 0
      }
    }
  },
  textInformationFaqs: {
    fontSize: '14px',
    color: theme.palette.info.dark,
    [theme.breakpoints.down('sm')]: {
      fontSize: '12.5px'
    }
  }
}));

export { useStyles };
