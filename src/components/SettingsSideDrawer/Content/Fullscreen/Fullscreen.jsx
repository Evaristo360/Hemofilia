import { useEffect, useState } from 'react';
import { Box, Button } from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import ExitFullscreenIcon from '@material-ui/icons/FullscreenExit';
import { useStyles } from './FullscreenStyles';
import { useIntl } from 'react-intl';
import { messages } from './FullscreenMessages';

export const Fullscreen = () => {
  const { formatMessage } = useIntl();
  const [fullscreen, setFullscreen] = useState(false);
  const classes = useStyles({ active: fullscreen });

  const verifyIfFullscreen = () => setFullscreen(!!document.fullscreenElement);

  useEffect(() => {
    verifyIfFullscreen();

    document.onfullscreenchange = verifyIfFullscreen;

    return () => (document.onfullscreenchange = null);
  });

  const handleSwitchFullscreen = () => {
    fullscreen
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();
  };

  return (
    <Box p={2} pt={0}>
      <Button
        onClick={handleSwitchFullscreen}
        className={classes.button}
        size="large"
        fullWidth
        variant="outlined"
        startIcon={fullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
      >
        {formatMessage(messages[fullscreen ? 'exitFullscreen' : 'fullscreen'])}
      </Button>
    </Box>
  );
};
