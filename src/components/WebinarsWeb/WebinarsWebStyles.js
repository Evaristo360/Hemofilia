import { makeStyles } from '@material-ui/core/styles';
import { hexToRgba } from 'providers/theme/helpers';
import { tabs } from './WebinarsWeb';

const useStyles = makeStyles((theme) => ({
  tabsWrapper: {
    backgroundColor: hexToRgba(theme.palette.text.primary, 0.05)
  },
  icon: {
    width: 24,
    height: 28,
    transition: theme.transitions.create('background-color'),
    backgroundColor: theme.palette.text.secondary,
    '&.active': {
      backgroundColor: theme.palette.primary.main
    },
    maskSize: '100%',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    '&.calendar': {
      maskImage: `url("${tabs.calendar.icon}")`
    },
    '&.pendingWebinars': {
      maskImage: `url("${tabs.pendingWebinars.icon}")`
    },
    '&.myWebinars': {
      maskImage: `url("${tabs.myWebinars.icon}")`
    },
    '&.legacyWebinars': {
      maskImage: `url("${tabs.legacyWebinars.icon}")`
    }
  }
}));

export { useStyles };
