import { makeStyles } from '@material-ui/core/styles';
import { hexToRgba } from 'providers/theme/helpers';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  ul: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    '& > li': {
      marginRight: theme.spacing(0.5),
      '&:nth-last-child(1)': {
        marginRight: 0
      },
      '& > button': {
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        border: `1px solid ${hexToRgba(theme.palette.text.primary, 0.15)}`,
        backgroundColor: theme.palette.background.paper,
        width: 25,
        height: 25,
        color: theme.palette.text.secondary,
        fontSize: 10,
        lineHeight: 14,
        '&.Mui-selected': {
          backgroundColor: theme.palette.primary.main,
          border: `1px solid ${theme.palette.primary.main}`,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.primary.main
          }
        }
      }
    },
    '& > li:first-child > button, & > li:nth-last-child(1) > button': {
      color: theme.palette.text.secondary,
      '& svg': {
        fontSize: 20
      }
    },
    '& > li > .MuiPaginationItem-ellipsis': {
      width: 25,
      height: 25,
      color: theme.palette.text.secondary,
      margin: 0
    }
  },
  rowsPerPageSelect: {
    overflow: 'hidden',
    marginLeft: theme.spacing(2),
    border: 0,
    borderRadius: theme.shape.borderRadius,
    outline: 'none',
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
    height: 25,
    fontSize: 10,
    '& .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${hexToRgba(
        theme.palette.text.primary,
        0.15
      )} !important`
    },
    '& > .MuiSelect-root': {
      color: theme.palette.text.secondary
    },
    '& .MuiSelect-icon': {
      fontSize: 20,
      color: theme.palette.text.secondary,
      top: 2
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      marginLeft: 0
    }
  },
  rowsPerPageSelectMenuItem: {
    fontSize: 10,
    color: theme.palette.text.secondary
  }
}));

export { useStyles };
