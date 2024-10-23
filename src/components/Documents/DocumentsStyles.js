import { makeStyles } from '@material-ui/core/styles';
import { Images } from 'assets';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2)
  },
  companyIconLogo: {
    paddingTop: theme.spacing(5)
  },
  boxTitlePage: {
    height: '90px'
  },
  titleModal: {
    fontWeight: 800,
    fontSize: '25px',
    color: theme.palette.info.dark,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px'
    }
  },
  titlePage: {
    fontSize: '79px',
    color: '#FFFFFF',
    fontWeight: 600
  },
  bodyVideos: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(8),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    height: 'auto'
  },
  boxUpdate: {
    width: '100%',
    backgroundColor: '#EBEDF3',
    marginBottom: theme.spacing(3),
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingRight: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },
  description: {
    fontSize: '24px',
    color: theme.palette.primary[800],
    fontWeight: 600,
    textAlign: 'left',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      fontSize: '20px'
    }
  },

  boxFilter: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'red',
    width: '65%'
  },
  color: {
    color: theme.palette.primary[800]
  },
  tableText: {
    fontSize: '13px'
  },
  totalFiles: {
    fontSize: '18px',
    color: theme.palette.secondary[500],
    fontWeight: 600
  },
  boxButtonUpdate: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  boxEdit: {
    width: '100%'
  },
  titleField: {
    fontSize: '16px',
    color: theme.palette.primary[800]
  },
  descriptionField: {
    fontSize: '13px',
    color: theme.palette.grey[600]
  },
  boxForm: {
    width: '800px'
  },
  boxSave: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  grid: {
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      height: '130px'
    },
    [theme.breakpoints.down('xs')]: {
      height: '118px'
    }
  },

  boxImage: {
    height: '100%',
    width: '290px',
    backgroundImage: `url(${Images.enmascarar})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      width: '250px'
    }
  },
  contentForm: {
    width: '600px',
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
    width: theme.spacing(2),
    height: theme.spacing(2),
    color: theme.palette.common.black,
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(2.5),
      height: theme.spacing(2.5)
    }
  },
  confirmContainer: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    fontSize: theme.typography.pxToRem(18),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  centerText: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(1)
  },
  confirmButtonsContainer: {
    padding: theme.spacing(2),
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  confirmButton: {
    marginLeft: theme.spacing(3),
    width: theme.typography.pxToRem(100)
  },
  videoContainer: {
    display: 'grid',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  video: {
    width: theme.typography.pxToRem(960),
    height: theme.typography.pxToRem(540)
  },
  closeIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconButton: {
    backgroundColor: theme.palette.common.white,
    width: theme.typography.pxToRem(40),
    height: theme.typography.pxToRem(40),
    '&:hover': {
      backgroundColor: theme.palette.common.white
    }
  },
  exportButtonContainer: {
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export { useStyles };
