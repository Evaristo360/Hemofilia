import { makeStyles } from '@material-ui/core/styles';
import { Images } from 'assets';
import { hexToRgba } from 'providers/theme/helpers';

const useStyles = makeStyles((theme) => ({
  drawerPaper: ({ expanded }) => ({
    ...theme.mixins.getSideMenu(!expanded),
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard
    })
  }),
  listSubHeader: ({ expanded }) => ({
    ...theme.typography.caption,
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    paddingLeft: theme.spacing(3),
    letterSpacing: '1.1px',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    opacity: expanded ? 1 : 0,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.standard
    })
  }),
  listItemText: ({ expanded }) => ({
    opacity: expanded ? 1 : 0,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.standard
    }),
    whiteSpace: 'nowrap'
  }),
  listItemIcon: ({ expanded }) => ({
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.standard
    }),
    transform: expanded ? 'none' : 'scale(1.2)',
    color: theme.palette.text.secondary,
    minWidth: 'auto',
    marginRight: theme.spacing(1.5),
    '& .MuiSvgIcon-root': {
      fontSize: '1.4rem',
      opacity: 0.9
    }
  }),
  listItem: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(3),
    '&.active': {
      backgroundColor: hexToRgba(theme.palette.primary.main, 0.07),
      '& *': {
        color: theme.palette.primary.main,
        fontWeight: '500'
      },
      borderRight: `3px solid ${hexToRgba(theme.palette.primary.main, 0.5)}`
    },
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(1)
  },
  point: ({ expanded }) => ({
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: theme.palette.grey[500],
    transition: theme.transitions.create(['margin', 'transform'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard
    }),
    marginLeft: expanded ? theme.spacing(2) : '7px',
    '&.active': {
      backgroundColor: theme.palette.primary.main,
      transform: 'scale(1.5)'
    }
  }),
  expandIcon: ({ expanded }) => ({
    opacity: expanded ? 1 : 0,
    transform: 'rotateZ(360deg)',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.standard
    }),
    '&.inverted': {
      transform: 'rotateZ(180deg)'
    }
  }),
  boldText: {
    fontWeight: '500'
  },
  logoContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    margin: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(0.5),
    padding: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius * 2,
    justifyContent: 'flex-start'
  },
  companyIconLogo: ({ expanded }) => ({
    height: 44,
    width: 58,
    maskImage: `url("${Images.companyIconLogo}")`,
    maskSize: '100%',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.text.primary
        : theme.palette.primary.main,
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.standard
    }),
    transform: expanded ? 'none' : 'scale(1.2) translateX(7px)'
  }),
  companyTextLogo: ({ expanded }) => ({
    height: 30,
    width: 166,
    marginLeft: theme.spacing(1),
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.standard
    }),
    maskImage: `url("${Images.companyNameLogo}")`,
    maskSize: '100%',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.text.primary
        : theme.palette.primary.main,
    opacity: expanded ? 1 : 0
  })
}));

export { useStyles };
