import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: '#EEEFEE',
    marginTop: theme.spacing(-2)
  },
  haderContainer: {
    margin: `0 ${theme.spacing(8)}px`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  videosStat: {
    fontSize: theme.typography.pxToRem(36),
    color: theme.palette.primary.main
  },
  container: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(0, 6)
  },
  icon: {
    fontSize: theme.typography.pxToRem(60),
    color: theme.palette.primary.main
  },
  sectionTitle: {
    color: theme.palette.secondary.dark,
    fontSize: theme.typography.pxToRem(25)
  },
  gridCardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: theme.spacing(2),
    gridAutoRows: 'minmax(100px, auto)',
    margin: `${theme.spacing(3)}px 0`
  },
  title: {
    color: theme.palette.secondary.dark,
    fontWeight: 'bold'
  },
  description: {
    color: theme.palette.common.black,
    overflow: 'hidden',
    position: 'relative',
    lineHeight: '1.2em',
    maxHeight: '2.4em',
    '&:before': {
      content: '"..."',
      position: 'absolute',
      right: 0,
      bottom: 0
    },
    '&:after': {
      border: '1pt solid black',
      content: 'none',
      position: 'absolute',
      right: 0,
      width: '12em',
      height: '12em',
      marginTop: '0.2em',
      background: 'transparent'
    }
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3)
  },
  expandContainer: {
    fontSize: theme.typography.pxToRem(17),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer'
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
  centerText: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(1)
  },
  rating: {
    color: theme.palette.primary.main
  },
  iconClose: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    color: theme.palette.common.black,
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(2.5),
      height: theme.spacing(2.5)
    }
  }
}));

export { useStyles };
