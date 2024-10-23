import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  scheduleTitle: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold
  },
  bottomBorder: {
    padding: `${theme.spacing(1)}px 0px`,
    borderBottom: `solid 2px ${theme.palette.primary.main}`
  },
  addPadding: {
    padding: `${theme.spacing(1)}px 0px`
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
  }
}));

export { useStyles };
