import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  image: {
    minWidth: '100%',
    maxWidth: '100%',
    padding: 0,
    minHeight: '200px',
    maxHeight: '200px',
    marginBottom: 8,
    objectFit: 'cover',
    backgroundColor: '#001964'
  },
  caption: {
    color: '#AEA99F',
    fontSize: 13
  },
  cardBody: {
    paddingBottom: 10
  },
  px: {
    paddingRight: '18px',
    paddingLeft: '18px'
  },
  title: {
    fontSize: 15,
    letterSpacing: 0,
    fontWeight: 'bold',
    lineHeight: '18px',
    color: theme.palette.text.primary
  },
  description: {
    fontSize: 14,
    color: theme.palette.text.primary
  },
  startContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  bottomCard: {
    marginTop: 10
  }
}));

export { useStyles };
