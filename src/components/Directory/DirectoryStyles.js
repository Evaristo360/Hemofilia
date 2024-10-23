import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    margin: '20px 0px'
  },
  filterLabel: {
    fontWeight: theme.typography.fontWeightBold,
    paddingBottom: 10
  },
  filterIcon: {
    marginRight: 10,
    fontWeight: theme.typography.fontWeightLight,
    fontSize: theme.typography.pxToRem(26)
  }
}));

export { useStyles };
