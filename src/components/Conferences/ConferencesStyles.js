import { makeStyles } from '@material-ui/core/styles';
import { Images } from 'assets';

const useStyles = makeStyles((theme) => ({
  body: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    height: '600px'
  },
  companyIconLogo: {
    paddingTop: theme.spacing(5)
  },
  boxTitlePage: {
    height: '90px'
  },
  titleModal: {
    fontWeight: 600,
    fontSize: '25px'
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
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingRight: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.customShadows.z1,
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
    fontWeight: 600,
    color: theme.palette.primary[800]
  },
  descriptionField: {
    fontSize: '13px',
    color: theme.palette.grey[600]
  },

  boxSave: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
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
    backgroundImage: `url(${Images.enmascararVideos})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      width: '250px'
    }
  },
  tableWrapper: {
    paddingBottom: theme.spacing(7)
  },
  exportButtonContainer: {
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

export { useStyles };
