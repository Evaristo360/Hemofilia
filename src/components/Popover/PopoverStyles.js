import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  arrow: {
    [theme.breakpoints.up('sm')]: {
      top: -7,
      zIndex: 1,
      width: 12,
      right: 20,
      height: 12,
      content: "''",
      position: 'absolute',
      borderRadius: '0 0 4px 0',
      transform: 'rotate(-135deg)',
      background: theme.palette.background.paper,
      borderRight:
        theme.palette.mode === 'light' &&
        `solid 1px ${theme.palette.grey[200]}`,
      borderBottom:
        theme.palette.mode === 'light' && `solid 1px ${theme.palette.grey[200]}`
    }
  }
}));
