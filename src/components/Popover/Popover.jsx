import { Popover as MuiPopover } from '@material-ui/core';

import { useStyles } from './PopoverStyles';

export const Popover = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <MuiPopover {...props}>
      <span className={classes.arrow} />
      {children}
    </MuiPopover>
  );
};
