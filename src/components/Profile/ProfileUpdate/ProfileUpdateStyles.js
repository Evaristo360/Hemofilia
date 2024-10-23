import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: theme.spacing(-15),
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(-15),
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3)
    }
  },
  labelText: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1)
    }
  },
  cardContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    boxShadow: '0px 3px 6px #00000029',
    '& .MuiGrid-grid-xs-3': {
      textAlign: 'center'
    }
  },
  deleteTitle: { fontWeight: 'bold' },
  root: {
    flexGrow: 1
  },
  gridItem: {
    boxSizing: 'border-box',
    padding: theme.spacing(1)
  },
  itemFirst: {
    boxSizing: 'border-box',
    padding: `0px 0px 0px 0px`,
    [theme.breakpoints.up('lg')]: {
      padding: `0px 0px ${theme.spacing(1)}px 0px`
    },
    [theme.breakpoints.up('md')]: {
      padding: `0px 0px ${theme.spacing(1)}px 0px`
    },
    [theme.breakpoints.down('sm')]: {
      padding: `0px 0px ${theme.spacing(1)}px 0px`
    }
  },
  itemSecond: {
    boxSizing: 'border-box',
    padding: `0px 0px 0px 0px`,
    [theme.breakpoints.up('lg')]: {
      padding: `${theme.spacing(1)}px 0px 0px 0px`
    },
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing(1)}px 0px 0px 0px`
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(1)}px 0px ${theme.spacing(1)}px 0px`
    }
  },
  linkButton: {
    marginTop: -theme.spacing(0.3),
    marginLeft: theme.spacing(0.5)
  },
  deleteButton: {
    margin: theme.spacing(0.5)
  },
  containerButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    boxSizing: 'border-box',
    padding: theme.spacing(1)
  }
}));

export { useStyles };
