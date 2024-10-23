import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateRows: '.5fr .5fr 3fr .5fr',
    gridAutoRows: 'minmax(50px, auto)',
    padding: `${theme.spacing(2)}px`,
    wordWrap: 'break-word'
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(30),
    marginRight: theme.spacing(0.5)
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(26)
  },
  description: {
    fontSize: theme.typography.pxToRem(13)
  },
  footerContainer: {
    padding: `${theme.spacing(1)}px 0px`,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '12px',
    justifyContent: 'flex-start'
  }
}));

export { useStyles };
