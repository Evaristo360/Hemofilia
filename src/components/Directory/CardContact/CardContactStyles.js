import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    width: '100%',
    borderRadius: 10,
    boxShadow: '0px 3px 6px #00000029',
    fontSize: theme.typography.pxToRem(15),
    height: theme.typography.pxToRem(350),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(17),
      height: theme.typography.pxToRem(430)
    }
  },
  cardHeader: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContact: {
    width: theme.typography.pxToRem(90),
    height: theme.typography.pxToRem(90),
    fontSize: theme.typography.pxToRem(45),
    marginBottom: 20,
    [theme.breakpoints.down('sm')]: {
      width: theme.typography.pxToRem(110),
      height: theme.typography.pxToRem(110),
      fontSize: theme.typography.pxToRem(55)
    }
  },
  cardFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTop: '1px solid #E6E6E6',
    margin: 10
  },
  primaryText: {
    color: '#00040F',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  secondaryText: {
    color: '#2AA4D5',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  complementText: {
    color: '#989898',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
}));

export { useStyles };
