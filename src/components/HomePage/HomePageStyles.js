import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  infoContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: theme.spacing(2),
    marginBottom: theme.spacing(8),
    marginTop: theme.spacing(-4)
  },
  seminarsContainer: {
    marginTop: theme.spacing(-4),
    marginBottom: theme.spacing(3)
  },
  link: {
    textDecoration: 'none'
  },
  sectionTitle: {
    color: theme.palette.secondary.dark,
    fontSize: theme.typography.pxToRem(25)
  },
  cardsContainer: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
    width: '100%'
  },
  title: {
    color: theme.palette.secondary.dark,
    fontWeight: 'bold'
  },
  cardTitle: {
    fontSize: 15,
    color: theme.palette.text.primary,
    letterSpacing: 0,
    lineHeight: '18px',
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
  cardActionLabel: {
    textDecoration: 'underline',
    color: '#001964',
    fontSize: 13,
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '0 5px'
  },
  modalViewer: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  }
}));

export { useStyles };
