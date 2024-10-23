import { makeStyles } from '@material-ui/core/styles';
import { hexToRgba } from 'providers/theme/helpers';

const useStyles = makeStyles((theme) => ({
  container: ({ expanded }) => ({
    justifyContent: 'flex-start',
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(0),
    padding: theme.spacing(1.5),
    backgroundColor: hexToRgba(theme.palette.grey[500], expanded ? 0.125 : 0),
    borderRadius: theme.shape.borderRadius * 2,
    display: 'flex',
    transition: theme.transitions.create(
      'background-color',
      theme.transitions.duration.shorter
    )
  }),
  textContainer: ({ expanded }) => ({
    opacity: expanded ? 1 : 0,
    maxWidth: '85%',
    transition: theme.transitions.create(
      'opacity',
      theme.transitions.duration.shorter
    ),
    '& > *': {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    }
  }),
  avatar: ({ expanded }) => ({
    transform: expanded ? 'none' : 'translateX(-2px) scale(1.2)',
    transition: theme.transitions.create(
      'transform',
      theme.transitions.duration.shorter
    )
  })
}));

export { useStyles };
